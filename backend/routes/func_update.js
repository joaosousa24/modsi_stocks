const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/', (req, res) => {
  try{
    const func_id = req.cookies.func;
    const func_id_data = JSON.parse(func_id);
    const {Nome, email} = req.body;
    
    
    const checkQuery = 'UPDATE Funcionario SET Nome = ?, email = ? WHERE ID = ?';//Atualiza os parametros Nome e email de um funcionário
        db.query(checkQuery, [Nome, email, func_id_data[0].ID], (err, results) => {
    
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