var nexmoFixture = require('./fixtures/nexmo.fixture').Fixture;

var nexmo = require('../');
var account = require('../lib/account');
var nodeunit = require('nodeunit-fork');
var testCase = nodeunit.testCase;

module.exports['test if Account is defined on account'] = testCase({
  'test if account.Account exists': function(test) {
    test.isFunction(account.Account, 'account.Account should exist');
    test.done();
  }
});

module.exports['test Account API - getBalance'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;
    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test if this.nexmo.account is defined': function(test) {
    test.isObject(this.nexmo.account, 'Account should be defined on Nexmo');
    test.done();
  },
  'test nexmo.account.getBalance': function(test) {
    var self = this;

    test.expect(2);
    test.request({
      uri: 'https://rest.nexmo.com/account/get-balance/' + this.key + '/' + this.secret,
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }, function(err, res, body) {
      self.nexmo.account.getBalance(function(err, response) {
        test.deepEqual(JSON.parse(body).value, response.value);
        test.done();
      })
    });
  }
});

module.exports['test Account API - getPricing'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;

    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test nexmo.account.getPricing': function(test) {
    test.expect(1);
    this.nexmo.account.getPricing('JE', function(err, response) {
      test.deepEqual('JE', response.country);
      test.done();
    });
  }
});

module.exports['test Account API - updateSecret'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;

    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test nexmo.account.updateSecret fails if secret length > 8': function(test) {
    var self = this;
    test.throws(function() {
      self.nexmo.account.updateSecret(secret+secret, function(err, response) {});
    });
    test.done();
  },
  'test nexmo.account.updateSecret': function(test) {
    test.expect(1);
    var secret = this.secret;
    this.nexmo.account.updateSecret(secret, function(err, response) {
      test.deepEqual(secret, response['api-secret']);
      test.done();
    });
  }
});

module.exports['test Account API - updateMOCallbackURL'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;

    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test nexmo.account.updateMOCallbackURL': function(test) {
    test.expect(1);
    this.nexmo.account.updateMOCallbackURL('http://mycallback.servername', function(err, response) {
      // as it is inactive url
      test.deepEqual('', response['mo-callback-url']);
      test.done();
    });
  }
});

module.exports['test Account API - updateDRCallbackURL'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;

    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test nexmo.account.updateDRCallbackURL': function(test) {
    test.expect(1);
    this.nexmo.account.updateDRCallbackURL('http://mycallback.servername', function(err, response) {
      // as it is inactive url
      test.deepEqual('', response['dr-callback-url']);
      test.done();
    });
  }
});

module.exports['test Account API - getNumbers'] = testCase({
  'setUp': function(callback) {
    this.key = nexmoFixture.key;
    this.secret = nexmoFixture.secret;

    this.nexmo = nexmo.Nexmo({
      key: this.key,
      secret: this.secret
    });
    callback();
  },
  'test nexmo.account.getNumbers': function(test) {
    test.expect(1);
    this.nexmo.account.getNumbers(function(err, response) {
      test.isNumber(response.count);
      test.done();
    });
  }
});