// const dotEnvResult = require('dotenv').config();

// if (dotEnvResult.error) {
//   throw dotEnvResult.error;
// }

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  publicRuntimeConfig: {
    API_URL: prod ? 'http://jawak.us-east-2.elasticbeanstalk.com' : 'http://192.168.1.8:5001'
  }
};
