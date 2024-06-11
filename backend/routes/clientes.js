const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  const checkQuery = 'SELECT * FROM Cliente '; //Consulta a base de dados e retira todos os dados de Cliente
  db.query(checkQuery, (err, results) => {

    if (err) {
      console.error('Erro ao verificar a base de dados:', err);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
   // console.log(results);
  return res.status(200).json({cli: results});
  });
});

router.post('/', (req, res) => {

  try{
        
    const {Nome, email, nipc, morada, ID } = req.body; 
    const checkQuery = 'UPDATE Cliente SET Email = ?, nome_empresa = ?, nipc = ?, Morada = ?  WHERE ID = ?';//Atualiza os dados dos clientes
    db.query(checkQuery, [email, Nome, nipc, morada, ID], (err, results) => {
    
      if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }
      return res.json({ message: 'Atualizado com sucesso!' });
    
    });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
    
});

module.exports = router;