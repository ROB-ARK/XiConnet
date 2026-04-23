const db = require('../models');
const Favorito = db.favoritos;
const Negocio = db.negocios;

module.exports = {

    //  CREAR FAVORITO
    async create(req, res) {
        try {
            const { id_usuario, id_negocio } = req.body;

            if (!id_usuario || !id_negocio) {
                return res.status(400).json({
                    message: "Datos incompletos"
                });
            }

            // 🔥 VALIDAR DUPLICADO
            const existe = await Favorito.findOne({
                where: { id_usuario, id_negocio }
            });

            if (existe) {
                return res.status(400).json({
                    message: "Ya está en favoritos"
                });
            }

            const data = await Favorito.create({
                id_usuario,
                id_negocio
            });

            return res.status(201).json(data);

        } catch (error) {
            console.error("ERROR REAL FAVORITO:", error);

            return res.status(500).json({
                message: "Error al guardar favorito",
                error: error.message,
                details: error
            });
        }
    },

    //  TODOS (admin)
    async getAll(req, res) {
        try {
            const data = await Favorito.findAll({
                include: {
                    model: Negocio,
                    as: 'negocio'
                }
            });

            return res.status(200).json(data);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al obtener favoritos"
            });
        }
    },

    //  POR USUARIO
    async listByUser(req, res) {
        try {
            const data = await Favorito.findAll({
                where: { id_usuario: req.params.id },
                include: {
                    model: Negocio,
                    as: 'negocio'
                }
            });

            return res.status(200).json(data);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al obtener favoritos"
            });
        }
    },

    //  ELIMINAR
    async delete(req, res) {
        try {
            const deleted = await Favorito.destroy({
                where: { id_favorito: req.params.id }
            });

            if (!deleted) {
                return res.status(404).json({
                    message: "Favorito no encontrado"
                });
            }

            return res.status(200).json({
                message: "Eliminado de favoritos"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error al eliminar"
            });
        }
    }
};