exports.Codes = {
  0: {
    'status': 'Success',
    'meaning': 'The message was successfully accepted for delivery by nexmo'
  },

  1: {
    'status': 'Throttled',
    'meaning': 'You have exceeded the submission capacity allowed on this account, please back-off and retry'
  },

  2: {
    'status': 'Missing params',
    'meaning': 'Your request is incomplete and missing some mandatory parameters'
  },

  3: {
    'status': 'Invalid params',
    'meaning': 'The value of one or more parameters is invalid'
  },

  4: {
    'status': 'Invalid credentials',
    'meaning': 'The username / password you supplied is either invalid or disabled'
  },

  5: {
    'status': 'Internal error',
    'meaning': 'An error has occurred in the nexmo platform whilst processing this message'
  },

  6: {
    'status': 'Invalid message',
    'meaning': 'The Nexmo platform was unable to process this message, for example, an un-recognized number prefix'
  },

  7: {
    'status': 'Number barred',
    'meaning': 'The number you are trying to submit to is blacklisted and may not receive messages'
  },

  8: {
    'status': 'Partner account barred',
    'meaning': 'The username you supplied is for an account that has been barred from submitting messages'
  },

  9: {
    'status': 'Partner quota exceeded',
    'meaning': 'Your pre-pay account does not have sufficient credit to process this message'
  },

  10: {
    'status': 'Too many existing binds',
    'meaning': 'The number of simultaneous connections to the platform exceeds the capabilities of your account'
  },

  11: {
    'status': 'Account not enabled for REST',
    'meaning': 'This account is not provisioned for REST submission, you should use SMPP instead'
  },

  12: {
    'status': 'Message too long',
    'meaning': 'Applies to Binary submissions, where the length of the UDF and the message body combined exceed 140 octets'
  },

  15: {
    'status': 'Invalid sender address',
    'meaning': 'The sender address (from parameter) was not allowed for this message'
  },

  16: {
    'status': 'Invalid TTL',
    'meaning': 'The ttl parameter values is invalid'
  }
};