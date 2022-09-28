const axios = require('axios');
const jsonRpcHandler = require('./handlers/json.rpc.relay');

const data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": [
    "0.0.1098169"
  ],
  "id": 0
});

const config = {
  method: 'post',
  url: jsonRpcHandler.getUrl(),
  headers: {
  'Content-Type': 'application/json'
},
  data : data
};
async function main() {
    await axios(config)
        .then(function (response) {
          console.log(response);
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
}

main();
