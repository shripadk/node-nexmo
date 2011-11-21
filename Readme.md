# Nexmo Node API

Nexmo is a cloud based SMS API that lets you send
and receive high volume of messages at wholesale rates.

## How to Install

    sudo npm install node-nexmo-api

## How to use

```js
var nexmo = require('nexmo').Nexmo({key: 'your-key', secret: 'your-secret'});

nexmo.sms.send({
  from: 'your-nexmo-number-here',
  to: 'receiver-number-here',
  type: 'text',
  text: 'Hello World!'
}, function(err, response) {
  /**
   Sample Response:
   { 'message-count': '1',
      messages: 
       [ { 'message-price': '0.00450000',
           status: '0',
           'message-id': '05861BCE',
           'remaining-balance': '1.32350000',
           statusText: 'Success',
           meaning: 'The message was successfully accepted for delivery by nexmo' } ] }
   */
});
```
Look at the `test/` directory for more examples.

Before running tests change the values in the `test/fixtures` folder.

To run the tests:

    make test

API
---

Account
---

### Get Balance ###
```js
// Retrieve your current account balance
nexmo.account.getBalance(function(err, res) { ... });
```

### Get Pricing (use Country Codes) ###
```js
// Retrieve Nexmo's outbound pricing for a given country
nexmo.account.getPricing('IN', function(err, res) { ... });
```

### Update Settings ###
```js
// Update your account settings
nexmo.account.updateSettings({
  newSecret: 'max8char', // Optional. Your new API secret (8 characters max)
  moCallBackUrl: 'http://mycallback.servername', // Optional. Inbound call back URL
  drCallBackUrl: 'http://mycallback.servername' // Optional. DLR call back URL
}, function(err, res) { ... });

// want it to be much simpler?

nexmo.account.updateSecret('max8char', function(err, res) { ... });
nexmo.account.updateMOCallbackURL('http://mycallback.servername', function(err, res) { ... });
nexmo.account.updateDRCallbackURL('http://mycallback.servername', function(err, res) { ... });
```

### Get Numbers ###
```js
// Get all inbound numbers associated with your Nexmo Account
nexmo.account.getNumbers(function(err, res) { ... });
```

Number
---

### Number - search ###
```js
// Get available inbound numbers for a given country
// Required parameters: country-code (ex: ES).
// Optional parameter:  pattern (ex: 7000)
nexmo.number.search('ES', 7000, function(err, res) { ... });
nexmo.number.search('ES', function(err, res) { ... });
```

### Number - buy ###
```js
// Purchase a given inbound number
// Required parameters:
//    country-code : Country code (ex: ES).
//    msisdn : An available inbound number (ex: 34911067000)
// Response:
//    Http Status 200 if successful purchase
//    Http Status 401 if wrong credentials
//    Http Status 420 if wrong parameters
nexmo.number.buy('ES', 34911067000, function(err, res) { ... });
```

### Number - cancel ###
```js
// Cancel an inbound number
// Required parameters:
//    country-code : Country code (ex: ES).
//    msisdn : An available inbound number (ex: 34911067000)
// Response:
//    Http Status 200 if successful purchase
//    Http Status 401 if wrong credentials
//    Http Status 420 if wrong parameters
nexmo.number.cancel('ES', 34911067000, function(err, res) { ... });
```

I'll be adding more examples soon, including a fun example application (probably an article?).
Please fork and contribute and send me pull requests.
This was done in 2 hours time, so there might be some bugs somewhere.
All tests pass for now. If you found a bug, but lazy to implement the solution don't hesitate to
leave behind at least a failing test so I can fix it immediately. :)

## License 

(The MIT License)

Copyright (c) 2011 Shripad K &lt;assortmentofsorts@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.