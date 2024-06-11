const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();


router.use(cookieParser());
router.use(express.json());


router.get('/', (req, res) => {
    
    const checkQuery = 'SELECT * FROM Fornecedores_Pedidos '; //seleciona todos os pedidos fornecedor
    db.query(checkQuery, (err, results_enc) => {

        if (err) {
            console.error('Erro ao verificar a base de dados:', err);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
        //console.log(results_enc);
    
    return res.status(200).json({enc: results_enc});
    });
});

router.post('/', (req, res) => {
    const nome = req.body.Nome;
    const date = req.body.Data;
    const produtosQuantidades = req.body.prod;
    
    try{
    const checkQuery = 'INSERT INTO Fornecedores_Pedidos (Nome_F, data) VALUES (?, ?)';//Insere um pedido fornecedor
    db.query(checkQuery, [nome, date], (err, results_f) => {

        if (err) {
            console.error('Erro ao verificar a base de dados:', err);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
        //console.log(results_f);
        
        const pedidoId = results_f.insertId;
        const checkQuery = 'INSERT INTO Fornecedores_pedidos_artigos (ID_pedido, produto, quantidade ) VALUES ?';// com id obtido do pedido fornecedores regista-se os produtos associados
        const produtosValues = produtosQuantidades.map(pq => [pedidoId, pq.produto, pq.quantidade]);
        db.query(checkQuery, [produtosValues], (err, results) => {
        if (err) {
            console.error('Erro ao verificar a base de dados:', err);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }
        return res.json({ message: 'Pedido registrado com sucesso!' });
        });
    });
    }
    catch (error) {
        console.error('Erro ao processar a requisição:', error);
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
    } 
});

module.exports = router;