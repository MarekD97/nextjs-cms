const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

const saltRounds = 10;
const url = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function findUser(db, username, callback) {
  const collection = db.collection('users');
  collection.findOne({username}, callback);
}

function createUser(db, username, password, callback) {
  const collection = db.collection('users');
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    collection.insertOne(
      {
        userId: v4(),
        username,
        password: hash,
      },
      function(err, userCreated) {
        assert.strictEqual(err, null);
        callback(userCreated);
      },
    );
  });
}

export default (req, res) => {
  if (req.method === 'POST') {
    // signup
    try {
      assert.notStrictEqual(null, req.body.username, 'Nazwa użytkownika wymagana');
      assert.notStrictEqual(null, req.body.password, 'Hasło wymagane');
    } catch (bodyError) {
      res.status(403).json({error: true, message: bodyError.message});
    }

    // verify username does not exist already
    client.connect(function(err) {
      assert.strictEqual(null, err);
      console.log('Connected to MongoDB server');
      const db = client.db(dbName);
      const username = req.body.username;
      const password = req.body.password;

      findUser(db, username, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Błąd podczas szukania użytkownika'});
          return;
        }
        if (!user) {
          // proceed to Create
          createUser(db, username, password, function(creationResult) {
            if (creationResult.ops.length === 1) {
              const user = creationResult.ops[0];
              const token = jwt.sign(
                {userId: user.userId, username: user.username},
                jwtSecret,
                {
                  expiresIn: 3600, // 1 hour
                },
              );
              res.status(200).json({token});
              return;
            }
          });
        } else {
          // User exists
          res.status(403).json({error: true, message: 'Nazwa zajęta przez innego użytkownika'});
          return;
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.status(200).json({message: 'Błąd'});
  }
};
