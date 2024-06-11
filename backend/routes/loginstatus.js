const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();


router.use(cookieParser());
router.use(express.json());

router.get('/', (req, res) => {
    const userId = req.cookies.user_id; // Obtém o ID do usuário do cookie user_id
    const func = req.cookies.func;
    
    if (userId) {//verifica se cookie user está definido
        const query = 'SELECT * FROM Cliente WHERE ID = ?';//Seleciona os dados do cliente com o ID passado
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err);
                return res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
            }
            
            if (results.length > 0) {
                return res.json({ loggedIn: true });
            } else {
                res.clearCookie('user_id');
                return res.json({ loggedIn: false });
            }
        });
    } 
    else if (func) {//verifica se cookie func está definido
        let func_data;
        try {
            func_data = JSON.parse(func);
        } 
        catch (error) {
            console.error('Erro ao parsear o cookie func:', error);
            return res.status(400).json({ error: 'Cookie inválido' });
        }
        
        const query2 = 'SELECT * FROM Funcionario WHERE ID = ?';//Seleciona os dados do funcionário com o ID passado
        db.query(query2, [func_data[0].ID], (err, results) => {
            if (err) {
                console.error('Erro ao consultar o banco de dados:', err);
                return res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
            }
            if (results.length > 0) {
                return res.json({ loggedIn: true });
            } 
            else {
                res.clearCookie('func');
                return res.json({ loggedIn: false });
            }
        });
    } 
    else {
        return res.json({ loggedIn: false });
    }
});

router.post('/', (req, res) => {//apaga os cookies que existem de sessão
    if (req.body.logout) {
        const cookieName = 'user_id'; 
        const cookieName_2 = 'func';
        if (req.cookies[cookieName] || req.cookies[cookieName_2]) {
            res.cookie(cookieName, '', { expires: new Date(0), path: '/' });
            res.cookie(cookieName_2, '', { expires: new Date(0), path: '/' });
            return res.json({ message: 'Cookie deleted' });
        } 
        else {
            return res.status(400).json({ message: 'Cookie not found' });
        }
    }
});
module.exports = router;