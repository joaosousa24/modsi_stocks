

async function logout_f(){

      
    window.location.href = '../index.html';
    
    try {
      const response_2 = await fetch('/loginstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logout: true}),
      });

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
}

  if(window.location.pathname=='/client.html'){
  // Preenche o formulário com os dados do cliente atual ao carregar a página
    fetchClientData();

    // Adiciona um evento de envio ao formulário
    document.getElementById('editForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário (enviar a página)

        // Obtém os dados do formulário
        const formData = new FormData(event.target);

        // Envia os dados do formulário para o servidor para atualização
        updateClientData(formData);
    });
  
  }

async function fetchClientData() {
    try {
        const response = await fetch('/userdata_login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({loggedIndata: true }),
        });

	
    let userInfo = await response.json();
        if (!response.ok) {
          
          alert('Erro geting info ' + result.error);
          return;
        }

        
        // Preenche os campos do formulário com os dados do cliente atual
        document.getElementById('name').value =userInfo.user[0].nome_empresa;
        document.getElementById('email').value = userInfo.user[0].Email;
        document.getElementById('nipc').value = userInfo.user[0].nipc;
        document.getElementById('morada').value =userInfo.user[0].Morada;


      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      }
  
    
    
}

function updateClientData(formData) {
    // Aqui faz uma solicitação ao servidor para atualizar os dados do cliente
    
    fetch('/register_update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Nome: formData.get('name'),
            email: formData.get('email'),
            morada: formData.get('morada'),
            nipc: formData.get('nipc')
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Dados do cliente atualizados com sucesso!');
        } else {
            console.error('Erro ao atualizar dados do cliente:', response.status);
        }
    })
    .catch(error => console.error('Erro ao atualizar dados do cliente:', error));
}