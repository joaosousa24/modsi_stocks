const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.post('/', (req, res) => {
 
    const { email, password } = req.body;
    //console.log(`Dados recebidos:
    //  Email - ${email},
    //  Password - ${password},`);   
    const query = 'SELECT * FROM Cliente WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
        }

        // Verificar se o utilizador foi encontrado
        if (results.length > 0) {
            const user = results[0];
	        //console.log(`Dados recebidos: ID - ${user.ID}`);

            const hashSenhaArmazenada = user.password;
            const salt = user.salt;
            const senhaHash = await bcrypt.hash(password, salt);
		
            if (senhaHash== hashSenhaArmazenada) {
                // Definir um cookie para indicar que o utilizador está logado
                res.cookie('user_id', user.ID, { httpOnly: false });
                // Responder com sucesso
                res.status(200).json({ message: 'Login bem-sucedido' });
            } else {
                // Responder com erro de login
                res.status(401).json({ error: 'Credenciais inválidas' });
            }
        } else {
            const query = 'SELECT * FROM Funcionario WHERE email = ?';
            db.query(query, [email], async (err, results) => {
                if (err) {
                    console.error('Erro ao consultar o banco de dados:', err);
                    return res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
                }
                // Verificar se o usuário foi encontrado
                if (results.length > 0) {
                    const user_func = results[0];
	    
                    //console.log(`Dados recebidos: ID - ${user_func.ID}`);

 	                const hashSenhaArmazenada = user_func.password;
   	                const salt = user_func.salt;
    	            const senhaHash = await bcrypt.hash(password, salt);
            
                    if (senhaHash== hashSenhaArmazenada) {
                        // Definir um cookie para indicar que o usuário está logado
                        res.cookie('func', '[{"ID":'+ user_func.ID + ',"Cargo":' + user_func.Cargo+'}]',{ httpOnly: false});
                        console.log("cookie criado")
                        // Responder com sucesso
                        res.status(200).json({ message: 'Login bem-sucedido' });
                    } 
                    else {
                        // Responder com erro de login
                        res.status(401).json({ error: 'Credenciais inválidas' });
                    }
            
                }   
                else{
                    res.status(401).json({ error: 'Credenciais inválidas' });
                }
            });
        };
    });
});
module.exports = router;