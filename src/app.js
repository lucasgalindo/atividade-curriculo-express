const express = require('express');
const app = express();
const sequelize = require('./config/database'); // Aqui você importa a configuração de banco de dados

// Middleware para entender o corpo da requisição como JSON
app.use(express.json());

// Defina suas rotas, por exemplo, de currículo
app.use('/curriculo', require('./routes/curriculo'));

// Testar se a conexão com o banco de dados está funcionando corretamente
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
