module.exports = (app) => {
  const controller = require('../controllers/controller_contacto');

  app.post('/api/contactos', controller.create);
  app.get('/api/contactos', controller.getAll);
  app.get('/api/contactos/:id', controller.findOne); 
  app.delete('/api/contactos/:id', controller.delete); 
}; 