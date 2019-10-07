const request = require('request');
const moment = require('moment');
const crypto = require('crypto');

class API {

  constructor(args) {
    if (!args || typeof args != 'object') {
      throw new Error('Initial config required')
    }
    if (!args.applicationKey || !args.applicationSecret) {
      throw new Error('Expected applicationKey or applicationSecret')
    }
    this._applicationKey = args.applicationKey;
    this._applicationSecret = args.applicationSecret;
    this._apiBaseUrl = args.apiBaseUrl || 'https://api.trimpo.org';
  }

  _getString(conf) {

    if (!conf.method || !conf.date || !conf.resource) {
      throw new Error('Expected required params in _getString method')
    }

    let string = conf.method + ':' + conf.date + ':' + conf.resource;
    if (conf.method == 'POST' && conf.contentMd5) {
      string = string + ':' + conf.contentMd5
    }
    return string
  }

  _getHash(string) {
    let hmac = crypto.createHmac('sha1', this._applicationSecret);
    hmac.update(string);
    return hmac.digest('hex');
  }

  getUrl(resource) {
    return this._apiBaseUrl + resource;
  }

  getHeaders(method, resource, stringContent) {
    const date = moment().format("ddd, D MMM YYYY HH:MM:SS ZZ");
    const contentMd5 = (stringContent) ? crypto.createHash('md5').update(stringContent).digest("hex") : null;
    const string = this._getString({
      date,
      contentMd5,
      method,
      resource
    });

    //console.log(string)

    const token = this._getHash(string);

    const headers = {
      'Content-Type': 'application/json',
      'X-MP30-Version': '1',
      'X-MP30-Date': date,
      'X-MP30-Application-Id': this._applicationKey,
      'X-MP30-Token': token
    }

    return headers

  }


  request(args) {

    if (!args || typeof args != 'object') {
      args = {}
    }

    const method = (args.method && args.method.toUpperCase() == 'POST')? 'POST' : 'GET';

    if (!args.resource) {
      throw new Error('Resource is not defined')
    }

    const resource = (args.resource[0] != '/')? '/'+args.resource : args.resource;

    const stringContent = (args.content) ? JSON.stringify(args.content) : null;

    const params = {
      headers: this.getHeaders(method, resource, stringContent),
      url: this.getUrl(resource),
    }

    if (stringContent) {
      params.body = stringContent;
    }
    if (args.queryParams) {
      params.qs = args.queryParams
    }

    //console.log(params);

    const promise = new Promise((resolve, reject) => {

      request[method.toLowerCase()](params, (error, response, body) => {
        if (error) {
          reject(error)
        }
        resolve(body)
      });

    });

    return promise

  }

}

module.exports = API
