const token = require('./getAccessToken');
const wells = require('./getWellInfo');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
require('dotenv').config();

const adapter = new FileSync('db.json');
const db = low(adapter);

const pipe = (...fncs) => x => fncs.reduce((y, f) => f(y), x);
const texasWells = ids => ids.filter(id => id.includes("42-"));
const replaceDashes = ids => ids.map(id => id.replace(/-/g, ""));
const addZeros = ids => ids.map( id => `${id}0000`);
const stringify = ids => ids.reduce((acc, val) => acc + `&apiNo=${val}`, "");
const texasWellArray = pipe(texasWells, replaceDashes, addZeros);
const texasWellString = pipe(texasWells, replaceDashes, addZeros, stringify);


const apiList = ["42475364660000",
  "42475365340000",
 ];

// const wellIds = db.get('wells').value();


token.getAccessToken();

// async function getinfo (api) {
//   await token.getAccessToken();
//   // let wellIds = await db.get('wells').value();
//   // let wellString = await texasWellString(wellIds);
//   await wells.wellInfo(api);
// }
//
//
// for (let id in apiList){
//   getinfo(apiList[id]);
// }


