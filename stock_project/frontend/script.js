document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="img/${product.Referencia}.jpg" alt="${product.Nome}">
                    <h2>${product.Nome}</h2>
                    <p>€${product.preco}</p>
                `;
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});
