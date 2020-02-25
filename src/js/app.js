const GOVUKFrontend = require('govuk-frontend/govuk/all')
const TimeoutWarning = require('./component/timeout-warning')

GOVUKFrontend.initAll()

new TimeoutWarning(
  document.querySelector('[data-module="govuk-timeout-warning"]')
).init()
