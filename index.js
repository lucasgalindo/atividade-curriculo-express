const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configuração do PostgreSQL usando o link no .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário para conexões seguras no Render
  }
});

// Rota para obter as informações do currículo
app.get('/resume', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM resume WHERE id = 1');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao obter currículo');
  }
});

// Rota para atualizar as informações do currículo
app.put('/resume', async (req, res) => {
  const { name, email, phone, address, competencies, education, experience } = req.body;
  
  // Verifica se todos os campos obrigatórios foram enviados
  if (!name || !email || !phone || !address || !competencies || !education || !experience) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  try {
    // Atualiza o currículo no banco de dados
    await pool.query(
      'UPDATE resume SET name=$1, email=$2, phone=$3, address=$4, competencies=$5, education=$6, experience=$7 WHERE id = 1',
      [name, email, phone, address, competencies, education, experience]
    );
    res.status(200).send('Currículo atualizado');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar currículo');
  }
});

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
