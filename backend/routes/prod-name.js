const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.get('/:id', (req, res) => {

  const ref_p_Id = parseInt(req.params.id);
  const checkQuery = 'SELECT Nome FROM Produtos WHERE Referencia = ?';//retira o nome do produto com a referência passada
  db.query(checkQuery, [ref_p_Id], (err, results) => {
    if (err) {
      console.error('Erro ao verificar a base de dados:', err);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
    // console.log(results);
    return res.status(200).json({ prod: results });
  });
});

module.exports = router;