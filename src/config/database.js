// Carregar as variáveis do arquivo .env
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Usar a URL de conexão diretamente do .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Necessário se o banco exigir SSL
    }
  }
});

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
  .catch(err => console.error('Erro ao conectar com o banco de dados:', err));

module.exports = sequelize;
