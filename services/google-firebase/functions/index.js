const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.post = functions.https.onRequest((req, res) => {
    admin.database()
        .ref('/associations')
        .update(req.body.associations)
        .then(() => {
            res.status(204);
            res.end();
        })
        .catch(err => {
            res.json(err);
            res.status(500);
            res.end();
        });
});