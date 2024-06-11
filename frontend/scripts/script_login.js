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
if(window.location.pathname=='/index.html' || window.location.pathname=='/details.html'){
document.getElementById('login-form').addEventListener('submit', async function(event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
    
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password}),
        });

	let result = await response.json();
        if (!response.ok) {
          
          alert('Registration failed: ' + result.error);
          return;
        }

        //alert('Login Sucesso');
        alert(result.message);
       // 
       if(getCookie('user_id')){
        window.location.href = '../index.html';
        
       }
       else if(getCookie('func')){
        window.location.href = '../funcionario.html';
       }

      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
      }
    });
  }
checkLoginStatus();

	 function checkLoginStatus() {
        fetch('/loginstatus')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            const loginButton = document.getElementById('login-button');
            const logoutButton = document.getElementById('logout-button');
            const client_bt = document.getElementById('client-button');
            logginstatus=data.loggedIn;
    if (data.loggedIn) {
      window.log_state=1;
		loginButton.style="display: none;";
		logoutButton.style="display: active;";
    client_bt.style="display: active;";
            } else {
              window.log_state=0;
		loginButton.style="display: active;";
		logoutButton.style="display: none;";
		client_bt.style="display: none;";
     if(window.location.pathname=='/purchase.html' || window.location.pathname=='/client.html' || window.location.pathname=='/funcionario.html'||window.location.pathname=='/gestao.html'||window.location.pathname=='/gestao_fornecedores.html'){
                window.location.href = '../index.html';
              }
           }
          })
}	
	

async function logout_f(){

    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const client_bt = document.getElementById('client-button');
    
    loginButton.style="display: active;";
		logoutButton.style="display: none;";
    client_bt.style="display: none;";
    if(window.location.pathname=='/purchase.html' || window.location.href=='../client.html' || window.location.href=='../funcionario.html'||window.location.pathname=='/gestao.html'|| window.location.pathname=='/gestao_fornecedores.html'){
      window.location.href = '../index.html';
    }
    
    try {
      const response_2 = await fetch('/loginstatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logout: true}),
      });
      if(response_2){
        window.location.href = 'index.html';
      }

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
}

    
