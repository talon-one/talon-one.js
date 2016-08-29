# talon-one - client for Talon.One Integration API

## Synopsis

```javascript
var TalonOne = require('talon-one')

var applicationId = 15025
var applicationKey = '41d3f05e76fd667b'

var client = new TalonOne.IntegrationClient('https://mycompany.talon.one', applicationId, applicationKey)

var customerId = 'id-used-by-my-company'

client.updateCustomerProfile(customerId, {
  // only include properties you want to update, null values are ignored
  name: 'Val Kust',
}, function (err, integrationState) {
  console.log(integrationState.profile)
  console.log(integrationState.event)
})

var sessionId = 'some-identifier-for-this-session'

client.updateCustomerSession(customerId, {
  // associate this session with the profile we created above
  profileId: profileId,
  // set the currency being used in this session
  currency: 'USD',
}, function (err, integrationState) {
  console.log(integrationState.profile)
  console.log(integrationState.session)
  console.log(integrationState.event)
})

client.trackEvent(sessionId, 'mycompany-reached-goal', {
  goalId: 1234,
  goalName: 'Tweeted about My Company',
}, function (err, integrationState) {
  console.log(integrationState.profile)
  console.log(integrationState.session)
  console.log(integrationState.event)
})
```

# API

## IntegrationClient
**Kind**: global class  

* [IntegrationClient](#IntegrationClient)
    * [new IntegrationClient(baseUrl, applicationId, applicationKey)](#new_IntegrationClient_new)
    * [.updateCustomerSession(sessionId, updates)](#IntegrationClient+updateCustomerSession)
    * [.updateCustomerProfile(customerId, updates)](#IntegrationClient+updateCustomerProfile)
    * [.trackEvent(sessionId, updates)](#IntegrationClient+trackEvent)

<a name="new_IntegrationClient_new"></a>

### new IntegrationClient(baseUrl, applicationId, applicationKey)
Create an HTTP client that will handle signing requests for the integration API


| Param | Type | Description |
| --- | --- | --- |
| baseUrl | <code>string</code> | The root URL for requests, e.g. https://mycompany.talon.one |
| applicationId | <code>number</code> &#124; <code>string</code> | The ID of the application sending the request. |
| applicationKey | <code>string</code> | The hexadecimal API key for the application sending the request. |

<a name="IntegrationClient+updateCustomerSession"></a>

### integrationClient.updateCustomerSession(sessionId, updates)
Update/create a customer session.

**Kind**: instance method of <code>[IntegrationClient](#IntegrationClient)</code>  
**See**: [https://mycompany.talon.one/docs/api/#operation--v1-customer_sessions--customerSessionId--put](https://mycompany.talon.one/docs/api/#operation--v1-customer_sessions--customerSessionId--put)  

| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>string</code> | The integration ID of the customer |
| updates | <code>Object</code> | an object containing session properties to update |

<a name="IntegrationClient+updateCustomerProfile"></a>

### integrationClient.updateCustomerProfile(customerId, updates)
Update/create a customer profile

**Kind**: instance method of <code>[IntegrationClient](#IntegrationClient)</code>  
**See**: [https://mycompany.talon.one/docs/api/#operation--v1-customer_profiles--integrationId--put](https://mycompany.talon.one/docs/api/#operation--v1-customer_profiles--integrationId--put)  

| Param | Type | Description |
| --- | --- | --- |
| customerId | <code>string</code> | The integration ID of the customer |
| updates | <code>Object</code> | an object containing profile properties to update |

<a name="IntegrationClient+trackEvent"></a>

### integrationClient.trackEvent(sessionId, updates)
Track a custom event

**Kind**: instance method of <code>[IntegrationClient](#IntegrationClient)</code>  
**See**: [https://mycompany.talon.one/docs/api/#operation--v1-events-post](https://mycompany.talon.one/docs/api/#operation--v1-events-post)  

| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>string</code> | The integration ID of the customer |
| updates | <code>Object</code> | an object containing profile properties to update |

