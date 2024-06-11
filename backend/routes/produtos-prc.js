const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.post('/', (req, res) => {
  const ref = req.body.ID;
  
  try{
    const checkQuery = 'SELECT preco FROM Produtos WHERE Referencia = ?';//retira os dados do produto com a referência passada
    db.query(checkQuery, [ref], (err, results) => {
      if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }
      // console.log(results);
      return res.status(200).json({ prc: results});
    });
    
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
});

module.exports = router;