const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/', (req, res) => {
  try{
    const userId = req.cookies.user_id;
    const {Nome, email, morada, nipc } = req.body;
    // Processar os dados recebidos
    
    const checkQuery = 'UPDATE Cliente SET nome_empresa = ?, Email = ?, nipc = ?, Morada = ? WHERE ID = ?';//UPDATE DADOS CLIENTES RECEBIDOS
    db.query(checkQuery, [Nome, email, nipc, morada, userId], (err, results) => {
      if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }
    });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
});

module.exports = router;