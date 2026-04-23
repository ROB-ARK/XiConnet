module.exports = (app) => {
  const controller = require('../controllers/controller_usuario');

  app.post('/api/usuarios', controller.create);
  app.get('/api/usuarios', controller.getAll);
  app.get('/api/usuarios/:id', controller.findOne);
  app.put('/api/usuarios/:id', controller.update);
  app.delete('/api/usuarios/:id', controller.delete);
};