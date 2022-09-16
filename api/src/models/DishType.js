const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('dishType', {
      name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull : false,
      set(input){
        this.setDataValue('name', input.toLowerCase());
      },
    },
  },{
    timestamps : false
  });
};