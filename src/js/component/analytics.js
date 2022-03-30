function accept (cookieName) {
  setAnalyticsCookie(cookieName, 'accepted')
  hideCookieMessage()
  showMessage('accepted')
}

function reject (cookieName) {
  setAnalyticsCookie(cookieName, 'rejected')
  removeAnalyticsCookies()
  hideCookieMessage()
  showMessage('rejected')
}

function setAnalyticsCookie (cookieName, cookieValue) {
  document.cookie = `${cookieName}=${cookieValue}; expires=${new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24 * 365
  ).toUTCString()}; path=/`
}

function hideCookieMessage () {
  document.getElementById('govuk-cookie-banner-message').style.display = 'none'
}

function showMessage (messageType) {
  document.getElementById(`govuk-cookie-banner-message-${messageType}`).style.display = 'block'
}

function hideCookieBanner () {
  document.getElementById('govuk-cookie-banner').style.display = 'none'
}

function removeAnalyticsCookies () {
  const cookiePrefixes = ['_ga', '_gid', '_gat_gtag_', '_hj', '_utma', '_utmb', '_utmc', '_utmz']
  for (const cookie of document.cookie.split(';')) {
    for (const cookiePrefix of cookiePrefixes) {
      const cookieName = cookie.split('=')[0].trim()
      if (cookieName.startsWith(cookiePrefix)) {
        deleteCookie(cookieName)
      }
    }
  }
}

function deleteCookie (cookieName) {
  document.cookie = `${cookieName}=; Path=/; Domain=${location.hostname}; Expires=Thu, 01 Jan 1970 00:00:01 UTC;`
  document.cookie = `${cookieName}=; Path=/; Domain=.justice.gov.uk; Expires=Thu, 01 Jan 1970 00:00:01 UTC;`
}

module.exports = {
  accept: accept,
  reject: reject,
  hideCookieBanner: hideCookieBanner,
  removeAnalyticsCookies: removeAnalyticsCookies
}
