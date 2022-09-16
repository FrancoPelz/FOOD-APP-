const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(input){
        this.setDataValue('name', input.toLowerCase());
      },
      get(){
        let input = this.getDataValue('name');
        let output = input[0].toUpperCase()+input.slice(1);
        return output;
      }
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.DECIMAL,
      defaultValue: null,
      defaultValue: 0
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://previews.123rf.com/images/vextok/vextok1608/vextok160800134/61570324-men%C3%BA-de-comida-r%C3%A1pida-conjunto-de-vectores-de-fondo-de-dibujos-animados-patatas-fritas-hamburguesas-.jpg"
    },
    steps: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: false
    },
  },{
    timestamps : false
  });
};
