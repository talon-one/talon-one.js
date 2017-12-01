var TalonOne = require('../')

var applicationId = 15025
var applicationKey = '41d3f05e76fd667b'
var client = new TalonOne.IntegrationClient('https://mycompany.talon.one', applicationId, applicationKey)

var sessionId = 'some-identifier-for-this-session'
var customerId = 'id-used-by-my-company'


console.log('===============')
console.log('Track an event')
console.log('===============')
client.trackEvent(sessionId, customerId, 'bought_upgrade', {
  type: 'premium'
}, function (err, integrationState) {
  if (err){
    console.log(err)
  } else {
    console.log('+ profile:\n', integrationState.profile)
    console.log('+ session:\n', integrationState.session)
    console.log('+ event:\n', integrationState.event)
  }
})

console.log('===============')
console.log('Track an event (without customerId)')
console.log('===============')
client.trackEvent(sessionId, null, 'bought_upgrade', {
  type: 'premium'
}, function (err, integrationState) {
  if (err){
    console.log(err)
  } else {
    console.log('+ profile:\n', integrationState.profile)
    console.log('+ session:\n', integrationState.session)
    console.log('+ event:\n', integrationState.event)
  }
})
