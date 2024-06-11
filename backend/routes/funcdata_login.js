const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.post('/', (req, res) => {
  try{
    const {loggedIndata} = req.body;
    const func_id = req.cookies.func;
    const func_id_data = JSON.parse(func_id);

    const checkQuery = 'SELECT * FROM Funcionario WHERE ID = ?';// seleciona os dados do funcionário com ID
    db.query(checkQuery, [func_id_data[0].ID], (err, results) => {

	    if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }

      if (results.length > 0) {
        //console.log(results);
        return res.status(200).json({ message: 'func encontrado.', user: results });
        }
      });
  }
  
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
});

module.exports = router;