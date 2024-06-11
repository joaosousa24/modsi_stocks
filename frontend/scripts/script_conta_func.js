
  if(window.location.pathname=='/funcionario.html'|| window.location.pathname=="/gestao.html"||window.location.pathname=="/gestao_fornecedores.html"||window.location.pathname=="/ficha_cliente.html"){
  // Preenche o formulário com os dados do cliente atual ao carregar a página
    fetchFuncData();

    // Adiciona um evento de envio ao formulário
    document.getElementById('editForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário (enviar a página)

        // Obtém os dados do formulário
        const formData = new FormData(event.target);

        // Envia os dados do formulário para o servidor para atualização
        updateFuncData(formData);
    });
  
  }

async function fetchFuncData() {
    try {
        const response = await fetch('/funcdata_login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({loggedIndata: true }),
        });

	
      let funcInfo = await response.json();
        if (!response.ok) {
          
          alert('Erro geting info ' + result.error);
          return;
        }

        
        // Preenche os campos do formulário com os dados do cliente atual
        document.getElementById('name').value =funcInfo.user[0].Nome;
        document.getElementById('email').value = funcInfo.user[0].email;
        
   


      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      }
  
    
    
}

function updateFuncData(formData) {
    // Aqui faz solicitação ao servidor para atualizar os dados do cliente
   
    fetch('/func_update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Nome: formData.get('name'),
            email: formData.get('email'),
           
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Dados do funcionário atualizados com sucesso!');
        } else {
            console.error('Erro ao atualizar dados do funcionario:', response.status);
        }
    })
    .catch(error => console.error('Erro ao atualizar dados do funcionario:', error));
}
function g_encomendas(){
  window.location.href = '../g_encomendas.html';
}

function fornecedores(){
  window.location.href = '../fornecedores.html';
}

function gestao(){
  window.location.href = '../gestao.html';
}

function stock(){
  window.location.href = '../stock.html';
}

function func_bt(){
  if( logginstatus){
   window.location.href = '../funcionario.html';
  }
}

function registo(){
  
   window.location.href = '../register_func.html';
  
}
