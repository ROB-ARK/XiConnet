const db = require('../models');
const Reserva = db.reservas; 

module.exports = {

    async create(req, res) {
        try {
            const data = await Reserva.create(req.body);
            return res.status(201).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async getAll(req, res) {
        try {
            const data = await Reserva.findAll({
                include: ['usuario', 'negocio']
            });
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

   
    async findOne(req, res) {
        try {
            const data = await Reserva.findByPk(req.params.id, {
                include: ['usuario', 'negocio']
            });

            if (!data) {
                return res.status(404).send({ message: 'Reserva no encontrada' });
            }

            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async listByUser(req, res) {
        try {
            const data = await Reserva.findAll({
                where: { id_usuario: req.params.id },
                include: ['negocio']
            });

            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async updateEstado(req, res) {
        try {
            const [updated] = await Reserva.update(
                { estado: req.body.estado },
                { where: { id_reserva: req.params.id } }
            );

            if (!updated) {
                return res.status(404).send({ message: 'Reserva no encontrada' });
            }

            return res.status(200).send({ message: 'Estado actualizado' });
        } catch (error) {
            return res.status(400).send(error);
        }
    },


    async delete(req, res) {
        try {
            const deleted = await Reserva.destroy({
                where: { id_reserva: req.params.id }
            });

            if (!deleted) {
                return res.status(404).send({ message: 'Reserva no encontrada' });
            }

            return res.status(200).send({ message: 'Reserva eliminada' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};