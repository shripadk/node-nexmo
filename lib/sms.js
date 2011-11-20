var Codes = require('./codes').Codes;
var Types = require('./types').Types;

var sms = function(nexmo) {
  this.baseurl = nexmo.getBaseURL() + '/sms/json';
  this.username = nexmo.key;
  this.password = nexmo.secret;
  this.request = nexmo.request;
  this.encode = nexmo.encode;
};

sms.prototype.send = function(options, callback) {
  if(typeof options !== 'object' && options.length !== 'undefined') {
    throw new Error('Required parameters in an Object');
  }

  if(typeof callback !== 'function') {
    throw new Error('Callback not defined');
  }

  if(!options.from) {
    throw new Error('Required parameter: Sender Address (from).');
  }

  if(!options.to) {
    throw new Error('Required parameter: Receiver Address (to).');
  }

  if(options.type) {
    if(!Types[options.type]) {
      throw new Error('No '+options.type+' type defined.');
    }
  } else {
    options.type = 'text';
  }

  if(options.type === 'text') {
    if(!options.hasOwnProperty('text')) {
      throw new Error('Required parameter: text, for type="text"');
    }

    if(typeof options.text !== 'string') {
      throw new Error('Parameter text should be a string');
    }
  }

  if(options.type === 'binary') {
    if(!options.hasOwnProperty('body')) {
      throw new Error('Required parameter: body, for type="binary"');
    }
    if(!options.hasOwnProperty('udh')) {
      throw new Error('Required parameter: udh, for type="binary"');
    }
  }

  if(options.type === 'wappush') {
    if(!options.hasOwnProperty('title')) {
      throw new Error('Required parameter: title, for type="wappush"');
    }
    if(!options.hasOwnProperty('url')) {
      throw new Error('Required parameter: url, for type="wappush"');
    }
  }

  options.username = this.username;
  options.password = this.password;

  this.request.post({
    url: this.baseurl+'?'+this.encode(options),
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, response, body) {
    if(err || (response.statusCode !== 200)) {
      return callback(err || response, null);
    };

    try {
      var res = JSON.parse(body);
      return callback(null, res);
    } catch(e) {
      return callback(e, null);
    }
  });
};

exports.SMS = function(nexmo) {
  return new sms(nexmo);
};