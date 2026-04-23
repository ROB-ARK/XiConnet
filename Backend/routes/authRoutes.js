const authController = require('../controllers/controller_auth');

module.exports = (app) => {

    app.post('/api/auth/login', authController.login);

};