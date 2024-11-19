const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Curriculo = sequelize.define('Curriculo', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  formacao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experiencia: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false,  
  tableName: 'curriculos',
});

module.exports = Curriculo;
