module.exports = (app) => {
  const controller = require('../controllers/controller_categoria');

  app.post('/api/categorias', controller.create);
  app.get('/api/categorias', controller.getAll);
  app.get('/api/categorias/:id', controller.findOne);
  app.put('/api/categorias/:id', controller.update);
  app.delete('/api/categorias/:id', controller.delete);
};