const stepController = require('./step');
const userController = require('./user');;

function route(app) {
    app.use('/user', userController);
    app.use('/step', stepController);
}

module.exports = route;
