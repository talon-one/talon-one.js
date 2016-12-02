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

<a name="module_talon-one/integration"></a>

## talon-one/integration

* [talon-one/integration](#module_talon-one/integration)
    * [.Client](#module_talon-one/integration.Client)
        * [new IntegrationClient(baseUrl, applicationId, applicationKey, context)](#new_module_talon-one/integration.Client_new)
        * [.updateCustomerSession(sessionId, updates)](#module_talon-one/integration.Client+updateCustomerSession)
        * [.updateCustomerProfile(customerId, updates)](#module_talon-one/integration.Client+updateCustomerProfile)
        * [.trackEvent(sessionId, updates)](#module_talon-one/integration.Client+trackEvent)
    * [.handleEffect(effectName, handler)](#module_talon-one/integration.handleEffect)

<a name="module_talon-one/integration.Client"></a>

### talon-one/integration.Client
**Kind**: static class of <code>[talon-one/integration](#module_talon-one/integration)</code>  

* [.Client](#module_talon-one/integration.Client)
    * [new IntegrationClient(baseUrl, applicationId, applicationKey, context)](#new_module_talon-one/integration.Client_new)
    * [.updateCustomerSession(sessionId, updates)](#module_talon-one/integration.Client+updateCustomerSession)
    * [.updateCustomerProfile(customerId, updates)](#module_talon-one/integration.Client+updateCustomerProfile)
    * [.trackEvent(sessionId, updates)](#module_talon-one/integration.Client+trackEvent)

<a name="new_module_talon-one/integration.Client_new"></a>

#### new IntegrationClient(baseUrl, applicationId, applicationKey, context)
Create an HTTP client that will handle signing requests for the integration API


| Param | Type | Description |
| --- | --- | --- |
| baseUrl | <code>string</code> | The root URL for requests, e.g. https://mycompany.talon.one |
| applicationId | <code>number</code> &#124; <code>string</code> | The ID of the application sending the request. |
| applicationKey | <code>string</code> | The hexadecimal API key for the application sending the request. |
| context | <code>object</code> | Data specific to this client instance that will be passed to global effect handlers. |

<a name="module_talon-one/integration.Client+updateCustomerSession"></a>

#### client.updateCustomerSession(sessionId, updates)
Update/create a customer session.

**Kind**: instance method of <code>[Client](#module_talon-one/integration.Client)</code>  
**See**: [http://developers.talon.one/integration-api/reference/#updateCustomerSession](http://developers.talon.one/integration-api/reference/#updateCustomerSession)  

| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>string</code> | The integration ID of the customer |
| updates | <code>Object</code> | an object containing session properties to update |

<a name="module_talon-one/integration.Client+updateCustomerProfile"></a>

#### client.updateCustomerProfile(customerId, updates)
Update/create a customer profile

**Kind**: instance method of <code>[Client](#module_talon-one/integration.Client)</code>  
**See**: [http://developers.talon.one/integration-api/reference/#updateCustomerProfile](http://developers.talon.one/integration-api/reference/#updateCustomerProfile)  

| Param | Type | Description |
| --- | --- | --- |
| customerId | <code>string</code> | The integration ID of the customer |
| updates | <code>Object</code> | an object containing profile properties to update |

<a name="module_talon-one/integration.Client+trackEvent"></a>

#### client.trackEvent(sessionId, updates)
Track a custom event

**Kind**: instance method of <code>[Client](#module_talon-one/integration.Client)</code>  
**See**: [http://developers.talon.one/integration-api/reference/#trackEvent](http://developers.talon.one/integration-api/reference/#trackEvent)  

| Param | Type | Description |
| --- | --- | --- |
| sessionId | <code>string</code> | The integration ID of the customer |
| updates | <code>Object</code> | an object containing profile properties to update |

<a name="module_talon-one/integration.handleEffect"></a>

### talon-one/integration.handleEffect(effectName, handler)
Register a global effect handler. This handler will be called whenever a
matching effect is returned by the API, with it's first argument being the
`context` value of the client that performed the request. See the API docs on
handling effects to see which handlers should be registered and what their
remaining arguments will be.

**Kind**: static method of <code>[talon-one/integration](#module_talon-one/integration)</code>  
**See**: [http://developers.talon.one/integration-api/handling-effects/](http://developers.talon.one/integration-api/handling-effects/)  

| Param | Type | Description |
| --- | --- | --- |
| effectName | <code>string</code> | The name of the effect to handle. |
| handler | <code>function</code> | The handler callback. |

