const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function createEntry(db, entry, callback) {
    const collection = db.collection('entries');
    collection.insertOne(entry, 
        function(err, entryCreated) {
        assert.strictEqual(err, null);
        callback(entryCreated);
    });
};

function getEntries(db, query, callback) {
    const collection = db.collection('entries');
    if(query.active !== undefined) 
        query.active = (query.active == 'true');
    collection.find(query).toArray(function(err, entries) {
        assert.strictEqual(null, err);
        callback(entries);
    })
}

export default (req, res) => {
    switch (req.method) {
        // get all entries
        case 'GET': {
            console.log(req.query);
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);
                
                getEntries(db, req.query, function(entries) {
                    res.status(200).json(entries);
                });
            });
            break;
        }
        // create new entry
        case 'POST': {
            try {
                assert.notStrictEqual(null, req.body.title, 'Tytuł wymagany');
                assert.notStrictEqual(null, req.body.slug, 'Adres podstrony (slug) wymagany');
            } catch (bodyError) {
                res.status(403).send(bodyError.message);
            }
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);
                const entry = req.body;
                createEntry(db, entry, function(creationResult) {
                    if (creationResult.ops.length === 1) {
                        res.status(200).json({status: 'success'});
                        return;
                    }
                });
            })
            break;
        }
        default: {
        // Handle any other HTTP method
            res.status(200).json({message: 'Błąd'});
        }
    }
};