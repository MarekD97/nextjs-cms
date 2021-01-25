import { ObjectId } from 'mongodb';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

function getComment(db, id, callback) {
    const collection = db.collection('comments');
    collection.aggregate([
        {$match: {_id: ObjectId(id)}},
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
        assert.strictEqual(err, null);
        callback(result[0]);
    })
    
}

function updateComment(db, id, params, callback) {
    const collection = db.collection('comments');
    collection.updateOne({ _id: ObjectId(id)}, { $set: params}, { upsert: true}, callback);
}

function deleteComment(db, id, callback) {
    const collection = db.collection('comments');
    collection.deleteOne({ _id: ObjectId(id)}, callback);
}

export default (req, res) => {
    switch (req.method) {
        case 'GET': {
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);
                console.log(req.query);
                getComment(db, req.query.id, function(result) {
                    res.status(200).json(result);
                })
            })
            break;
        }
        case 'PATCH': {
            client.connect(function(err) {
                assert.strictEqual(null, err);
                console.log('Connected to MongoDB server');
                const db = client.db(dbName);

                updateComment(db, req.query.id, req.body, function(err, result) {
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

                deleteComment(db, req.query.id, function(err, result) {
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
            res.status(200).json({message: 'Błąd'});
        }
    }
}