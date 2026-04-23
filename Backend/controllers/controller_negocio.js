const db = require('../models');
const Negocio = db.negocios;
const Categoria = db.categorias;

module.exports = {

    
    async create(req, res) {
        try {

            const {
                nombre,
                descripcion,
                imagen,
                direccion,
                telefono,
                id_categoria,
                lat,
                lng
            } = req.body;

            const data = await Negocio.create({
                nombre,
                descripcion,
                imagen,
                direccion,
                telefono,
                id_categoria,
                lat,
                lng
            });

            return res.status(201).send(data);

        } catch (error) {
            console.error(error);
            return res.status(400).send({ msg: "Error al crear negocio" });
        }
    },

    
    async getAll(req, res) {
        try {

            const data = await Negocio.findAll({
                include: {
                    model: Categoria,
                    as: 'categoria'
                }
            });

            return res.status(200).send(data);

        } catch (error) {
            console.error(error);
            return res.status(400).send({ msg: "Error al obtener negocios" });
        }
    },

   
    async findOne(req, res) {
        try {

            const data = await Negocio.findByPk(req.params.id, {
                include: {
                    model: Categoria,
                    as: 'categoria'
                }
            });

            if (!data) {
                return res.status(404).send({ message: 'Negocio no encontrado' });
            }

            return res.status(200).send(data);

        } catch (error) {
            console.error(error);
            return res.status(400).send({ msg: "Error al buscar negocio" });
        }
    },

   
    async update(req, res) {
        try {

            const {
                nombre,
                descripcion,
                imagen,
                direccion,
                telefono,
                id_categoria,
                lat,
                lng
            } = req.body;

            const [updated] = await Negocio.update(
                {
                    nombre,
                    descripcion,
                    imagen,
                    direccion,
                    telefono,
                    id_categoria,
                    lat,
                    lng
                },
                {
                    where: { id_negocio: req.params.id }
                }
            );

            if (!updated) {
                return res.status(404).send({ message: 'Negocio no encontrado' });
            }

            return res.status(200).send({ message: 'Actualizado' });

        } catch (error) {
            console.error(error);
            return res.status(400).send({ msg: "Error al actualizar" });
        }
    },

    
    async delete(req, res) {
        try {

            const deleted = await Negocio.destroy({
                where: { id_negocio: req.params.id }
            });

            if (!deleted) {
                return res.status(404).send({ message: 'Negocio no encontrado' });
            }

            return res.status(200).send({ message: 'Eliminado' });

        } catch (error) {
            console.error(error);
            return res.status(400).send({ msg: "Error al eliminar" });
        }
    }
};