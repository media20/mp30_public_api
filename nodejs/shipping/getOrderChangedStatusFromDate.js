const moment = require('moment');
const API = require('../API');

(async function () {
    const api = new API({
      applicationKey: 'XXX',
      applicationSecret: 'XXX'
    });
    const ret = await api.request(
      {
        resource: 'api/public/shipping/order/statuses/date/' + moment().subtract(1,'days').format(),
        queryParams: {limit: 100}
      }
    );
    console.log(JSON.parse(ret))
  }
)()
