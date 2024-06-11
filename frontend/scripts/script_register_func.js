 async function submitForm(event) {
            event.preventDefault(); 
 	          const form = event.target;
            const formData = new FormData(form);

	      // Impede o envio padrão do formulário
        const password = document.getElementById('register-password').value;
      	const confirmPassword = document.getElementById('confirm-password').value;
	
     
      
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
	
	
	      // Cria um objeto para enviar os dados
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
      
      try {
        const response = await fetch('/register/func', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObj)

        });

	let result = await response.json();
        if (!response.ok) {
          
          alert('Registration failed: ' + result.error);
          return;
        }

        alert('Registration successful!');
        window.location.href = '../funcionario.html';

      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      }
    }