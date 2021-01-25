const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function getUsers(db, query, callback) {
    const collection = db.collection('users');
    collection.find(query).toArray(function(err, users) {
        assert.strictEqual(null, err);
        callback(users);
    })
}

export default (req, res) => {
    switch (req.method) {
        // get all entries
        case 'GET': {
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);
                
                getUsers(db, req.query, function(users) {
                    res.status(200).json(users);
                });
            });
            break;
        }
        default: {
        // Handle any other HTTP method
            res.status(200).json({message: 'Błąd'});
        }
    }
};