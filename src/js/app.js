const GOVUKFrontend = require('govuk-frontend/govuk/all')
import TimeoutWarning from './component/timeout-warning/timeout-warning'

GOVUKFrontend.initAll()

var $timeoutWarning = document.querySelector(
  '[data-module="govuk-timeout-warning"]'
)

new TimeoutWarning($timeoutWarning).init()
