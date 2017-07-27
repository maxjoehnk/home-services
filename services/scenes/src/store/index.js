const { createStore, applyMiddleware } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');
const { composeWithDevTools } = require('remote-redux-devtools');
const reducers = require('./reducers');
const effects = require('./effects');

const composeEnhancers = composeWithDevTools({
    port: 8000,
    realtime: true
});

const saga = createSagaMiddleware();

const store = createStore(reducers,
    composeEnhancers(
        applyMiddleware(saga)
    )
);

effects.forEach(effect => saga.run(effect));

module.exports = store;
