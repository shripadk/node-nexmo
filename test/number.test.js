var nexmoFixture = require('./fixtures/nexmo.fixture').Fixture;

var nexmo = require('../');
var number = require('../lib/number');
var nodeunit = require('nodeunit-fork');
var testCase = nodeunit.testCase;

module.exports['test if Numbers is defined on number'] = testCase({
  'test if number.Numbers exists': function(test) {
    test.isFunction(number.Numbers, 'number.Numbers should exist');
    test.done();
  }
});

module.exports['test Number API - search'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;
    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test if this.nexmo.number is defined': function(test) {
    test.isObject(this.nexmo.number, 'Number should be defined on Nexmo');
    test.done();
  },
  'test nexmo.number.search throw if no Country Code': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.number.search(function() {});
    });
    test.done();
  },
  'test nexmo.number.search without pattern': function(test) {
    this.nexmo.number.search('ES', function(err, res) {
      test.isNumber(res.count);
      test.done();
    });
  },
  'test nexmo.number.search with pattern': function(test) {
    this.nexmo.number.search('ES', 7000, function(err, res) {
      test.isNumber(res.count);
      test.done();
    });
  }
});

module.exports['test Number API - buy'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;
    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test nexmo.number.buy throw if nothing passed': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.number.buy(function() {});
    });
    test.done();
  },
  'test nexmo.number.buy throw if no callback': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.number.buy('ES', 34911067000);
    });
    test.done();
  },
  'test nexmo.number.buy throw if no msisdn': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.number.buy('ES', function() {});
    });
    test.done();
  },
  'test nexmo.number.buy throw if no country-code': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.number.buy(34911067000, function() {});
    });
    test.done();
  }
});

module.exports['test Number API - cancel'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;
    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test nexmo.number.cancel throw if nothing passed': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.number.cancel(function() {});
    });
    test.done();
  },
  'test nexmo.number.cancel throw if no callback': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.number.cancel('ES', 34911067000);
    });
    test.done();
  },
  'test nexmo.number.cancel throw if no msisdn': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.number.cancel('ES', function() {});
    });
    test.done();
  },
  'test nexmo.number.cancel throw if no country-code': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.number.cancel(34911067000, function() {});
    });
    test.done();
  }
});
