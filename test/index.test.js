var nexmoFixture = require('./fixtures/nexmo.fixture').Fixture;

var nexmo = require('../');
var nodeunit = require('nodeunit-fork');
var testCase = nodeunit.testCase;

module.exports['test if Nexmo is defined on nexmo'] = testCase({
  'test if nexmo.Nexmo exists': function(test) {
    test.isFunction(nexmo.Nexmo, 'nexmo.Nexmo should exist');
    test.done();
  }
});

// Make API Future-Proof. Should not hardcode API end-point.
// Let users define a new base URL if API URL end-point changes.
module.exports['test for base-url'] = testCase({
  'setUp': function(callback) {
    this.nexmo = nexmo.Nexmo({
      key: nexmoFixture.key,
      secret: nexmoFixture.secret
    });
    callback();
  },
  'tearDown': function(callback) {
    this.nexmo = undefined;
    callback();
  },
  'test get base-url': function(test) {
    test.deepEqual(this.nexmo.getBaseURL(), 'https://rest.nexmo.com');
    test.done();
  },
  'test new base-url (directly supplying to constructor)': function(test) {
    this.nexmo = nexmo.Nexmo({
      baseurl: 'https://newrest.nexmo.com',
      key: nexmoFixture.key,
      secret: nexmoFixture.secret
    });
    test.deepEqual(this.nexmo.getBaseURL(), 'https://newrest.nexmo.com');
    test.done();
  },
  'test new base-url setter': function(test) {
    this.nexmo.setBaseURL('https://newrest.nexmo.com');
    test.deepEqual(this.nexmo.getBaseURL(), 'https://newrest.nexmo.com');
    test.done();
  }
});