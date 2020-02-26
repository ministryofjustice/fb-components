require('dialog-polyfill')

function TimeoutWarning ($module) {
  if ($module) {
    this.$module = $module
    this.$fallBackElement = document.querySelector('.govuk-timeout-warning-fallback')
    this.minutesTimeout = $module.getAttribute('data-minutes-timeout') || 60
    this.timeOutRedirectUrl = $module.getAttribute('data-url-redirect')
    // 10% of the total time the modal is show
    this.minutesTimeOutModalVisible = this.minutesTimeout * 0.10
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

  milliSecondsBeforeTimeOut = (this.minutesTimeout * 0.91) * 60000
  setTimeout(this.openDialog.bind(this), milliSecondsBeforeTimeOut)
}

// Starts a UI countdown timer. If timer is not cancelled before 0
// reached + 4 seconds grace period, user is redirected.
TimeoutWarning.prototype.startUiCountdown = function () {
  var $module = this
  var minutes = this.minutesTimeOutModalVisible
  var seconds = 60 * minutes;

  (function runTimer () {
    var minutesLeft = parseInt(seconds / 60, 10)
    var secondsLeft = parseInt(seconds % 60, 10)
    var timerExpired = minutesLeft < 1 && secondsLeft < 1

    if (timerExpired) {
      setTimeout($module.redirect.bind($module), 4000)
    } else {
      seconds--
      setTimeout(runTimer, 1000)
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
  this.$module.showModal()
  this.startUiCountdown()
}

module.exports = TimeoutWarning
