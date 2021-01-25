import { ObjectId } from 'mongodb';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

function getComments(db, query, callback) {
    const collection = db.collection('comments');
    if (query.entryId) {
        const entryId = query.entryId;
        collection.aggregate([
            {$match: {entryId}},
            {$lookup: {
                from: "users", 
                localField: "userId", 
                foreignField: "userId", 
                as: "author"
            }},
            {
                $unwind: "$author"
            },
            {
                $project: {
                    _id: 1,
                    "author.userId": 1,
                    "author.username": 1,
                    entryId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    text: 1
                    
                }
            }
        ]).toArray(function(err, result) {
            assert.strictEqual(null, err);
            callback(result);
        })
    } else {
        collection.aggregate([
            {$lookup: {
                from: "users", 
                localField: "userId", 
                foreignField: "userId", 
                as: "author"
            }},
            {
                $unwind: "$author"
            },
            {
                $project: {
                    _id: 1,
                    "author.userId": 1,
                    "author.username": 1,
                    entryId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    text: 1
                    
                }
            }
        ]).toArray(function(err, result) {
            assert.strictEqual(null, err);
            callback(result);
        })
    }
}


function createComment(db, comment, callback) {
    const collection = db.collection('comments');
    collection.insertOne(comment, 
        function(err, result) {
        assert.strictEqual(err, null);
        callback(result);
    });
}

export default (req, res) => {
    switch (req.method) {
        case 'GET': {
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);
                getComments(db, req.query, function(result) {
                    res.status(200).json(result);
                });
            })
            break;
        }
        case 'POST': {
            try {
                assert.notStrictEqual(null, req.body.userId, 'Użytkownik nieautoryzowany');
                assert.notStrictEqual(null, req.body.text, 'Brak treści komentarza');
            } catch (bodyError) {
                res.status(403).send(bodyError.message);
            }
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);
                const comment = req.body;

                createComment(db, comment, function(result) {
                    if (result.ops.length === 1) {
                        res.status(200).json({status: 'success'});
                        return;
                    }
                })
            })
            break;
        }
        default: {
            res.status(200).json({message: 'Błąd'});
        }
    }
}