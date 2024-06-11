const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();


router.use(cookieParser());
router.use(express.json());


router.get('/', (req, res) => {
    const userId = req.cookies.user_id; // Obtém o ID do usuário do cookie user_id
    let results_enc;
    let results_enc_p;
    
    const checkQuery = 'SELECT * FROM Encomendas WHERE ID_cliente = ?';// Seleciona as encomendas de um ID
    db.query(checkQuery, [userId], (err, results_enc) => {

        if (err) {
            console.error('Erro ao verificar a base de dados:', err);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
        //console.log(results_enc);
    
      
    return res.status(200).json({enc: results_enc});
    });
});
module.exports = router;