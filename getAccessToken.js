const axios = require('axios');
const base64 = require('base-64');
const utf8 = require('utf8');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
require('dotenv').config();


const adapter = new FileSync('db.json');
const db = low(adapter);


db.defaults({Token: ''}).write();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const apiKey = process.env.API_KEY;

const clientCreds = base64.encode(utf8.encode(`${clientId}:${clientSecret}`));

const config = {
  headers: {
    'Authorization': `Basic ${clientCreds}`,
    'Content-type': 'application/x-www-form-urlencoded',
    'X-API-KEY': `${apiKey}`,
  }
};

const data = 'grant_type=client_credentials';


module.exports = {
  getAccessToken: async () => {
    try {
      const response = await axios.post(process.env.DI_URL, data, config);
      let token = response.data.access_token;
      db.set('Token', token).write();
      return token;

    } catch (error) {
      console.log(error)
    }
  }
};



