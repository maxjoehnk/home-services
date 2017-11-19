const { database } = require('firebase-admin');

module.exports = (server, { associations }) => {
    const db = database();

    const getAssociation = (req, res, next) => {
        const association = associations.find(({ name }) =>
            name === req.params.assoc);
        if (!association) {
            return next(new Error('Unknown Association'));
        }
        req.association = association;
        next();
    };

    server.post('/associations/:assoc', getAssociation, (req, res, next) => {
        db.ref(`/associations/${req.params.assoc}`)
            .set({
                notify: false,
                value: req.body
            })
            .then(() => {
                res.status(204);
                res.end();
            })
            .catch(err => next(err));
    });
};
