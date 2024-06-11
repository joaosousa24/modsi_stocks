const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.post('/', (req, res) => {
  try{
    const {loggedIndata} = req.body;
    // Processar os dados recebidos
    const userId = req.cookies.user_id;
    //console.log(userId);
    const checkQuery = 'SELECT * FROM Cliente WHERE ID = ?';//pede ao servidor os dados do cliente que se encontra com o login feito
    db.query(checkQuery, [userId], (err, results) => {

	    if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }

      if (results.length > 0) {
        //console.log(results);
        return res.status(200).json({ message: 'Utilizador encontrado.', user: results });
      }


    });
}
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }

});




module.exports = router;