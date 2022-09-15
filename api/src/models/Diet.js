const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('diet', {
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