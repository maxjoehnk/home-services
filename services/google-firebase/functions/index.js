const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.post = functions.https.onRequest((req, res) => {
    const associations = req.body.associations;
    Object.getOwnPropertyNames(associations).
        forEach(name => {
            associations[name] = {
                notify: true,
                value: associations[name]
            };
        });
    admin.database()
        .ref('/associations')
        .update(associations)
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
