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
  console.log(response['message-count']);
});
```
Look at the `test/` directory for more examples.

Before running tests change the values in the `test/fixtures` folder.

To run the tests:

    make test

I'll be adding more examples soon.

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