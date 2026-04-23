module.exports = (app) => {
  const controller = require('../controllers/controller_reserva');

  app.post('/api/reservas', controller.create);
  app.get('/api/reservas', controller.getAll); // 🔥 nuevo
  app.get('/api/reservas/:id', controller.findOne); // 🔥 nuevo
  app.get('/api/reservas/usuario/:id', controller.listByUser);
  app.put('/api/reservas/:id', controller.updateEstado);
  app.delete('/api/reservas/:id', controller.delete); // 🔥 nuevo
};