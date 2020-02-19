function TimeoutWarning($module) {
  this.$module = $module
  // code goes here
  console.log('TimeoutWarning ()')
  alert('assas')
}

TimeoutWarning.prototype.init = function() {
  console.log('TimeoutWarning init()')
}

export default TimeoutWarning
