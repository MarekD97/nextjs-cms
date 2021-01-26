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

function findEntry(db, slug, callback) {
    const collection = db.collection('entries');
    collection.findOne({slug}, callback);
}

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
            } catch (err) {
                res.status(403).send(err.message);
            }
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);
                const entry = req.body;

                findEntry(db, entry.slug, function(err, foundEntry) {
                    if (err) {
                        res.status(500).json({error: true, message: 'Błąd podczas szukania wpisu'});
                        return;
                    }
                    if (!foundEntry) {
                        createEntry(db, entry, function(creationResult) {
                            if (creationResult.ops.length === 1) {
                                res.status(200).json({status: 'success'});
                                return;
                            }
                        });
                    } else {
                    // User exists
                    res.status(403).json({error: true, message: 'Istnieje już wpis pod tym samym adresem, zmień slug.'});
                    return;
                  }
                })
                
            })
            break;
        }
        default: {
        // Handle any other HTTP method
            res.status(200).json({message: 'Błąd'});
        }
    }
};

export async function getEntriesPaths() {
    let db = (await client.connect()).db(dbName);

    try {
        const res = await db.collection('entries').find().toArray();
        return res;
    } catch(err){

    }
    
}

export async function getEntriesStatic(slug) {
    let db = (await client.connect()).db(dbName);

    try {
        const res = await db.collection('entries').findOne({'slug': slug});
        res._id = `${res._id}`;
        return res;
    } catch(err){
    }
    
}