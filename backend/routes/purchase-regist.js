const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

router.post('/', (req, res) => {
  let enc_num;
  let Cart = JSON.parse(req.cookies.cart);
  let total = JSON.parse(req.body.total);
  
  try{
    const userId = req.cookies.user_id;
     //console.log(userId);
    const insertQuery = 'INSERT INTO Encomendas (data, Estado, ID_cliente, Total) VALUES (?, ?, ?, ?)';//Insere nas encomendas os dados recebidos 
    const values = [ new Date, 'Registado', userId, total]; 
    db.query(insertQuery, values, (err, results) => {
      enc_num= results.insertId;
      if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }
            
      else{
        //console.log(Cart);
        Cart.forEach(item => {          //para cada item da cookie carrinho ele vai extrair a informação ref produto e quantidade
          const product = item.product; // Extrai os detalhes do produto
          const quantity = item.quantity; // Extrai a quantidade do produto
          const productQuery = 'INSERT INTO Produtos_encomendas (N_encomenda, Ref_produto, Quantidade) VALUES (?, ?, ?)';//Insere na produtos encomendas os dados 
          const productValues = [enc_num, product.Referencia, quantity];
          db.query(productQuery, productValues, (err) => {
            if (err) {
              console.error('Erro ao inserir produto na encomenda:', err);
              return res.status(500).json({ error: 'Erro interno no servidor ao inserir produtos.' });
            }
          });
        });
        return res.status(200).json({ body: 'Aceite' });
      }    
    });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
});

module.exports = router;