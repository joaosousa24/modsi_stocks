const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();


router.use(cookieParser());
router.use(express.json());


router.get('/', (req, res) => {
    
    const checkQuery = 'SELECT * FROM Encomendas ';//Vai buscar todo o conteúdo das tabela Encomendas
    db.query(checkQuery, (err, results_enc) => {

      if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }
    //console.log(results_enc);
    return res.status(200).json({enc: results_enc});
    });
});

router.post('/:id', (req, res) => {

  try{
    const ref_enc_Id = parseInt(req.params.id);
    const {estado} = req.body;
       // console.log(estado);
    const checkQuery = 'UPDATE Encomendas SET Estado = ? WHERE N_encomenda = ?';//Atualiza estado da encomenda passada
    db.query(checkQuery, [estado,ref_enc_Id], (err, results) => {
      
      if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }
      //console.log(results);
    return res.status(200).json({res: "Alterado"});
    });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
});

module.exports = router;