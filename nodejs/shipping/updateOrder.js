const content = {
  "order": {
    "clientNumber": "TEST-5",
  },
  "items": [
    {
      "cost": 150
    }
  ],
  "sender": {
    "postIndex": "125195",
    "countryCode": "RU",
    "region": "Москва",
    "city": "Москва",
    "street": "Беломорская улица",
    "house": "16",
    "contactName": "Сидоров Анатолий Сергеевич",
    "phone": "79155366499",
    "email": "ashishkin@trimpo.org",
    "comment": "Это отправитель"
  },
  "recipient": {
    "postIndex": "117639",
    "countryCode": "RU",
    "region": "Москва",
    "city": "Москва",
    "street": "Ленина",
    "house": "1",
    "block": "с2к1",
    "office": "51",
    "companyName": "ООО \"Иваново\"",
    "contactName": "Иванов Иван Иванович",
    "phone": "79250001115",
    "email": "recepient@domain.com",
    "comment": "Это получатель"
  }
}

const API = require('../API');
(async function () {

    const api = new API({
      applicationKey: 'XXX',
      applicationSecret: 'XXX'
    });

    const ret = await api.request(
      {
        method: 'POST',
        resource: '/api/public/shipping/order/update',
        content
      }
    );
    console.log(JSON.parse(ret))

  }
)()
