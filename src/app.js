const express = require('express');
const app = express();
const sequelize = require('./config/database');

app.use(express.json());

app.use('/curriculo', require('./routes/curriculo'));

sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });
