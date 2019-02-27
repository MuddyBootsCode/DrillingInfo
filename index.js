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

const  texasWellString = pipe(texasWells, replaceDashes, addZeros, stringify);

// const wellIds = db.get('wells').value();

// console.log(texasWellString(wellIds));


async function getinfo () {
  await token.getAccessToken();
  let wellIds = await db.get('wells').value();
  let wellString = await texasWellString(wellIds);
  await wells.wellInfo(wellString);
}
//
getinfo();


