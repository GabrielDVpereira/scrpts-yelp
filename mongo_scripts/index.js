const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

let db;

const initDatabase = async (dataBaseName) => {
    await client.connect();
    db = client.db(dataBaseName);
    console.log('Connected successfully to server');
}

const treatCollection = async (collection, findOpt, collection_amount = 200000) => {
  const options = { ordered: true };

  let collection_count = -1; 
  let docs_count =  await db.collection(collection).countDocuments(); 
  let i = 0;
  console.log("🚀 ~ file: index.js ~ line 56 ~ treatUserDb ~ docs_count", docs_count)
  
  while(docs_count){
    if(i % collection_amount === 0) collection_count++;
    const reviews = await db.collection(collection).find({}, findOpt).limit(500).skip(i).toArray();
    console.log(`🚀 ~ file: index.js ~ line 45 ~ treatDb ~ ${collection}`, reviews.length)
    await db.collection(`${collection}_${collection_count}`).insertMany(reviews, options);
    console.log("inserted!", i ,collection_count)
    i+=500;
    docs_count-=500;
  }
} 

module.exports = { initDatabase, treatCollection }
