const neo4j = require('neo4j-driver').v1;
require('dotenv').config();
const flatten = require('flat');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEP4J_PASSWORD), {maxTransactionRetryTime: 5000});

const session = driver.session();

// Run a Cypher statement, reading the result in a streaming manner as records arrive:

const wellIds = [];

const getWells = session.readTransaction(function(transaction){
  const result = transaction.run('MATCH (w:Well) return w');
  return result;
});

getWells.then(function (result){
  session.close();
  // console.log(result.records[0]._fields)
  result.records.map((well) => {
    wellId = well._fields[0].properties.id;
    db.get('wells').push(wellId).write()
  });
  process.exit();
}).catch(error => console.log(error));


