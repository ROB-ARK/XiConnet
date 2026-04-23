module.exports = (app) => {
  const controller = require('../controllers/controller_comentario');

  app.post('/api/comentarios', controller.create);
  app.get('/api/comentarios/negocio/:id', controller.getByNegocio);
};