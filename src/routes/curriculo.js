const express = require('express');
const router = express.Router();
const Curriculo = require('../models/Curriculo');


router.post('/', async (req, res) => {
  const { nome, email, telefone, endereco, formacao, experiencia } = req.body;

  try {
    
    const novoCurriculo = await Curriculo.create({
      nome,
      email,
      telefone,
      endereco,
      formacao,
      experiencia
    });

    res.status(201).json({ message: 'Currículo criado com sucesso!', curriculo: novoCurriculo });
  } catch (err) {
    console.error('Erro ao criar currículo:', err);
    res.status(500).json({ error: 'Erro ao criar currículo', details: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const curriculo = await Curriculo.findByPk(req.params.id);
    if (!curriculo) {
      return res.status(404).json({ error: 'Currículo não encontrado' });
    }
    res.status(200).json(curriculo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter currículo', details: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const { nome, email, telefone, endereco, formacao, experiencia } = req.body;
  try {
    const curriculoAtualizado = await Curriculo.findByPk(req.params.id);
    if (!curriculoAtualizado) {
      return res.status(404).json({ error: 'Currículo não encontrado' });
    }

   
    curriculoAtualizado.nome = nome;
    curriculoAtualizado.email = email;
    curriculoAtualizado.telefone = telefone;
    curriculoAtualizado.endereco = endereco;
    curriculoAtualizado.formacao = formacao;
    curriculoAtualizado.experiencia = experiencia;
    await curriculoAtualizado.save();

    res.status(200).json({ message: 'Currículo atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar currículo', details: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const curriculoDeletado = await Curriculo.destroy({
      where: { id: req.params.id }
    });
    if (!curriculoDeletado) {
      return res.status(404).json({ error: 'Currículo não encontrado' });
    }
    res.status(200).json({ message: 'Currículo deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir currículo', details: err.message });
  }
});

module.exports = router;
