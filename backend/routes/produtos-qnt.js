const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.post('/', (req, res) => {

  const qnt = req.body.qnt;
  const prod = req.body.prod;
  try{
      
    const checkQuery = 'UPDATE Produtos SET Quantidade =? WHERE Referencia = ?';//Atualiza a quantidade para o produto passado na tabela produtos
    db.query(checkQuery, [qnt,prod], (err, results) => {
      
          if (err) {
                  console.error('Erro ao verificar a base de dados:', err);
                  return res.status(500).json({ error: 'Erro interno no servidor.' });
              }
      
             
               return res.status(200).json({ res: "OK" });
      
    });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
});

module.exports = router;