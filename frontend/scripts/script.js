

function setCookie(name, value, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return JSON.parse(c.substring(cname.length, c.length));
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


let products = [];
let cart = getCookie('cart') || [];

document.addEventListener('DOMContentLoaded', async () => {
   

    try{
        const addedProducts = new Set();
        const response = await fetch('/products');
      
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        const data = await response.json();
        console.log(data);
        products = data;
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            loadProductGrid(products, addedProducts);
        }

        if (window.location.pathname.endsWith('details.html')) {
            loadProductDetails(products, addedProducts);
        }
        
    }
    
              
    catch (error) {
        console.error('Fetch error:', error);
    }
    
    updateCartCount();
    updateCartItems();


});

function loadProductGrid(products, addedProducts) {//Carrega grelha de produtos
    console.log('Entering loadProductGrid');
    console.log('Current addedProducts:', addedProducts);
    const grid = document.getElementById('product-grid');
    if (grid) {
        products.prod.forEach(product => {
            if (!addedProducts.has(product.Referencia)) {
                console.log('Adding product:', product);
                addedProducts.add(product.Referencia);
                const productDiv = document.createElement('div');
		productDiv.setAttribute("id", product.Referencia);
                productDiv.innerHTML = `
                    <h2>${product.Nome}</h2>
		    <a href="details.html?id=${product.Referencia}">
			<img class = "img-produto" src="img/${product.Referencia}.jpg" alt="${product.Nome}">	
		    </a>
                    <p>${product.preco}€</p>
                    
                `;
                grid.appendChild(productDiv);
            }
	else if(addedProducts.has(product.Referencia)){
	const product_h2 = document.getElementById(product.Referencia).getElementsByTagName("h2")[0];
	product_h2.innerText = product.Nome;
	const product_a = document.getElementById(product.Referencia).getElementsByTagName("a")[0];
	const product_img = product_a.getElementsByTagName("img")[0];
	product_img.setAttribute("class", "img-produto");
	product_img.setAttribute("src", "img/"+product.Referencia+".jpg");
	product_img.setAttribute("alt", product.Nome);

	
const product_p = document.getElementById(product.Referencia).getElementsByTagName("p")[0];
	 product_p.innerText=product.preco+"€";
}


        });
    } else {
        console.warn('Product grid element not found');
    }
}

function loadProductDetails(products) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id'); // Insere o URL parametro 'id'
    const product = products.prod.find(p => p.Referencia == productId);

    if (product) {
        const detailsDiv = document.getElementById('product-details');
        if (detailsDiv) {
            detailsDiv.innerHTML = `
                <h2>${product.Nome}</h2>
                <p>${product.Descricao}</p>
		<p><img class = "img-produto" src="img/${product.Referencia}.jpg" alt="${product.Nome}"></p>
		<p id="p">${product.preco.toFixed(2)}€</p>           
 `;
        } else {
            console.warn('Product details element not found');
        }
    } else {
        console.warn('Product not found with id:', productId);
    }
}

function toggleCartDropdown() {
    const dropdown = document.getElementById('cart-dropdown');
    const cartIcon = document.querySelector('.cart-icon');
    const cartIconRect = cartIcon.getBoundingClientRect();

    // Definir a posição vertical do dropdown
    if (window.innerHeight - cartIconRect.bottom > dropdown.clientHeight) {
        // Se houver espaço suficiente abaixo do icone do carrinho, posicione o dropdown abaixo dele
        dropdown.style.top = cartIconRect.bottom + 39.28 + 'px';
    } else {
        // Caso contrÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¡rio, posicione o dropdown acima do i­cone do carrinho
        dropdown.style.top = cartIconRect.top - dropdown.clientHeight + 'px';
    }

    // Definir a posição horizontal do dropdown
    dropdown.style.left =window.innerWidth -600 + 'px';

    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}


function addToCart() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = products.prod.find(p => p.Referencia == productId);


    if (product) {
        const cartItem = cart.find(item => item.product.Referencia === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ product, quantity: 1 });
        }
        setCookie('cart', cart, 0.5);
        updateCartCount();
        updateCartItems();
    } else {
        console.warn('Product not found with reference:', productId);
        
    }}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

function updateCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th class="coluna-imagem">Imagem</th>
                    <th class="coluna-produto">Produto</th>
                    <th class="coluna-quantidade">Quantidade</th>
                    <th class="coluna-preco">Preço</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;

    const tbody = cartItems.querySelector('tbody');
    cart.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="img/${item.product.Referencia}.jpg" alt="${item.product.Nome}" class="cart-item-image"></td>
            <td id="product_tab">${item.product.Nome}</td>
            <td id="quantidade_tab">
            <button class="bt_qnt" onclick="decreaseQuantity(${item.product.Referencia}, event)">-</button> 
            <a id="quantidade_${item.product.Referencia}"">${item.quantity}</a> 
            <button class="bt_qnt" onclick="increaseQuantity(${item.product.Referencia}, event)">+</button>
            </td>
            <td id="preco_${item.product.Referencia}">${(item.product.preco * item.quantity).toFixed(2)}€</td>
        `;
        tbody.appendChild(tr);
    });
}

function increaseQuantity(productId, event) {
     event.stopPropagation();
    const cartItem = cart.find(item => item.product.Referencia == productId);
    if (cartItem) {
        cartItem.quantity += 1;
        setCookie('cart', cart, 0.5);
        updateCartCount();
        updateCartItemQuantity(productId, cartItem.quantity, cartItem.product.preco);
        updateItemQuantity(productId, cartItem.quantity, cartItem.product.preco);
    }
 
}

function decreaseQuantity(productId, event) {
    event.stopPropagation();
    const cartItem = cart.find(item => item.product.Referencia == productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        setCookie('cart', cart, 0.5);
        updateCartItemQuantity(productId, cartItem.quantity, cartItem.product.preco);
        updateCartCount();
        updateItemQuantity(productId, cartItem.quantity, cartItem.product.preco);
        
    } else {
        removeFromCart(productId);
        
    }
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.product.Referencia == productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    setCookie('cart', cart, 0.5);
    updateCartCount();
    updateCartItems();
    exibirResumoDoCarrinho();
   
    
}


function finalizePurchase() {
    if(window.log_state==1){
    window.location.href = '../purchase.html';
    }
    else{
        alert('Fazer login primeiro');
    }
}

function updateCartItemQuantity(productId, quantity, preco) {
    const quantityElement = document.getElementById(`quantidade_${productId}`);
  
        quantityElement.textContent = quantity;

    const precoElement = document.getElementById(`preco_${productId}`);
   
        precoElement.textContent = (quantity*preco).toFixed(2) +"€";
    
}




function toggleLoginDropdown() {
    const dropdown = document.getElementById('login-dropdown');
    const LogIcon = document.querySelector('.bt_login');
    const LogIconRect = LogIcon.getBoundingClientRect();

    // Definir a posição vertical do dropdown
    if (window.innerHeight - LogIconRect.bottom > dropdown.clientHeight) {
        // Se houver espaço suficiente abaixo do icone de login, posicione o dropdown abaixo dele
        dropdown.style.top = LogIconRect.bottom + 'px';
    } else {
        // Caso contrário, posicione o dropdown acima do i­cone de login
        dropdown.style.top = LogIconRect.top - dropdown.clientHeight + 'px';
    }

    // Definir a posição horizontal do dropdown
    dropdown.style.left =-143+'px';

    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function redirectToRegister() {
    window.location.href = '../register.html';  
}


function exibirResumoDoCarrinho() {
   
    let cartSummaryTable = document.getElementById('resumo_carrinho').getElementsByTagName('tbody')[0];
    console.log(cart);
    if (cart.length === 0) {
        cartSummaryTable.innerHTML = '<tr><td colspan="4">O carrinho está vazio.</td></tr>';
        return;
    }

    let resumoHTML = '';
    cart.forEach(item => {
        let produto = item.product;
        resumoHTML += `
            <tr>
                <td><img src="img/${produto.Referencia}.jpg" alt="${produto.Nome}" width="50"></td>
                <td>${produto.Nome}</td>
                <td id="quantidade_tab">
                <button class="bt_qnt" onclick="decreaseQuantity(${produto.Referencia}, event); ">-</button> 
                <a id="quantidadep_${produto.Referencia}">${item.quantity}</a> 
                <button class="bt_qnt" onclick="increaseQuantity(${produto.Referencia}, event); ">+</button>
            </td>
                <td id="precop_${produto.Referencia}">${(produto.preco * item.quantity).toFixed(2)}€</td>
                
            </tr>
        `;
    });

    cartSummaryTable.innerHTML = resumoHTML;
}

    if(window.location.pathname=='/purchase.html'){
exibirResumoDoCarrinho();
    }

function updateItemQuantity(productId, quantity, preco){

    const quantityElement = document.getElementById(`quantidadep_${productId}`);
    if (quantityElement) {
        quantityElement.textContent = quantity;
    }
    const precoElement = document.getElementById(`precop_${productId}`);
    if (precoElement) {
        precoElement.textContent = (quantity*preco).toFixed(2) +"€";
    }
}



window.onclick = function(event) {
    if (!event.target.matches('.bt_login') && !event.target.matches('.dropdown-content') && !event.target.matches('.login_input')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }

    if (!event.target.matches('.cart-icon')) {
        const dropdowns = document.getElementsByClassName('dropdown');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
}


window.addEventListener('popstate', function(event) {
    console.log('Popstate detected, reloading page.');
    location.reload();
});
history.replaceState({ page: 'initial' }, '', '');


function client_bt(){
    if( logginstatus && getCookie('user_id')){
    window.location.href = '../client.html';
    }
    else if(logginstatus && getCookie('func')){
    window.location.href = '../funcionario.html';
    }
 }


document.getElementById('redirectButton').addEventListener('click', function() {
    window.location.href = '../index.html'; 
});

