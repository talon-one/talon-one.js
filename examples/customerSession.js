var TalonOne = require('../')

var applicationId = 15025
var applicationKey = '41d3f05e76fd667b'
var client = new TalonOne.IntegrationClient('https://mycompany.talon.one', applicationId, applicationKey)

var sessionId = 'some-identifier-for-this-session'
var customerId = 'id-used-by-my-company'


console.log('===============')
console.log('Open a session')
console.log('===============')
client.updateCustomerSession(sessionId, {
  // associate this session with the profile we created above
  profileId: customerId,
  // cart state in the session
  cartItems: [
    {
      sku: 'logd575bgp',
      name: 'Awesome Pullover',
      category: 'clothing',
      price: 11.12,
      quantity: 2
    }
  ],
  total: 22.24
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
console.log('Update a session')
console.log('===============')
client.updateCustomerSession(sessionId, {
  // associate this session with the profile we created above
  profileId: customerId,
  // cart state in the session
  cartItems: [
    {
      sku: 'logd575bgp',
      name: 'Awesome Pullover',
      category: 'clothing',
      price: 11.12,
      quantity: 1
    },
    {
      sku: '667gghb57',
      name: 'Awesome Trousers',
      category: 'clothing',
      price: 25.55,
      quantity: 1
    }
  ],
  total: 36.67
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
console.log('Update a session - set a coupon code')
console.log('===============')
client.updateCustomerSession(sessionId, {
  // associate this session with the profile we created above
  profileId: customerId,
  // set a coupon code for this session
  referral: 'somecoupon-identifier'
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
console.log('Update a session - set a referral code')
console.log('===============')
client.updateCustomerSession(sessionId, {
  // associate this session with the profile we created above
  profileId: customerId,
  // set a referral code for this session
  referral: 'somereferral-identifier'
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
console.log('Close a session')
console.log('===============')
client.updateCustomerSession(sessionId, {
  state: 'closed'
}, function (err, integrationState) {
  if (err){
    console.log(err)
  } else {
    console.log('+ profile:\n', integrationState.profile)
    console.log('+ session:\n', integrationState.session)
    console.log('+ event:\n', integrationState.event)
  }
})
