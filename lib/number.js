var number = function(nexmo) {
  this.baseurl = nexmo.getBaseURL();
  this.key = nexmo.key;
  this.secret = nexmo.secret;
  this.request = nexmo.request;
};

number.prototype.search = function(country_code, opt_pattern, cb) {
  var callback;
  if(typeof country_code !== 'string' || country_code.length === 0) {
    throw new Error('Country code is required');
  }

  if(typeof opt_pattern === 'function') {
    callback = opt_pattern;
    opt_pattern = undefined;
  } else {
    if(typeof cb !== 'function') {
      throw new Error('Callback not defined');
    }

    callback = cb;
  }

  var url = this.baseurl+'/number/search/'+this.key+'/'+this.secret+'/'+country_code+((opt_pattern) ? '?pattern='+opt_pattern : '');

  this.request.get({
    url: url,
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

number.prototype.buy = function(country_code, msisdn, callback) {
  if(typeof country_code !== 'string' || country_code.length === 0) {
    throw new Error('Country code is required');
  }

  if(typeof msisdn !== 'number') {
    throw new Error('MSISDN is required');
  }

  if(typeof callback !== 'function') {
    throw new Error('Callback not defined');
  }

  this.request.get({
    url: this.baseurl+'/number/buy/'+this.key+'/'+this.secret+'/'+country_code+'/'+msisdn,
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, response, body) {
    if(response.statusCode === 200) {
      try {
        return callback(null, JSON.parse(body));
      } catch(e) {
        return callback(e, null);
      }
    }

    if(response.statusCode === 401) {
      return callback('Wrong Credentials', null);
    }

    if(response.statusCode === 420) {
      return callback('Wrong Parameters', null);
    }

    // unknown error
    if(err) {
      return callback(err || response, null);
    };
  });
};

number.prototype.cancel = function(country_code, msisdn, callback) {
  if(typeof country_code !== 'string' || country_code.length === 0) {
    throw new Error('Country code is required');
  }

  if(typeof msisdn !== 'number') {
    throw new Error('MSISDN is required');
  }

  if(typeof callback !== 'function') {
    throw new Error('Callback not defined');
  }

  this.request.get({
    url: this.baseurl+'/number/cancel/'+this.key+'/'+this.secret+'/'+country_code+'/'+msisdn,
    headers: {
      'Accept': 'application/json'
    }
  }, function(err, response, body) {
    if(response.statusCode === 200) {
      try {
        return callback(null, JSON.parse(body));
      } catch(e) {
        return callback(e, null);
      }
    }

    if(response.statusCode === 401) {
      return callback('Wrong Credentials', null);
    }

    if(response.statusCode === 420) {
      return callback('Wrong Parameters', null);
    }

    // unknown error
    if(err) {
      return callback(err || response, null);
    };
  });
};

exports.Numbers = function(nexmo) {
  return new number(nexmo);
};