
const { MongoClient, ServerApiVersion } = require('mongodb');
const { dbPassword } = require("../config.json");
const uri = `mongodb+srv://epichessStaff:${dbPassword}@cluster0.uxxppvw.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function insertNewUser(user) {
	try {
	  await dbClient.connect();
	  const leaderboard = dbClient.db("epichess").collection("leaderboard");
	  const player = await leaderboard.insertOne(user);
	} finally {
	  await dbClient.close();
	};
}
  
async function getUserInfo(userId) {
      try {
          await dbClient.connect();
          const leaderboard = dbClient.db("epichess").collection("leaderboard");
          const user = await leaderboard.findOne({id: userId}, {_id: 0});
          return user;
        } finally {
          await dbClient.close();
    };
}

module.exports = { insertNewUser, getUserInfo};
