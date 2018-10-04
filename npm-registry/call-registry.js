const http = require('../api/http');

const REGISTRY_URL = 'https://registry.npmjs.org';

const cache = {};

module.exports = {
  execute: async name => {
    const cachedData = cache[name];
    if (!cachedData) {
      const response = await http.execute(`${REGISTRY_URL}/${name}`);
      cache[name] = JSON.parse(response);
    }
    return cache[name];
  },
}