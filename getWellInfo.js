const  axios = require ('axios');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
require('dotenv').config();


const adapter = new FileSync('db.json');
const db = low(adapter);

const apiKey = process.env.API_KEY;
const accessToken = db.get('Token').value();

db.defaults({wells:[]}).write();

const config = {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'X-API-KEY': `${apiKey}`,
  }
};

module.exports = {
  wellInfo: async (api) => {
    try {
      console.log(api);
      const response = await axios.get(`${process.env.DI_WELLS_URL}?state=TX&apiNo=${api}&action=next&next_page=rigid&pagesize=10000`, config);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }
};



