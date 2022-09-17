const { MongoClient, ServerApiVersion } = require("mongodb");
const { dbPassword } = require("../config.json");
const uri = `mongodb+srv://epichessStaff:${dbPassword}@cluster0.uxxppvw.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function insertNewUser(user) {
  try {
    await dbClient.connect();
    const leaderboard = dbClient.db("epichess").collection("leaderboard");
    const player = await leaderboard.insertOne(user);
  } finally {
    await dbClient.close();
  }
}

async function getUserInfo(userId) {
  try {
    await dbClient.connect();
    const leaderboard = dbClient.db("epichess").collection("leaderboard");
    const user = await leaderboard.findOne({ id: userId }, { _id: 0 });
    return user;
  } finally {
    await dbClient.close();
  }
}

async function createUser(userId) {
  try {
    await dbClient.connect();
    const leaderboard = dbClient.db("epichess").collection("leaderboard");
    const user = leaderboard.findOne({id: userId});

    if (user) {
      return "User already exists";
    }
    let userInfo = {
      id: userId,
      elo: 1000,
      chesscom: "undefined",
      lichess: "undefined",
      opponentId: "0",
    };
    await leaderboard.insertOne(userInfo);
  } finally {
    await dbClient.close();
  }
}

async function updateUsername(userId, platform, username) {
  try {
    await dbClient.connect();

    const leaderboard = dbClient.db("epichess").collection("leaderboard");
    const user = await leaderboard.findOne({ id: userId }, { _id: 0 });
    let userInfo = {
      id: userId,
      elo: 1000,
      chesscom: "undefined",
      lichess: "undefined",
    };

    if (!user) {
      if (platform === "chesscom") {
        userInfo.chesscom = username;
      } else {
        userInfo.lichess = username;
      }
      await leaderboard.insertOne(userInfo);
      return "Created user information.";
    } else {
      await leaderboard.updateOne(
        { id: userId },
        { $set: { [platform]: username } }
      );
      return "updated user information.";
    }
  } finally {
    await dbClient.close();
  }
}

async function resetOpponentId(userId) {
  try {
    await dbClient.connect();

    const leaderboard = dbClient.db("epichess").collection("leaderboard");
    const user = await leaderboard.findOne({ id: userId }, { _id: 0 });

    if (!user) {
      await createUser(userId);
    } else {
      user.opponentId = "0";
    }
    return "OpponentId reset.";
  } finally {
    await dbClient.close();
  }
}

async function acceptChallenge(userId, opponentId) {
  try {
    await dbClient.connect();

    const leaderboard = dbClient.db("epichess").collection("leaderboard");
    const opponent = await leaderboard.findOne({ id: opponentId }, { _id: 0 });
    const user = await leaderboard.findOne({ id: userId }, { _id: 0 });

    if (!opponent) {
      await createUser(opponentId);
    }
    if (!user) {
      await createUser(userId);
    }
    if (opponent.opponentId != "0" && opponent) {
      return "User already started another game.";
    } else {
      await leaderboard.updateOne(
        { id: opponentId },
        { $set: { opponentId: userId } }
      );
    }
    return "Accepted challenge.";
  } finally {
    await dbClient.close();
  }
}


async function result(userId, score) {
  try {
    await dbClient.connect();

    const leaderboard = dbClient.db("epichess").collection("leaderboard");
    const user = await leaderboard.findOne({ id: userId }, { _id: 0 });
    const opponent = await leaderboard.findOne({ id: user.opponentId }, { _id: 0 });

    if (!opponent) {
      return ("You have not started a game or your opponent did not accept.");
    }
    const ea = 1 / (1 + 10**((opponent.elo - user.elo) / 400));
    const newUserRanking = user.elo + 32 * (score - ea);

    const eb = 1 / (1 + 10**((user.elo - opponent.elo) / 400));
    const newOpponentRanking = opponent.elo + 32 * (score - eb);

    await leaderboard.updateOne(
      { id: userId },
      { $set: { elo: newUserRanking } }
    );

    await leaderboard.updateOne(
      { id: opponent.id },
      { $set: { elo: newOpponentRanking } }
    );

    resetOpponentId(userId);

    return "Elo updated";
  } finally {
    await dbClient.close();
  }
}

module.exports = { insertNewUser, getUserInfo, updateUsername, acceptChallenge, result };
