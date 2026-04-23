const db = require('../models');
const Comentario = db.comentarios;

module.exports = {

  async create(req, res) {
    try {
      const { texto, estrellas, id_usuario, id_negocio } = req.body;

      if (!texto || !estrellas || !id_usuario || !id_negocio) {
        return res.status(400).json({ message: "Datos incompletos" });
      }

      const data = await Comentario.create({
        texto,
        estrellas,
        id_usuario,
        id_negocio
      });

      return res.status(201).json(data);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al crear comentario" });
    }
  },

  async getByNegocio(req, res) {
    try {
      const data = await Comentario.findAll({
        where: { id_negocio: req.params.id },
        order: [['id_comentario', 'DESC']]
      });

      return res.json(data);

    } catch (error) {
      return res.status(500).json({ message: "Error al obtener comentarios" });
    }
  }

};