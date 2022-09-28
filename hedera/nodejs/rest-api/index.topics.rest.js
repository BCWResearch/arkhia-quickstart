
// Make sure you have Axios (https://www.npmjs.com/package/axios) installed
const axios = require('axios');

// These 2 variables are taken from your Arkhia account. Sign up @ ()
const baseUrl = process.env.ARKHIA_REST_API_URL; 
const headerKey = process.env.ARKHIA_API_KEY;

// Arkhia topic for demo purposes
const arkhiaTopic = `0.0.1309510`;

// header config to work with Arkhia
const config = {
  method: 'get',
  url: baseUrl,
  headers: {
    'x-api-key': headerKey
  }
};

const getMessagesFromTopic = async (topicId) => {
  config.url = baseUrl + `topics/${topicId}/messages`;
  await axios(config)
    .then(function (response) {
      if (!response.data.status) {
        console.error(`Something went wrong: ${response.data.error}`);
        return;
      }
      console.info(response.data.response);
      console.info(`Retrieved ${response.data.response[`messages`].length} results`);
    })
    .catch(function (error) {
      console.log(error);
  });
}

getMessagesFromTopic(arkhiaTopic);

process.on('uncaughtException', (error) => {
  console.log(error)
});

process.on('unhandledRejection', (error) => {
  console.log(error)
});
