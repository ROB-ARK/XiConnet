const db = require('../models');
const Contacto = db.contactos;

module.exports = {

    async create(req, res) {
        try {
            const data = await Contacto.create(req.body);
            return res.status(201).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async getAll(req, res) {
        try {
            const data = await Contacto.findAll();
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async findOne(req, res) {
        try {
            const data = await Contacto.findByPk(req.params.id);

            if (!data) {
                return res.status(404).send({ message: 'Contacto no encontrado' });
            }

            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async delete(req, res) {
        try {
            const deleted = await Contacto.destroy({
                where: { id_contacto: req.params.id }
            });

            if (!deleted) {
                return res.status(404).send({ message: 'Contacto no encontrado' });
            }

            return res.status(200).send({ message: 'Eliminado' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};