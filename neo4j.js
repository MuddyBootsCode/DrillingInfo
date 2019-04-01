// const neo4j = require('neo4j-driver').v1;
// require('dotenv').config();
// const flatten = require('flat');
// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
//
// const adapter = new FileSync('db.json');
// const db = low(adapter);
//
// db.defaults({ApiNumbers: []}).write();
//
// // const driver = neo4j.driver(process.env.NEO4J_URL_MPI, neo4j.auth.basic(process.env.NEO4J_USER_MPI, process.env.NEP4J_PASSWORD_MPI), {maxTransactionRetryTime: 5000});
// const driver = neo4j.driver(process.env.NEO4J_URL_LOCAL, neo4j.auth.basic(process.env.NEO4J_USER_LOCAL, process.env.NEP4J_PASSWORD_LOCAL), {maxTransactionRetryTime: 5000});
//
// const session = driver.session();
//
// // Run a Cypher statement, reading the result in a streaming manner as records arrive:
//
// const getWells = session.readTransaction(function(transaction){
//   return transaction.run('MATCH (w:Well) return w');
// });
//
//
//
// const addEID = session.writeTransaction ((transaction, id, eid) => {
//   return transaction.run('MATCH (w:Well {id: {idParam}}) set w.entityId = {eidParam} return w', {
//       idParam: id,
//       eidParam: eid
//     });
// });




// getWells.then(function (result){
//   session.close();
//   // console.log(result.records[0]._fields)
//   result.records.map((well) => {
//     wellId = well._fields[0].properties.id;
//     db.get('ApiNumbers').push(wellId).write()
//   });
//   process.exit();
// }).catch(error => console.log(error));

// module.exports = {
//   addWellInfo: async (records) => {
//     try {
//       for(let record in records) {
//         if (records[record].Status === 'ACTIVE'){
//           let wellId = records[record].ApiNo.replace(/(\d{2})(\d{3})/,"$1-$2-").slice(0,12);
//           let entityId = records[record].EntityId;
//
//           await addEID(wellId, entityId).then( result =>{
//             session.close();
//             console.log(result)
//           }).catch(error => console.log(error))
//         }
//       }
//
//     } catch(error) {
//       console.log(error);
//     }
//   }
// };
