const API = require('./API');

(async function () {
    const api = new API({
      applicationKey: 'XXX', //Application Key, Required
      applicationSecret: 'XXX', //Application Secret, Required
      apiBaseUrl: 'XXX' //API Base URL, Optional, Default is https://api.trimpo.org
    });
    const resp = await api.request(
      {
        resource: '/api/public/version'
      }
    );
    console.log(JSON.parse(resp))
    
    /*
    Result: 
    
    currentVersion: 1,
    minVersion: 1,
    error_stack: null,
    error_code: 0,
    error_message: 'Method has been successfully executed'
    
    */
  }
)()
