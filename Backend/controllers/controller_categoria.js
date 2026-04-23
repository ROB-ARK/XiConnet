const db = require('../models');
const Categoria = db.categorias; 

module.exports = {

    async create(req, res) {
        try {
            const data = await Categoria.create(req.body);
            return res.status(201).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async getAll(req, res) {
        try {
            const data = await Categoria.findAll();
            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async findOne(req, res) {
        try {
            const data = await Categoria.findByPk(req.params.id);

            if (!data) {
                return res.status(404).send({ message: 'Categoría no encontrada' });
            }

            return res.status(200).send(data);
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async update(req, res) {
        try {
            const [updated] = await Categoria.update(req.body, {
                where: { id_categoria: req.params.id }
            });

            if (!updated) {
                return res.status(404).send({ message: 'Categoría no encontrada' });
            }

            return res.status(200).send({ message: 'Actualizada' });
        } catch (error) {
            return res.status(400).send(error);
        }
    },

    async delete(req, res) {
        try {
            const deleted = await Categoria.destroy({
                where: { id_categoria: req.params.id }
            });

            if (!deleted) {
                return res.status(404).send({ message: 'Categoría no encontrada' });
            }

            return res.status(200).send({ message: 'Eliminada' });
        } catch (error) {
            return res.status(400).send(error);
        }
    }
};