require('dialog-polyfill')

function TimeoutWarning ($module) {
  if ($module) {
    this.$module = $module
    this.$closeButton = $module.querySelector('.js-dialog-close')
    this.$fallBackElement = document.querySelector('.govuk-timeout-warning-fallback')
    this.minutesTimeout = $module.getAttribute('data-minutes-timeout') || 60
    this.timeOutRedirectUrl = $module.getAttribute('data-url-redirect')
    this.keepAliveUrl = $module.getAttribute('data-url-keep-alive')
    // 10% of the total time the modal is show
    this.minutesTimeOutModalVisible = this.minutesTimeout
    this.overLayClass = 'govuk-timeout-warning-overlay'
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
  milliSecondsBeforeTimeOut = (this.minutesTimeout * 0.90) * 60000
  this.timers.push(setTimeout(this.openDialog.bind(this), milliSecondsBeforeTimeOut))
}

// Starts a UI countdown timer. If timer is not cancelled before 0
// reached + 4 seconds grace period, user is redirected.
TimeoutWarning.prototype.startUiCountdown = function () {
  this.clearTimers()
  var $module = this
  var timers = this.timers
  var minutes = this.minutesTimeOutModalVisible
  var seconds = 60 * minutes;

  (function runTimer () {
    var minutesLeft = parseInt(seconds / 60, 10)
    var secondsLeft = parseInt(seconds % 60, 10)
    var timerExpired = minutesLeft < 1 && secondsLeft < 1

    if (timerExpired) {
      if ($module.isDialogOpen()) {
        setTimeout($module.redirect.bind($module), 4000)
      }
    } else {
      seconds--
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

module.exports = TimeoutWarning
