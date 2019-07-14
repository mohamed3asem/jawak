const dotEnvResult = require('dotenv').config();

const prod = process.env.NODE_ENV === 'production';

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  },
  target: 'serverless',
  env: {
    API_URL: prod ? process.env.API_URL_PROD : process.env.API_URL_DEV
  }
};
