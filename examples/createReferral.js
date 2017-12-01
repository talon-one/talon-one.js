var TalonOne = require('../')

var applicationId = 15025
var applicationKey = '41d3f05e76fd667b'
var client = new TalonOne.IntegrationClient('https://mycompany.talon.one', applicationId, applicationKey)

var sessionId = 'some-identifier-for-this-session'
var customerId = 'id-used-by-my-company'
var campaignId = 7

console.log('===============')
console.log('Creat a referral code (without options)')
console.log('===============')
client.createReferral(campaignId, customerId, null, function (err, integrationState) {
  if (err){
    console.log(err)
  } else {
    console.log('+ code:', integrationState.code)
    console.log('+ advocateProfileIntegrationId: ', integrationState.advocateProfileIntegrationId)
  }
})

console.log('===============')
console.log('Creat a referral code (with a friend)')
console.log('===============')
client.createReferral(campaignId, customerId, {
  friendId: 'NewCustomerProfile33'
}, function (err, integrationState) {
  if (err){
    console.log(err)
  } else {
    console.log('+ code:', integrationState.code)
    console.log('+ advocateProfileIntegrationId: ', integrationState.advocateProfileIntegrationId)
    console.log('+ friendProfileIntegrationId: ', integrationState.friendProfileIntegrationId)
  }
})

console.log('===============')
console.log('Creat a referral code (with start and expiry dates)')
console.log('===============')
client.createReferral(campaignId, customerId, {
  start: '2014-07-07T00:00:00Z',
  end: '2014-07-14T00:00:00Z'
}, function (err, integrationState) {
  if (err){
    console.log(err)
  } else {
    console.log('+ code:', integrationState.code)
    console.log('+ advocateProfileIntegrationId: ', integrationState.advocateProfileIntegrationId)
    console.log('+ startDate: ', integrationState.startDate)
    console.log('+ expiryDate: ', integrationState.expiryDate)
  }
})
