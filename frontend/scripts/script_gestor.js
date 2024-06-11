
fetchEncomendas();
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
           row.insertCell(3).innerText = enc.Total;
           
           const buttonCell = row.insertCell(4); 
          const button = document.createElement('button'); 
          button.textContent = 'Alterar'; 
          button.classList.add('get-id-btn'); 
          button.addEventListener('click', function() {
           create_div(enc.N_encomenda);
            
        });

        const button_2 = document.createElement('button');
          button_2.textContent = 'Remover'; 
          button_2.classList.add('get-id-btn-2'); 
          button_2.addEventListener('click', function() {
           Remover(enc.N_encomenda);
            
        });



        buttonCell.appendChild(button);
        buttonCell.appendChild(button_2);
      
        });
  
            
       
        }
  
            
      catch (error) {
      console.error('Fetch error:', error);
    }
  }


  
async function create_div(enc_id){
   

    const extraInfoDiv = document.getElementById('extra_info');
    const tables = extraInfoDiv.getElementsByTagName('table');
    const form = document.getElementById('form-c');
    form.style="display: active;";
     // Verifica se existe pelo menos uma tabela dentro da div
     if (tables.length > 0) {
        // Remove a primeira tabela encontrada
        tables[0].remove();
        
        form.style="display: none;";
        return;
      }

    

    const prod = await getprod();
    
    var selectProduto = document.getElementById('product');

    prod.prod.forEach(async(prod) => {
     var novaOpcao = document.createElement('option');
 
     // Define o valor e o texto da opção
     novaOpcao.value = prod.Referencia;
     novaOpcao.textContent = prod.Nome;
     
     // Adiciona a nova opção ao select
     selectProduto.appendChild(novaOpcao);

    });

    

    

    const table = document.createElement('table');
    table.border = '1';
    table.id = enc_id;
  
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
  



function Remover(N_encomenda){

        try {
            const response = fetch('/encomendas_data/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({res: N_encomenda }),
            });
           
            if(response){
                fetchEncomendas();
            }
            
            
        } catch (error) {
            console.error('Erro ao obter dados da encomenda:', error);
        }
        
}
    

async function getprod(){

    try{
        const response = await fetch('/products')
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
       }
       
       const data_2 = await response.json();

     return data_2;

    }
    catch (error) {
        console.error('Fetch error:', error);
      }


}


document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne a submissão padrão do formulário

    // Captura os valores dos campos do formulário
    var action = document.getElementById('action').value;
    var product = document.getElementById('product').value;
    var quantity = document.getElementById('quantity').value;


    // Exibe os valores no console (ou processa-os conforme necessário)
    console.log('Ação:', action);
    console.log('Produto:', product);
    console.log('Quantidade:', quantity);

    var tabela = document.getElementById('extra_info').querySelector('table');
    var enc_id=tabela.id;
    try {
        const response = await fetch('/encomendas_data/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ID: enc_id, prod: product, qnt: quantity }),
        });
       
        if(!response.ok){
            throw new Error('Network response was not ok');
            
        }
        
        
        
        
    } catch (error) {
        console.error('Erro ao obter dados da encomenda:', error);
    }


   const encinfo = await getEncomendaInfo(enc_id);
   let total=0;
   encinfo.enc.forEach(async (enc) => {
   
    const prod_pr= await getprod_price(enc.Ref_produto);
    total += prod_pr.prc[0].preco * enc.Quantidade.toFixed(2);
    console.log(total);
    updateTotal(total, enc_id);
});
    
   
});



async function getprod_price(ref_prod){

    try {
        const response = await fetch('/produtos-prc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ID: ref_prod }),
        });
       
        if(!response.ok){
            throw new Error('Network response was not ok');
            
        }
        
            const data = await response.json();
            
            return data;
        
    } catch (error) {
        console.error('Erro ao obter dados da encomenda:', error);
    }

}


async function updateTotal(total, enc_id){


    try {
        const response = fetch('/encomendas_data/total', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ID: enc_id, total: total }),
        });
       
        if(!response.ok){
            throw new Error('Network response was not ok');
            
        }
        
           
        
    } catch (error) {
        console.error('Erro ao obter dados da encomenda:', error);
    }
    
    window.location.href='../gestao.html';
}

document.getElementById('redirectButton').addEventListener('click', function() {
    window.location.href = '../funcionario.html'; 
});



