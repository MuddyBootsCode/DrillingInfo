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
      // console.log(api);
      const response = await axios.get(`${process.env.DI_WELLS_URL}?state=TX$&apiNo=42475367700000&apiNo=42475348100000&apiNo=42389326900000&apiNo=42389328120000&apiNo=42389333020000&apiNo=42389336680000&apiNo=42389354110000&apiNo=42389353200000&apiNo=42389356340000&apiNo=42389356350000&apiNo=42389356360000&apiNo=42475376900000&apiNo=42475375510000&apiNo=42475322730000&apiNo=42475318920000&apiNo=42475354230000&apiNo=42475366510000&apiNo=42475357670000&apiNo=42475359650000&apiNo=42475363320000&apiNo=42475366780000&apiNo=42475318930000&apiNo=42475348420000&apiNo=42475353100000&apiNo=42475354770000&apiNo=42475357680000&apiNo=42475319770000&apiNo=42475347900000&apiNo=42475349340000&apiNo=42475352590000&apiNo=42475363300000&apiNo=42475363530000&apiNo=42475366500000&apiNo=42475359150000&apiNo=42475365500000&apiNo=42475368680000&pagesize=10000`, config);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  }
};



