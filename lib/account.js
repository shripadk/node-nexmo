var account = function(nexmo) {
  this.baseurl = nexmo.getBaseURL();
  this.key = nexmo.key;
  this.secret = nexmo.secret;
  this.request = nexmo.request;
  this.encode = nexmo.encode;
};

account.prototype.getBalance = function(callback) {
  if(!callback) {
    throw new Error('No callback defined');
  }

  this.request.get({
    url: this.baseurl+'/account/get-balance/'+this.key+'/'+this.secret,
    headers: {
      'Accept': 'application/json'
    }},
  function(err, response, body) {
    if(err) {
      return callback(err, null);
    }

    try {
      return callback(null, JSON.parse(body));
    } catch(e) {
      return callback(e, null);
    }
  });
};

account.prototype.getPricing = function(countryCode, callback) {
  if(typeof countryCode !== 'string') {
    throw new Error('Country code should be defined and be a string');
  }

  if(!callback) {
    throw new Error('No callback defined');
  }

  this.request.get({
    url: this.baseurl+'/account/get-pricing/outbound/'+this.key+'/'+this.secret+'/'+countryCode,
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, response, body) {
    if(err || (response.statusCode !== 200)) {
      return callback(err || response, null);
    }

    try {
      return callback(null, JSON.parse(body));
    } catch(e) {
      return callback(e, null);
    }
  });
};

account.prototype.updateSecret = function(secret, callback) {
  if(typeof secret !== 'string') {
    throw new Error('Secret should be a string');
  }

  if(!callback) {
    throw new Error('No callback defined');
  }

  if(secret.length > 8) {
    throw new Error('newSecret Length should be less than 8 characters');
  }

  this.request.post({
    url: this.baseurl+'/account/settings/'+this.key+'/'+this.secret+'?'+this.encode({newSecret: secret}),
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, response, body) {
    if(err || (response.statusCode !== 200)) {
      return callback(err || response, null);
    };

    try {
      return callback(null, JSON.parse(body));
    } catch(e) {
      return callback(e, null);
    }
  });
};

account.prototype.updateMOCallbackURL = function(moCallBackUrl, callback) {
  if(typeof moCallBackUrl !== 'string') {
    throw new Error('moCallBackUrl should be a string');
  }

  if(!callback) {
    throw new Error('No callback defined');
  }

  this.request.post({
    url: this.baseurl+'/account/settings/'+this.key+'/'+this.secret+'?'+this.encode({moCallBackUrl: encodeURIComponent(moCallBackUrl)}),
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, response, body) {
    if(err || (response.statusCode !== 200)) {
      return callback(err || response, null);
    };

    try {
      return callback(null, JSON.parse(body));
    } catch(e) {
      return callback(e, null);
    }
  });
};

account.prototype.updateDRCallbackURL = function(drCallBackUrl, callback) {
  if(typeof drCallBackUrl !== 'string') {
    throw new Error('drCallBackUrl should be a string');
  }

  if(!callback) {
    throw new Error('No callback defined');
  }

  this.request.post({
    url: this.baseurl+'/account/settings/'+this.key+'/'+this.secret+'?'+this.encode({drCallBackUrl: encodeURIComponent(drCallBackUrl)}),
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, response, body) {
    if(err || (response.statusCode !== 200)) {
      return callback(err || response, null);
    };

    try {
      return callback(null, JSON.parse(body));
    } catch(e) {
      return callback(e, null);
    }
  });
};

account.prototype.updateSettings = function(options, callback) {
  if(typeof options === 'function') {
    throw new Error('No Options defined');
  }

  if(!callback) {
    throw new Error('No callback defined');
  }

  var opts = {};

  if(typeof options === 'string') {
    opts.newSecret = options;
  } else if(typeof options === 'object' && (typeof options.length === 'undefined')) {
    (options.hasOwnProperty('newSecret')) ? opts.newSecret = options.newSecret : null;
    (options.hasOwnProperty('moCallBackUrl')) ? opts.moCallBackUrl = options.moCallBackUrl : null;
    (options.hasOwnProperty('drCallBackUrl')) ? opts.drCallBackUrl = options.drCallBackUrl : null;
  } else {
    throw new Error('Either a string or an object must be specified');
  }

  if(typeof opts.newSecret !== 'string') {
    throw new Error('Secret should be a string');
  }
  if(typeof opts.moCallBackUrl !== 'string') {
    throw new Error('moCallBackUrl should be a string');
  }
  if(typeof opts.drCallBackUrl !== 'string') {
    throw new Error('drCallBackUrl should be a string');
  }

  if(opts.newSecret.length > 8) {
    throw new Error('newSecret Length should be less than 8 characters');
  }

  this.request.post({
    url: this.baseurl+'/account/settings/'+this.key+'/'+this.secret+'?'+this.encode(opts),
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, response, body) {
    if(err || (response.statusCode !== 200)) {
      return callback(err || response, null);
    };

    try {
      return callback(null, JSON.parse(body));
    } catch(e) {
      return callback(e, null);
    }
  });
};

account.prototype.getNumbers = function(callback) {
  if(!callback) {
    throw new Error('No callback defined');
  }

  this.request.get({
    url: this.baseurl+'/account/numbers/'+this.key+'/'+this.secret,
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, response, body) {
    if(err || (response.statusCode !== 200)) {
      return callback(err || response, null);
    };

    try {
      return callback(null, JSON.parse(body));
    } catch(e) {
      return callback(e, null);
    }
  });
};

exports.Account = function(nexmo) {
  return new account(nexmo);
};