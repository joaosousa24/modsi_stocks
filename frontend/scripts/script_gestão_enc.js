async function fetchEncomendas() {
    try{
      const response = await fetch('/encomendas')
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
     }
     
     const data = await response.json();
      
      
        // Limpar a tabela antes de preencher com novos dados
       const tableBody = document.getElementById('encomendasTable').getElementsByTagName('tbody')[0];
       tableBody.innerHTML = '';
  
       // Preencher a tabela com os dados recebidos
       data.enc.forEach((enc) => {
           const row = tableBody.insertRow();
           row.insertCell(0).innerText = enc.N_encomenda;
           row.insertCell(1).innerText = new Date(enc.data).toLocaleString();
           row.insertCell(2).innerText = enc.Estado;
           row.insertCell(3).innerText = enc.Total +" €";
           
           const buttonCell = row.insertCell(4); 
          const button = document.createElement('button'); 
          button.textContent = 'More details'; 
          button.classList.add('get-id-btn'); 
          button.addEventListener('click', function() {
            create_div(enc.N_encomenda);
            
        });
        
        const button_alterar_estado = document.createElement('button'); 
        button_alterar_estado.textContent = 'Alterar estado'; 
        button_alterar_estado.classList.add('get-id-btn_2'); 
        button_alterar_estado.addEventListener('click', function() {
            alt_estado(enc.N_encomenda, enc.Estado);
          
          
      });


        
        buttonCell.appendChild(button);
        buttonCell.appendChild(button_alterar_estado);
       
      
    });
  
            
       
    }
  
            
      catch (error) {
      console.error('Fetch error:', error);
    }
  }
  fetchEncomendas();
  


  async function create_div(enc_id){
    
    const extraInfoDiv = document.getElementById('extra_info');
    const tables = extraInfoDiv.getElementsByTagName('table');
    
    // Verifica se existe pelo menos uma tabela dentro da div
    if (tables.length > 0) {
      // Remove a primeira tabela encontrada
      tables[0].remove();
      return;
    }
    const table = document.createElement('table');
    table.id = enc_id
    table.border = '1';
  
    // Criar o cabeçalho da tabela
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
  
    const th1 = document.createElement('th');
    th1.innerText = 'ID do Produto';
    const th2 = document.createElement('th');
    th2.innerText = 'Nome do Produto';
    const th3 = document.createElement('th');
    th3.innerText = 'Quantidade';
    
  
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    headerRow.appendChild(th3);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const enc_p_info = await getEncomendaInfo(enc_id);
    
  enc_p_info.enc.forEach(async (enc) => {
       
      const pord_name= await getprod_name(enc.Ref_produto);
    
  const div_extra = document.getElementById('extra_info');
  div_extra.innerHTML = '';
  
      // Criar a tabela
     
  
  const tbody = document.createElement('tbody');  
  pord_name.prod.forEach(async (prod) =>{
    const row = document.createElement('tr');
  
    const td1 = document.createElement('td');
    td1.innerText = enc.Ref_produto;
    const td2 = document.createElement('td');
    td2.innerText = prod.Nome;
    const td3 = document.createElement('td');
    td3.innerText = enc.Quantidade;
  
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    tbody.appendChild(row);
  
  
        });
        table.appendChild(tbody);
        div_extra.appendChild(table);
  });
  
  }
  
  
    async function getEncomendaInfo(encomendaId) {
        try {
            const response = await fetch('/encomendas_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({res: encomendaId }),
            });
            const encInfo = await response.json();
            
            return encInfo;
        } catch (error) {
            console.error('Erro ao obter dados da encomenda:', error);
        }
        
    }
  
   async function getprod_name(Ref_product){
  
    try{
      const response = await fetch(`/prod-name/${Ref_product}`)
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
     }
     
     const data = await response.json();
     
      return data;
      
      }
  
            
      catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  function alt_estado(N_encomenda,Estado){
    let altestado;

    if(Estado=="Registado"){
    altestado="A preparar";
    }
    else if(Estado=="A preparar"){
        altestado="Enviada";
    }
    else{
    	altestado="Entregue";
    }

    try {
        const response = fetch(`/encomendas/${N_encomenda}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({estado: altestado }),
        });
        
        if(response)  {  fetchEncomendas();
        
        }
        
    } catch (error) {
        console.error('Erro ao obter dados da encomenda:', error);
    }

  }
  

document.getElementById('redirectButton').addEventListener('click', function() {
    window.location.href = '../funcionario.html'; 
});
  
  