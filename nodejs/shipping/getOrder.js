const API = require('../API');
(async function () {
    const api = new API({
      applicationKey: 'XXX',
      applicationSecret: 'XXX'
    });
    const ret = await api.request(
      {
        resource: 'api/public/shipping/order',
        queryParams: {clientNumber: 'TEST-5'}
      }
    );
    console.log(JSON.parse(ret))
  }
)()
