// This file is based on GOV.uk recommendations
// on https://github.com/alphagov/govuk-design-system-backlog/issues/104
// and https://github.com/alphagov/govuk-design-system-backlog/issues/103
// This also were based on the recommended accessible timeout warning.
require('dialog-polyfill')

function TimeoutWarning ($module) {
  if ($module) {
    this.$module = $module
    this.$closeButton = $module.querySelector('.js-dialog-close')
    this.$fallBackElement = document.querySelector('.govuk-timeout-warning-fallback')
    this.minutesTimeout = $module.getAttribute('data-minutes-timeout') || 60
    this.timeOutRedirectUrl = $module.getAttribute('data-url-redirect')
    this.keepAliveUrl = $module.getAttribute('data-url-keep-alive')
    this.minutesTimeOutModalVisible = $module.getAttribute('data-minutes-modal-visible')
    this.overLayClass = 'govuk-timeout-warning-overlay'
    this.$countdown = $module.querySelector('.timer')
    this.$accessibleCountdown = $module.querySelector('.at-timer')
    this.timers = []
  }
}

TimeoutWarning.prototype.init = function () {
  // Check for module
  if (!this.$module) {
    return
  }

  // Check that dialog element has native or polyfill support
  if (!this.dialogSupported()) {
    return
  }

  this.$closeButton.addEventListener('click', this.closeDialog.bind(this))
  this.$module.addEventListener('keydown', this.escClose.bind(this))

  this.addTimer()
}

TimeoutWarning.prototype.addTimer = function () {
  // Minutes before the timeout that modal will appear
  var minuteModalWillAppear = this.minutesTimeout - this.minutesTimeOutModalVisible
  var milliSecondsBeforeTimeOut = (minuteModalWillAppear > 0 ? minuteModalWillAppear : 0.1) * 60000
  this.timers.push(setTimeout(this.openDialog.bind(this), milliSecondsBeforeTimeOut))
}

// Starts a UI countdown timer. If timer is not cancelled before 0
// reached + 4 seconds grace period, user is redirected.
TimeoutWarning.prototype.startUiCountdown = function () {
  this.clearTimers()
  var $module = this
  var $countdown = this.$countdown
  var $accessibleCountdown = this.$accessibleCountdown
  var timerRunOnce = false
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  var timers = this.timers
  var minutes = this.minutesTimeOutModalVisible
  var seconds = 60 * minutes;

  (function runTimer () {
    var minutesLeft = parseInt(seconds / 60, 10)
    var secondsLeft = parseInt(seconds % 60, 10)
    var timerExpired = minutesLeft < 1 && secondsLeft < 1

    var minutesText = minutesLeft > 0 ? '<span class="tabular-numbers">' + minutesLeft + '</span> minute' + (minutesLeft > 1 ? 's' : '') + '' : ' '
    var secondsText = secondsLeft >= 1 ? ' <span class="tabular-numbers">' + secondsLeft + '</span> second' + (secondsLeft > 1 ? 's' : '') + '' : ''
    var atMinutesNumberAsText = ''
    var atSecondsNumberAsText = ''

    try {
      atMinutesNumberAsText = this.numberToWords(minutesLeft) // Attempt to convert numerics into text as iOS VoiceOver ocassionally stalled when encountering numbers
      atSecondsNumberAsText = this.numberToWords(secondsLeft)
    } catch (e) {
      atMinutesNumberAsText = minutesLeft
      atSecondsNumberAsText = secondsLeft
    }

    var atMinutesText = minutesLeft > 0 ? atMinutesNumberAsText + ' minute' + (minutesLeft > 1 ? 's' : '') + '' : ''
    var atSecondsText = secondsLeft >= 1 ? ' ' + atSecondsNumberAsText + ' second' + (secondsLeft > 1 ? 's' : '') + '' : ''

    // Below string will get read out by screen readers every time the timeout refreshes (every 15 secs. See below).
    // Please add additional information in the modal body content or in below extraText which will get announced to AT the first time the time out opens
    var text = 'We will reset your application if you do not respond in ' + minutesText + secondsText + '.'
    var atText = 'We will reset your application if you do not respond in ' + atMinutesText
    if (atSecondsText) {
      if (minutesLeft > 0) {
        atText += ' and'
      }
      atText += atSecondsText + '.'
    } else {
      atText += '.'
    }
    var extraText = ' We do this to keep your information secure.'

    if (timerExpired) {
      $countdown.innerHTML = 'You are about to be redirected'
      $accessibleCountdown.innerHTML = 'You are about to be redirected'
      setTimeout($module.redirect.bind($module), 4000)
    } else {
      $countdown.innerHTML = text + extraText
      if (minutesLeft < 1 && secondsLeft < 20) {
        $accessibleCountdown.setAttribute('aria-live', 'assertive')
      }
      seconds--

      if (!timerRunOnce) {
        // Read out the extra content only once. Don't read out on iOS VoiceOver which stalls on the longer text

        if (iOS) {
          $accessibleCountdown.innerHTML = atText
        } else {
          $accessibleCountdown.innerHTML = atText + extraText
        }
        timerRunOnce = true
      } else if (secondsLeft % 15 === 0) {
        // Update screen reader friendly content every 15 secs
        $accessibleCountdown.innerHTML = atText
      }

      timers.push(setTimeout(runTimer, 1000))
    }
  })()
}

