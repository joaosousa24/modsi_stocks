function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

let total;

async function exibirInformacoesDoUsuario() {
   
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

        let userInfoDiv = document.getElementById('user-info');
   
        let userInfoHTML = `
            <h2>Informações do Cliente</h2>
            <p><strong>Morada de Entrega:</strong> ${userInfo.user[0].Morada}</p>
            <p><strong>Modo de Pagamento:</strong> </p>
            <p><strong>NIF:</strong> ${userInfo.user[0].nipc}</p>
            <button class="bt_purchase" onclick="finalizarCompra();">Finalizar Compra</button>
        `;
    
        userInfoDiv.innerHTML = userInfoHTML;


      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      }
       
   
}

exibirInformacoesDoUsuario()

async function finalizarCompra(){
  let cart = getCookie('cart');
  
 if(cart !== null){ 
  try {
    const response = await fetch('/purchase-regist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({cart, total}),
    });


let response_2 = await response.json();
    if (!response.ok) {
      alert('ERROR Registing Compra');
      
    }
   if (response_2.body=='Aceite'){
    document.cookie = "cart" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert('Compra registada');
    window.location.href = '../index.html';
   }


  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during registration.');
  }
}
else{alert('Carrinho Vazio');}

}

function total_carrinho(){

  const rows = document.querySelectorAll('#tabela-produtos tbody tr');
  total = 0;

  // Iterar sobre cada linha e calcular o total
  rows.forEach(row => {
      const quantidadeElement = row.querySelector('[id^="quantidadep_"]');
      const precoElement = row.querySelector('[id^="precop_"]');
      
      if (quantidadeElement && precoElement) {
          const quantidade = parseInt(quantidadeElement.textContent);
          const preco = parseFloat(precoElement.textContent.replace('€', '').replace(',', '.'));
	        total +=preco;
      }
  });

  // Atualizar o valor total no rodapé
  document.getElementById('total-preco').textContent = total.toFixed(2).replace('.', ',') + '€';


}

total_carrinho()


document.querySelectorAll('.bt_qnt').forEach(button => {
  button.addEventListener('click', function(event) {
          total_carrinho();
  });
});

