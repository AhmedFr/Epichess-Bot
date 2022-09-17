
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

async function updateUsername(userId, platform, username) {
  try {
      await dbClient.connect();

      const leaderboard = dbClient.db("epichess").collection("leaderboard");
      const user = await leaderboard.findOne({id: userId}, {_id: 0});
      let userInfo = {
        id: userId,
        elo: 1000,
        chesscom: "undefined",
        lichess: "undefined"
      };

      if (!user) {
        if (platform === "chesscom") {
          userInfo.chesscom = username;
        } else {
          userInfo.lichess = username;
        }
        await leaderboard.insertOne(userInfo);
        return ("Created user information.");
      } else {
        await leaderboard.updateOne({id: userId}, {$set: {[platform]: username}});
        return ("updated user information.");
      }
    } finally {
      await dbClient.close();
};
}

module.exports = { insertNewUser, getUserInfo, updateUsername};
