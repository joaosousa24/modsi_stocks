

 async function submitForm(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Acessa os dados do formulário
            const form = event.target;
            const formData = new FormData(form);

            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const nipc = document.getElementById('nipc').value;

            // Validações
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const nipcRegex = /^\d{9}$/;
            if (!nipcRegex.test(nipc)) {
                alert('NIPC deve conter apenas números e possuir exatamente 9 dígitos.');
                return;
            }

            // Cria um objeto para enviar os dados
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataObj)
                });

                const result = await response.json();
                if (!response.ok) {
                    alert('Registration failed: ' + result.error);
                    return;
                }

                alert('Registration successful!');
                window.location.href = '../index.html';

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during registration.');
            }
        }