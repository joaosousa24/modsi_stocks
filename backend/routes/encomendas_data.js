const express = require('express');
const db = require('../db');
const cookieParser = require('cookie-parser');
const router = express.Router();


router.use(cookieParser());
router.use(express.json());


router.post('/', (req, res) => {
try{  
  const n_enc = req.body.res
    const checkQuery = 'SELECT * FROM Produtos_encomendas WHERE N_encomenda = ?';  //Consulta a base de dados e retira os dados associados a encomenda passada
    db.query(checkQuery, [n_enc], (err, results) => {

	  if (err) {
      console.error('Erro ao verificar a base de dados:', err);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }

        console.log(results);
        return res.status(200).json({enc: results});
    });
}
catch (error) {
  console.error('Erro ao processar a requisição:', error);
  res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
}

});

router.post('/fornecedores', (req, res) => {
  const id_ped = req.body.res
  const checkQuery = 'SELECT * FROM Fornecedores_pedidos_artigos WHERE ID_pedido = ?'; //Consulta a base de dados e retira os dados associados a um pedido do fornecedor
  try{ 
  db.query(checkQuery, [id_ped], (err, results) => {

	if (err) {
            console.error('Erro ao verificar a base de dados:', err);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
        }

        console.log(results);
        return res.status(200).json({enc: results});
    });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
  
 });


router.post('/remove', (req, res) => {

  try{
  const enc_id=req.body.res;
  const checkQuery = 'DELETE From Encomendas WHERE N_encomenda = ?'; //Remove da base de dados a encomenda passada
  db.query(checkQuery, [enc_id], (err, results) => {
      
    if (err) {
      console.error('Erro ao verificar a base de dados:', err);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
      console.log(results);
      return res.status(200).json({res: 'Removido'});
      
  });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
  
});

router.post('/produtos', (req, res) => {
  try{
    const enc_id=req.body.ID;
    const prod=req.body.prod;
    const quantity=req.body.qnt;
    const checkQuery = 'SELECT * FROM Produtos_encomendas WHERE Ref_produto = ?'; //Consulta a base de dados e retira os dados da tabela produtos encomendas associados ao produto passado
    db.query(checkQuery, [prod], (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        return res.status(500).send('Erro no servidor.');
      }

      if (results.length > 0) {
        const checkQuery = 'UPDATE Produtos_encomendas SET Quantidade = ? WHERE Ref_produto = ?';//Atualiza a quantidade na tabela produtos encomendas associada ao produto passado
      db.query(checkQuery, [quantity,prod], (err, results) => {
        if (err) {
          console.error('Erro ao consultar o banco de dados:', err);
          return res.status(500).send('Erro no servidor.');
        }
      
        return res.status(200).send('Updated');
      });

      }
      else{
        const checkQuery = 'INSERT INTO Produtos_encomendas (N_encomenda, Ref_produto, Quantidade) VALUES (?, ?, ?)'; //Insere em produtos encomendas os dados
        db.query(checkQuery, [enc_id,prod,quantity], (err, results) => {
          if (err) {
            console.error('Erro ao verificar a base de dados:', err);
            return res.status(500).json({ error: 'Erro interno no servidor.' });
          }
        
        //console.log(results);
        return res.status(200).json({res: 'Insert'});
          });
      }
        });
  }
  catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
  
});


router.post('/total', (req, res) => {
    const n_enc = req.body.ID;
    const total = req.body.total;
  try{  
  
    const checkQuery = 'UPDATE Encomendas SET Total = ? WHERE N_encomenda = ?'; //Atualiza o parâmetro Total da tabela encomendas com o id passado
    db.query(checkQuery, [total, n_enc], (err, results) => {

	    if (err) {
        console.error('Erro ao verificar a base de dados:', err);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
      }
    });
  }catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }  

});

module.exports = router;