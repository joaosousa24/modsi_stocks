async function fetchClientes() {
    try{
      const response = await fetch('/clientes')
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
     }
     
     const data = await response.json();
      
      
        // Limpar a tabela antes de preencher com novos dados
       const tableBody = document.getElementById('clientesTable').getElementsByTagName('tbody')[0];
       tableBody.innerHTML = '';
  
       // Preencher a tabela com os dados recebidos
       data.cli.forEach((cli) => {
           const row = tableBody.insertRow();
           row.insertCell(0).innerText = cli.ID;
           row.insertCell(1).innerText = cli.Email;
           row.insertCell(2).innerText = cli.nome_empresa;
           row.insertCell(3).innerText = cli.nipc;
           row.insertCell(4).innerText = cli.Morada;

           const buttonCell = row.insertCell(5); 
          const button = document.createElement('button');
          button.textContent = 'Alterar'; 
          button.classList.add('get-id-btn'); 
          button.addEventListener('click', function() {
            form_client(cli);
            
        });
        

          
        buttonCell.appendChild(button);
       
       
      
    });
  
            
       
    }
  
            
      catch (error) {
      console.error('Fetch error:', error);
    }
  }
  fetchClientes();
  
async function form_client(cli){
   
    
    const formContainer = document.getElementById('extra_info');
    const formHTML = `
        <form id=${cli.ID} class="producForm">           
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="${cli.Email}" required><br><br>
            
            <label for="nome">Nome Empresa:</label>
            <input type="text" id="nome" name="nome"  value="${cli.nome_empresa}" required><br><br>

            <label for="nipc">NIPC:</label>
            <input type="text" id="nipc" name="nipc"  value="${cli.nipc}" required><br><br>
            
            <label for="morada">Morada:</label>
            <input type="text" id="morada" name="morada" value="${cli.Morada}" required><br><br>
            
            <input type="submit" value="Salvar">
        </form>
    `;
    formContainer.innerHTML = formHTML;


    const newForm = document.getElementById(cli.ID);
    newForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Previne a submissão padrão do formulário

       //dados do formulário
        const formData = new FormData(event.target);
        
           


try {
    // Faz o fetch para enviar os dados ao servidor
    const response = await fetch('/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            Nome: formData.get('nome'),
            email: formData.get('email'),
            nipc: formData.get('nipc'),
            morada: formData.get('morada'),
            ID: cli.ID
        })
    });

    if (!response.ok) {
        throw new Error('Erro na rede');
    }

    const result = await response.json();
    console.log('Sucesso:', result);
    window.location.href='../ficha_cliente.html';

} catch (error) {
    console.error('Erro:', error);
}

});

}


document.getElementById('redirectButton').addEventListener('click', function() {
    window.location.href = '../funcionario.html'; 
});
