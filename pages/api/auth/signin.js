const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
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

function authUser(db, username, password, hash, callback) {
  const collection = db.collection('users');
  collection.updateOne({username}, { $set: {lastLogin: new Date()}});
  bcrypt.compare(password, hash, callback);
}

export default (req, res) => {
  if (req.method === 'POST') {
    //login
    try {
      assert.notStrictEqual(null, req.body.username, 'Nazwa użytkownika wymagana');
      assert.notStrictEqual(null, req.body.password, 'Hasło wymagane');
    } catch (bodyError) {
      res.status(403).send(bodyError.message);
    }

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
          res.status(404).json({error: true, message: 'Nie znaleziono użytkownika'});
          return;
        } else {
          authUser(db, username, password, user.password, function(err, match) {
            if (err) {
              res.status(500).json({error: true, message: 'Logowanie nie powiodło się'});
            }
            if (match) {
              const token = jwt.sign(
                {
                  userId: user.userId, 
                  username: user.username,
                  email: user.email,
                  role: user.role,
                  createdAt: user.createdAt,
                  lastLogin: user.lastLogin,
                },
                jwtSecret,
                {
                  expiresIn: 7200, // 2 hours
                },
              );
              res.status(200).json({token});
              return;
            } else {
              res.status(401).json({error: true, message: 'Logowanie nie powiodło się'});
              return;
            }
          });
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
};
