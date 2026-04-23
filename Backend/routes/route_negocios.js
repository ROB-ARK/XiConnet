module.exports = (app) => {
  const controller = require('../controllers/controller_negocio');

  app.post('/api/negocios', controller.create);
  app.get('/api/negocios', controller.getAll);
  app.get('/api/negocios/:id', controller.findOne);
  app.put('/api/negocios/:id', controller.update);
  app.delete('/api/negocios/:id', controller.delete);
};