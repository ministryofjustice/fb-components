const GOVUKFrontend = require('govuk-frontend/govuk/all')
const TimeoutWarning = require('./component/timeout-warning')
const Analytics = require('./component/analytics')

GOVUKFrontend.initAll()

new TimeoutWarning(
  document.querySelector('[data-module="govuk-timeout-warning"]')
).init()

window.analytics = Analytics
