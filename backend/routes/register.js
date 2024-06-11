const express = require('express');
const db = require('../db');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async (req, res) => {
  try{
    const { email, password, confirm_password, empresa, nipc, morada } = req.body;
    // Processar os dados recebidos
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const checkQuery = 'SELECT * FROM Cliente WHERE email = ? OR nipc = ?';//Verifica se já existe algum registo com esse email ou nipc
    db.query(checkQuery, [email, nipc], (err, results) => {

	    if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }

      if (results.length > 0) {
        // email já existe
        return res.status(409).json({ error: 'email ou nipc já estão em uso.' });
      }

      const insertQuery = 'INSERT INTO Cliente (email, password, salt, nome_empresa, nipc, morada) VALUES (?, ?, ?, ?, ?, ?)';//Se não existir insere os dados
      db.query(insertQuery, [email, hash, salt, empresa, nipc, morada], (err, result) => {
        if (err) {
          console.error('Erro ao inserir dados na base de dados:', err);
          return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
      res.status(200).json({ message: 'Regitro concluído com sucesso!' });
      });
    });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }

});



router.post('/func', async (req, res) => {
  try{
    const {nome, email, password, confirm_password, cargo } = req.body;
    // Processar os dados recebidos
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const checkQuery = 'SELECT * FROM Funcionario WHERE email = ?';//Se funcionários email
    
    db.query(checkQuery, [email], (err, results) => {
  
    if (err) {
      console.error('Erro ao verificar a base de dados:', err);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  
    if (results.length > 0) {
      // email já existe
      return res.status(409).json({ error: 'email já está em uso.' });
    }
  
      const insertQuery = 'INSERT INTO Funcionario (nome, email, password, salt, cargo) VALUES (?, ?, ?, ?, ?)';//insere os dados de registo caso estes já nao existam
      db.query(insertQuery, [nome, email, hash, salt, cargo], (err, result) => {
        if (err) {
          console.error('Erro ao inserir dados na base de dados:', err);
          return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
      
        res.status(200).json({ message: 'Registo concluído com sucesso!' });
      });
    });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
  
});

module.exports = router;