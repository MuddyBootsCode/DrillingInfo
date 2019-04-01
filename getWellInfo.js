const  axios = require ('axios');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
require('dotenv').config();
const wellPrinter = require('./neo4j');


const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({Records: []}).write();

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
      // console.log(api);
      const response = await axios.get(`${process.env.DI_WELLS_URL}?state=TX&apiNo=${api}&pagesize=10000`, config);
      // console.log(response.data);
      // db.get('Records').push(response.data).write()
      wellPrinter.addWellInfo(response.data)
    } catch (error) {
      console.log(error.status, error.message)
    }
  }
};



