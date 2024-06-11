const express = require('express');
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;


const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const loginStatus = require('./routes/loginstatus');
const logindata = require('./routes/userdata_login');
const purchase = require('./routes/purchase-regist');
const register_update = require('./routes/register_update');
const encomendas_user = require('./routes/encomendas_user');
const encomendas_data = require('./routes/encomendas_data');
const pord_name = require('./routes/prod-name');
const funclogindata = require('./routes/funcdata_login');
const func_update = require('./routes/func_update');
const g_encomendas = require('./routes/encomendas');
const prod_qnt = require('./routes/produtos-qnt');
const prod_prc = require('./routes/produtos-prc');
const fornecedores = require('./routes/fornecedores');
const clientes = require('./routes/clientes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/loginstatus', loginStatus);
app.use('/userdata_login', logindata);
app.use('/purchase-regist', purchase);
app.use('/register_update', register_update);
app.use('/encomendas_user', encomendas_user);
app.use('/encomendas_data', encomendas_data);
app.use('/prod-name', pord_name);
app.use('/funcdata_login',funclogindata);
app.use('/func_update',func_update);
app.use('/encomendas',g_encomendas);
app.use('/produtos-qnt',prod_qnt);
app.use('/fornecedores',fornecedores);
app.use('/produtos-prc',prod_prc);
app.use('/clientes',clientes);

// Endpoint para enviar eventos SSE
/*app.get('/api/products', (req, res) => {
    // Configura o cabeçalho para indicar que este é um evento SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    // Função para enviar eventos SSE
    const sendSSE = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`); // Envia o evento SSE
    };

    // Função para escutar alterações no banco de dados
    const listenForDatabaseChanges = () => {
        db.query('SELECT * FROM Produtos', (error, results) => {
            if (error) {
                console.error('Erro ao consultar o banco de dados:', error);
                sendSSE({ error: 'Erro ao consultar o banco de dados' });
                return;
            }

            if (results.length > 0) {
                sendSSE(results); // Envia os resultados para o cliente como evento SSE
            }
        });
    };

    // Inicia a escuta de alterações no banco de dados
    listenForDatabaseChanges();

    // Define um temporizador para escutar alterações no banco de dados a cada X segundos
    const interval = setInterval(listenForDatabaseChanges, 5000); // Por exemplo, a cada 5 segundos

    // Fecha a conexão quando o cliente desconectar
    req.on('close', () => {
        console.log('Cliente desconectado.');
        clearInterval(interval); // Limpa o intervalo
        res.end(); // Termina a resposta
    });
});
*/

app.get('/products', (req, res) => {

    try{
     
        
      const checkQuery = 'SELECT * FROM Produtos';
          db.query(checkQuery, (err, results) => {
      
          if (err) {
                  console.error('Erro ao verificar a base de dados:', err);
                  return res.status(500).json({ error: 'Erro interno no servidor.' });
              }
      
               console.log(results);
               return res.status(200).json({prod: results });
      
          });
      }
        catch (error) {
          console.error('Erro ao processar a requisição:', error);
          res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
        }

});


/*function verificarAcesso(req, res, next) {
    // Verificar se o cookie está presente
    const funcCookie = req.cookies.func;
   // console.log(funcCookie);
    if(funcCookie){
        console.log('oK lets go');
        next();
    }
    else{
        res.status(403).send('Acesso negado. Você não tem permissão para acessar esta página.');
    }
}

app.get('/funcionario', verificarAcesso, (req, res) => {
    console.log('oK lets go2');
    res.json("OK");
});*/


app.listen(3000, () => {
    console.log('Servidor SSE iniciado na porta 3000.');
});
