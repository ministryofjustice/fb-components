function TimeoutWarning ($module) {
  if ($module) {
    this.$module = $module
    this.$fallBackElement = document.querySelector('.govuk-timeout-warning-fallback')
    this.MinutesBeforeTimeOut = $module.getAttribute('data-minutes-timeout') || 60
    this.timeOutRedirectUrl = $module.getAttribute('data-url-redirect')
    this.minutesTimeOutModalVisible = $module.getAttribute('data-minutes-modal-visible') || 5
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

  this.startUiCountdown()
}

// Starts a UI countdown timer. If timer is not cancelled before 0
// reached + 4 seconds grace period, user is redirected.
TimeoutWarning.prototype.startUiCountdown = function () {
  this.$module.showModal()
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

TimeoutWarning.prototype.checkIfShouldHaveTimedOut = function () {
}

module.exports = TimeoutWarning
