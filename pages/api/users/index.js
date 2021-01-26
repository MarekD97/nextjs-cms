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

function updateUser(db, params, callback) {
    const collection = db.collection('users');
    collection.updateOne({userId: params.userId}, { $set: {role: params.role}}, { upsert: true}, callback);
}

function deleteUser(db, query, callback) {
    const collection = db.collection('users');
    collection.deleteOne({ userId: query.userId}, callback);
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
        case 'PATCH': {
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);

                updateUser(db, req.body, function(err, result) {
                    if (err) {
                        res.status(200).json({message: 'Błąd'});
                        return;
                    }
                    res.status(200).json(result);
                });
            });
            break;
        }
        case 'DELETE': {
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);

                deleteUser(db, req.query, function(err, result) {
                    if (err) {
                        res.status(200).json({message: 'Błąd'});
                        return;
                    }
                    res.status(200).json({message: 'Usunięto'});
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