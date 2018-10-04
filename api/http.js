const https = require('https');

module.exports = {
  execute: (url) => {
    return new Promise((resolve, reject) => {
      const request = https.get(url);

      request.on('response', result => {
        let body = '';
        result.setEncoding('utf8');
        result.on('data', chunk => {
          body += chunk;
        });
        result.on('end', () => {
          if (result.statusCode === 200) {
            resolve(body);
          } else {
            reject(`HTTP error ${result.statusCode}: ${body}`);
          }
        });
      });

      request.on('error', error => {
        reject(error);
      });
    });
  },
};
