const token = require('./getAccessToken');
const wells = require('./getWellInfo');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
require('dotenv').config();

const adapter = new FileSync('db.json');
const db = low(adapter);

token.getAccessToken();

let wellIds = db.get('wells').value();
//
// wellIds.map((id) => wells.wellInfo(id));
//
// const pipe = (...fncs) => x => fncs.reduce((y, f) => f(y), x);
//
// const replaceDashes = s => s.replace(/-/g, "");
// const addZeros = s => `${s}0000`;
//
// const idFixer = pipe(replaceDashes, addZeros);
//
//
// async function getinfo(wellIds) {
//   const accessToken = await token.getAccessToken();
//   await wellIds.map((id) => wells.wellInfo(idFixer(id)));
// }
//
// getinfo(wellIds);