TimeoutWarning.prototype.redirect = function () {
  window.location.replace(this.timeOutRedirectUrl)
}

TimeoutWarning.prototype.dialogSupported = function () {
  if (typeof HTMLDialogElement === 'function') {
    // Native dialog is supported by browser
    return true
  } else {
    // Native dialog is not supported by browser so use polyfill
    try {
      window.dialogPolyfill.registerDialog(this.$module)
      return true
    } catch (error) {
      // Doesn't support polyfill (IE8) - display fallback element
      this.$fallBackElement.classList.add('govuk-!-display-block')
      return false
    }
  }
}

TimeoutWarning.prototype.openDialog = function () {
  if (!this.isDialogOpen()) {
    document.querySelector('body').classList.add(this.overLayClass)
    this.makePageContentInert()
    this.$module.showModal()
    this.startUiCountdown()
  }
}
//
// Set page content to inert to indicate to screenreaders it's inactive
TimeoutWarning.prototype.makePageContentInert = function () {
  if (document.querySelector('body')) {
    document.querySelector('body').inert = true
    document.querySelector('body').setAttribute('aria-hidden', 'true')
  }
}

TimeoutWarning.prototype.removeInertFromPageContent = function () {
  if (document.querySelector('body')) {
    document.querySelector('body').inert = false
    document.querySelector('body').setAttribute('aria-hidden', 'false')
  }
}

TimeoutWarning.prototype.closeDialog = function () {
  if (this.isDialogOpen()) {
    document.querySelector('body').classList.remove(this.overLayClass)
    this.$module.close()
    this.removeInertFromPageContent()
    this.clearTimers()
    this.setLastActiveTimeOnServer()
    this.addTimer()
  }
}

TimeoutWarning.prototype.setLastActiveTimeOnServer = function () {
  var xhttp = new XMLHttpRequest()
  xhttp.open('GET', this.keepAliveUrl, true)
  xhttp.send()
}

TimeoutWarning.prototype.isDialogOpen = function () {
  return this.$module['open']
}

TimeoutWarning.prototype.clearTimers = function () {
  for (var i = 0; i < this.timers.length; i++) {
    clearTimeout(this.timers[i])
  }
}

TimeoutWarning.prototype.escClose = function () {
 if (this.isDialogOpen() && event.keyCode === 27) {
   this.closeDialog()
 }
}

// Copied from gov.uk accessible timeout
TimeoutWarning.prototype.numberToWords = function () {
  var string = n.toString()
  var units
  var tens
  var scales
  var start
  var end
  var chunks
  var chunksLen
  var chunk
  var ints
  var i
  var word
  var words = 'and'

  if (parseInt(string) === 0) {
    return 'zero'
  }

  /* Array of units as words */
  units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ]

  /* Array of tens as words */
  tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ]

  /* Array of scales as words */
  scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ]

  /* Split user arguemnt into 3 digit chunks from right to left */
  start = string.length
  chunks = []
  while (start > 0) {
    end = start
    chunks.push(string.slice((start = Math.max(0, start - 3)), end))
  }

  /* Check if function has enough scale words to be able to stringify the user argument */
  chunksLen = chunks.length
  if (chunksLen > scales.length) {
    return ''
  }

  /* Stringify each integer in each chunk */
  words = []
  for (i = 0; i < chunksLen; i++) {
    chunk = parseInt(chunks[i])

    if (chunk) {
      /* Split chunk into array of individual integers */
      ints = chunks[i].split('').reverse().map(parseFloat)

      /* If tens integer is 1, i.e. 10, then add 10 to units integer */
      if (ints[1] === 1) {
        ints[0] += 10
      }

      /* Add scale word if chunk is not zero and array item exists */
      if ((word = scales[i])) {
        words.push(word)
      }

      /* Add unit word if array item exists */
      if ((word = units[ints[0]])) {
        words.push(word)
      }

      /* Add tens word if array item exists */
      if ((word = tens[ ints[1] ])) {
        words.push(word)
      }

      /* Add hundreds word if array item exists */
      if ((word = units[ints[2]])) {
        words.push(word + ' hundred')
      }
    }
  }
  return words.reverse().join(' ')
}

module.exports = TimeoutWarning
