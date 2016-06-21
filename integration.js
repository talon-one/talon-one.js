var url = require('url')
var https = require('https')
var crypto = require('crypto')

/**
 * Create an HTTP client that will handle signing requests for the integration API
 *
 * @param {string} baseUrl The root URL for requests, e.g. https://mycompany.talon.one
 * @param {number|string} shopId The ID of the shop sending the request.
 * @param {string} shopKey The hexadecimal API key for the shop sending the request.
 *
 * @
 */
exports.createClient = Client
  
function Client (baseUrl, shopId, shopKey) {
  if (!(this instanceof Client)) {
    return new Client(baseUrl, shopId, shopKey)
  }

  this.defaults = url.parse(baseUrl)
  this.defaults.pathname = this.defaults.pathname.replace(/\/$/, '')
  this.shopId = shopId
  this.hmacKey = new Buffer(shopKey, 'hex')
}

Client.prototype.updateCustomerProfile = function (customerId, updates, callback) {
  return this.request('PUT', '/v1/customer_profiles/' + customerId, updates, callback)
}

Client.prototype.updateCustomerSession = function (sessionId, updates, callback) {
  return this.request('PUT', '/v1/customer_sessions/' + sessionId, updates, callback)
}

Client.prototype.trackEvent = function (sessionId, eventType, eventData, callback) {
  return this.request('POST', '/v1/events', {sessionId: sessionId, type: eventType, value: eventData}, callback)
}

Client.prototype.request = function (method, path, payload, callback) {
  var req = https.request({
    method: method,
    host: this.defaults.host,
    path: this.defaults.pathname + path,
  })

  if (payload) {
    var buff = new Buffer(JSON.stringify(payload))
    var hmac = crypto.createHmac('md5', this.hmacKey);
    hmac.write(buff);
    hmac.end()
    var signature = hmac.read().toString('hex')
    req.setHeader('Content-Type', 'application/json')
    req.setHeader('Content-Signature', 'signer=' + this.shopId + '; signature=' + signature)
    req.write(buff)
  }

  req.end()

  var buffs = []
  req.on('error', callback)
  req.on('response', function (res) {
    var responseLength = 0
    res.on('error', callback)
    res.on('data', function (buff) {
      buffs.push(buff)
      responseLength += buff.length
    })
    res.on('end', function () {
      var buff = Buffer.concat(buffs, responseLength)
      var data
      try {
        data = JSON.parse(buff.toString())
      } catch (err) {
        callback(new Error('Received non-JSON response: ' + buff))
      }
      if (res.statusCode >= 200 && res.statusCode < 300) {
        callback(null, data)
      } else {
        var err = new Error(data.message)
        err.statusCode = res.statusCode
        callback(err)
      }
    })
  })

  return req
}
