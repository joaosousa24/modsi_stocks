async function fetchStock() {
    try{
      const response = await fetch('/products')
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
     }
     
     const data = await response.json();
      
      
        // Limpar a tabela antes de preencher com novos dados
       const tableBody = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
       tableBody.innerHTML = '';
  
       // Preencher a tabela com os dados recebidos
       data.prod.forEach((prod) => {
           const row = tableBody.insertRow();
           row.insertCell(0).innerText = prod.Referencia;
           row.insertCell(1).innerText = prod.Nome;
           row.insertCell(2).innerText = prod.Descricao;
           row.insertCell(3).innerText = prod.preco + " €";
           row.insertCell(4).innerText = prod.Quantidade;

          const Cell = row.insertCell(5); n
          const form = document.createElement('form'); 

          const input = document.createElement('input'); 
          input.type = 'number'; 
          input.name = 'quantidade';
          input.value = prod.Quantidade;
          input.classList.add('input_q'); 
          input.id=prod.Referencia;
          const submitButton = document.createElement('button');
          submitButton.type = 'submit';
          submitButton.textContent = 'Guardar';
                
    
         
        form.appendChild(input);
        form.appendChild(submitButton);
        Cell.appendChild(form);

        form.addEventListener('submit', function(event) {
          event.preventDefault(); // Impede a submissão tradicional do formulário
    
          const quantidade = input.value; // Obtém o valor do campo de entrada
          const produto = input.id;
          update_stock(quantidade,produto);
        });

    });      
    }
  
            
      catch (error) {
      console.error('Fetch error:', error);
    }
  }
  fetchStock();
  
  
  function update_stock(quantidade, prod){

    try {
      const response = fetch('/produtos-qnt', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({prod: prod, qnt: quantidade}),
      });
     
      
      if(response)  {  
        fetchStock();
        
      }
      } catch (error) {
      console.error('Erro ao obter dados da encomenda:', error);
  }
 

  }


document.getElementById('redirectButton').addEventListener('click', function() {
    window.location.href = '../funcionario.html'; 
});