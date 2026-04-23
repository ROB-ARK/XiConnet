const db = require('../models');
const Usuario = db.usuarios;

module.exports = {

    async login(req, res) {
        try {
            const { email, password } = req.body;

           
            const usuario = await Usuario.findOne({
                where: { email }
            });

            if (!usuario) {
                return res.status(404).send({
                    message: "Usuario no encontrado"
                });
            }

            
            if (usuario.password !== password) {
                return res.status(401).send({
                    message: "Contraseña incorrecta"
                });
            }

            
            return res.status(200).send({
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            });

        } catch (error) {
            return res.status(500).send(error);
        }
    }
};