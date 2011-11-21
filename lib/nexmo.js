var querystring = require('querystring');
var request = require('request');
var Account = require('./account').Account;
var Numbers = require('./number').Numbers;
var SMS = require('./sms').SMS;

var nexmo = function(opts) {
  var options = opts || {};

  if(!options.key) throw new Error('Key is not defined');
  if(!options.secret) throw new Error('Secret is not defined');

  this.baseurl = options.baseurl || 'https://rest.nexmo.com';
  this.key = encodeURIComponent(options.key);
  this.secret = encodeURIComponent(options.secret);

  this.account = Account(this);
  this.number = Numbers(this);
  this.sms = SMS(this);
};

nexmo.prototype.encode = querystring.encode;

nexmo.prototype.request = request;

nexmo.prototype.getBaseURL = function() {
  return this.baseurl;
};

// Future proofing. If the API end point changes
// the user of the lib can at least set the base-url
// rather than wait for a version bump. (hardcoding sucks)
nexmo.prototype.setBaseURL = function(new_base_url) {
  this.baseurl = new_base_url;
};

exports.Nexmo = function(opts) {
  return new nexmo(opts);
};