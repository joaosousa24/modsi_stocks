function adicionarProduto() {
    const produtosDiv = document.getElementById('produtos');
    const novoProdutoDiv = document.createElement('div');
    novoProdutoDiv.className = 'produto';
    novoProdutoDiv.innerHTML = `
        <label>Produto:</label>
        <input  type="text" name="produto[]" required>
        <label>Quantidade:</label>
        <input  type="number" name="quantidade[]" required>
        <button type="button" onclick="removerProduto(this)">Remover</button>
    `;
    produtosDiv.appendChild(novoProdutoDiv);
}

function removerProduto(button) {
    const produtoDiv = button.parentElement;
    produtoDiv.remove();
}



document.getElementById('pedidoForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne a submissão padrão do formulário

    const form = event.target;
    const fornecedor = form.fornecedor.value;
    const date=form['data-fornecedor'].value;;
    const produtosQuantidades = [];
    

    const produtosDiv = form.querySelectorAll('.produto');

    produtosDiv.forEach(produtoDiv => {
        const produto = produtoDiv.querySelector('input[name="produto[]"]').value;
        const quantidade = produtoDiv.querySelector('input[name="quantidade[]"]').value;

        produtosQuantidades.push({produto, quantidade});
           });


    try {
        const response = await fetch('/fornecedores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Nome: fornecedor, Data: date, prod: produtosQuantidades }),
        });
       
        if(!response.ok){
            throw new Error('Network response was not ok');
            
        }
        
            const data = await response.json();
            console.log('Success:', data);
            form.reset()
            
    } catch (error) {
        alert('verifique os elementos introduzidos');
        console.error('Erro ao obter dados da encomenda:', error);
    }

});

document.getElementById('redirectButton').addEventListener('click', function() {
    window.location.href = '../funcionario.html'; //
});
