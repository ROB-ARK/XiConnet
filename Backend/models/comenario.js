module.exports = (sequelize, DataTypes) => {

  const Comentario = sequelize.define("comentarios", {
    id_comentario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    texto: DataTypes.TEXT,
    estrellas: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER,
    id_negocio: DataTypes.INTEGER
  }, {
    timestamps: false
  });

  return Comentario;
};