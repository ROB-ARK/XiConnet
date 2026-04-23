const db = require('../models');
const Usuario = db.usuarios;

module.exports = {

    // CREAR USUARIO
    async create(req, res) {
        try {
            const { nombre, email, password, rol } = req.body;

            //  Validación básica
            if (!nombre || !email || !password) {
                return res.status(400).json({
                    message: 'Faltan datos obligatorios'
                });
            }

            // Validar roles permitidos
            const rolesValidos = ['cliente', 'admin'];

            if (rol && !rolesValidos.includes(rol)) {
                return res.status(400).json({
                    message: 'Rol inválido'
                });
            }

            // Validar email duplicado
            const existe = await Usuario.findOne({ where: { email } });

            if (existe) {
                return res.status(400).json({
                    message: 'El email ya está registrado'
                });
            }

            // Crear usuario
            const usuario = await Usuario.create({
                nombre,
                email,
                password,
                rol: rol || 'cliente'
            });

            // No devolver password
            const usuarioSeguro = {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            };

            return res.status(201).json(usuarioSeguro);

        } catch (error) {
            console.error("ERROR CREATE:", error);
            return res.status(500).json({
                message: 'Error al crear usuario',
                error: error.message
            });
        }
    },

    // OBTENER TODOS
    async getAll(req, res) {
        try {
            const usuarios = await Usuario.findAll({
                attributes: ['id_usuario', 'nombre', 'email', 'rol'] // 🔐 sin password
            });

            return res.status(200).json(usuarios);

        } catch (error) {
            console.error("ERROR GETALL:", error);
            return res.status(500).json({
                message: 'Error al obtener usuarios'
            });
        }
    },

    //OBTENER UNO
    async findOne(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id, {
                attributes: ['id_usuario', 'nombre', 'email', 'rol']
            });

            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }

            return res.status(200).json(usuario);

        } catch (error) {
            console.error("ERROR FINDONE:", error);
            return res.status(500).json({
                message: 'Error al buscar usuario'
            });
        }
    },

    // ACTUALIZAR
    async update(req, res) {
        try {
            const { nombre, email, password, rol } = req.body;

            const usuario = await Usuario.findByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }

            // Validar rol si viene
            const rolesValidos = ['cliente', 'admin'];

            if (rol && !rolesValidos.includes(rol)) {
                return res.status(400).json({
                    message: 'Rol inválido'
                });
            }

            // Validar email duplicado (si cambia)
            if (email && email !== usuario.email) {
                const existe = await Usuario.findOne({ where: { email } });

                if (existe) {
                    return res.status(400).json({
                        message: 'El email ya está registrado'
                    });
                }
            }

            //  Actualizar solo lo que venga
            usuario.nombre = nombre || usuario.nombre;
            usuario.email = email || usuario.email;
            usuario.rol = rol || usuario.rol;

            // 👇 solo actualiza password si lo envían
            if (password) {
                usuario.password = password;
            }

            await usuario.save();

            return res.status(200).json({
                message: "Usuario actualizado"
            });

        } catch (error) {
            console.error("ERROR UPDATE:", error);
            return res.status(500).json({
                message: 'Error al actualizar usuario'
            });
        }
    },

    // ELIMINAR
    async delete(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }

            await usuario.destroy();

            return res.status(200).json({
                message: "Usuario eliminado"
            });

        } catch (error) {
            console.error("ERROR DELETE:", error);
            return res.status(500).json({
                message: 'Error al eliminar usuario'
            });
        }
    }
};