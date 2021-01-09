const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');

const url = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function getEntry(db, slug, callback) {
    const collection = db.collection('entries');
    collection.findOne({"slug": slug}, callback);
}

function updateEntry(db, id, params, callback) {
    const collection = db.collection('entries');
    collection.updateOne({ _id: new ObjectId(id)}, { $set: params}, { upsert: true}, callback);
}

function deleteEntry(db, id, callback) {
    const collection = db.collection('entries');
    collection.deleteOne({ _id: new ObjectId(id)}, callback);
}

export default (req, res) => {
    switch (req.method) {
        // get entry
        case 'GET': {
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);
                console.log(req.query.id);
                getEntry(db, req.query.id, function(err, entry) {
                    if (err) {
                        res.status(200).json({message: 'Błąd'});
                        return;
                    }
                    console.log(entry);
                    res.status(200).json(entry);
                });
            });
            break;
        }
        // update data
        case 'PATCH': {
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);

                updateEntry(db, req.query.id, req.body, function(err, result) {
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

                deleteEntry(db, req.query.id, function(err, result) {
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
}

