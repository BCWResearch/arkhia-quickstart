
// Make sure you have Axios (https://www.npmjs.com/package/axios) installed
const axios = require('axios');

// These 2 variables are taken from your Arkhia account. Sign up @ (https://auth.arkhia.io/signup)
const baseUrl = process.env.ARKHIA_REST_API_URL; 
const headerKey = process.env.ARKHIA_API_KEY;

// header config to work with Arkhia
const config = {
  method: 'get',
  url: baseUrl,
  headers: {
    'x-api-key': headerKey
  }
};

// Replace with the data you need to access from the mirror node
const standardApiRequests = {
  transactions: `transactions`,
  contracts: `contracts`,
  tokens: `tokens`,
  accounts: `accounts`,
  balances: `balances`,
  blocks: `blocks`,
  schedules: `schedules`,
  tokens: `tokens`,
};

const getMirrorNodeRestData = async (apiRequest) => {
  config.url = `${baseUrl}/${apiRequest}`;
  await axios(config)
    .then(function (response) {
      if (!response.data) {
        console.error(`Something went wrong`);
        return;
      }
      console.info(response.data);
      console.info(`Retrieved ${response.data[apiRequest].length} results`);
    })
    .catch(function (error) {
      console.log(error);
  });
}

getMirrorNodeRestData(standardApiRequests.tokens);

process.on('uncaughtException', (error) => {
  console.log(error)
});

process.on('unhandledRejection', (error) => {
  console.log(error)
});
