module.exports = (app) => {
  const controller = require('../controllers/controller_favorito');

  app.post('/api/favoritos', controller.create);
  app.get('/api/favoritos', controller.getAll);
  app.get('/api/favoritos/usuario/:id', controller.listByUser);
  app.delete('/api/favoritos/:id', controller.delete); 
};