var nexmoFixture = require('./fixtures/nexmo.fixture').Fixture;
var SMSFixture = require('./fixtures/sms.fixture').Fixture;

var nexmo = require('../');
var sms = require('../lib/sms');
var nodeunit = require('nodeunit-fork');
var testCase = nodeunit.testCase;

module.exports['test if Numbers is defined on sms'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;
    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test if sms.SMS exists': function(test) {
    test.isFunction(sms.SMS, 'sms.SMS should exist');
    test.done();
  },
  'test if nexmo.sms exists': function(test) {
    test.isObject(this.nexmo.sms, 'SMS should be defined on Nexmo');
    test.done();
  }
});

module.exports['test nexmo.sms.send'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;
    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test nexmo.sms.send throws nothing passed': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.send();
    });
    test.done();
  },
  'test nexmo.sms.send throws when no callback': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.send({});
    });
    test.done();
  },
  'test nexmo.sms.send throws when no options': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send(function() {});
    });
    test.done();
  },
  'test nexmo.sms.send throws when no sender (from)': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send({
        to: SMSFixture.to
      }, function() {});
    });
    test.done();
  },
  'test nexmo.sms.send throws when no receiver (to)': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send({
        from: SMSFixture.from
      }, function() {});
    });
    test.done();
  },
  'test nexmo.sms.send throws when type specified does not exist': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send({
        from: SMSFixture.from,
        to: SMSFixture.to,
        type: 'undefined_type'
      }, function() {});
    });
    test.done();
  },
  'test nexmo.sms.send throws when type specified is "text" and no text parameter is passed': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send({
        from: SMSFixture.from,
        to: SMSFixture.to,
        type: 'text'
      }, function() {});
    });
    test.done();
  },
  'test nexmo.sms.send throws when type specified is "text" and text parameter is not a string': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send({
        from: SMSFixture.from,
        to: SMSFixture.to,
        type: 'text',
        text: []
      }, function() {});
    });
    test.done();
  },
  'test nexmo.sms.send throws when type specified is "binary" and body parameter is not a passed': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send({
        from: SMSFixture.from,
        to: SMSFixture.to,
        type: 'binary'
      }, function() {});
    });
    test.done();
  },
  'test nexmo.sms.send throws when type specified is "binary" and udh parameter is not a passed': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send({
        from: SMSFixture.from,
        to: SMSFixture.to,
        type: 'binary',
        body: 0011223344556677
      }, function() {});
    });
    test.done();
  },
  'test nexmo.sms.send throws when type specified is "wappush" and title parameter is not a passed': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send({
        from: SMSFixture.from,
        to: SMSFixture.to,
        type: 'wappush'
      }, function() {});
    });
    test.done();
  },
  'test nexmo.sms.send throws when type specified is "wappush" and url parameter is not a passed': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.sms.send({
        from: SMSFixture.from,
        to: SMSFixture.to,
        type: 'wappush',
        title: 'MySite'
      }, function() {});
    });
    test.done();
  },
  'test nexmo.sms.send ok': function(test) {
    this.nexmo.sms.send({
      from: SMSFixture.from,
      to: SMSFixture.to,
      type: 'text',
      text: 'Hello World!'
    }, function() {
      console.log(arguments);
      test.done();
    });
  }
});
