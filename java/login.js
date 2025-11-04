document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    
    // Usuarios de ejemplo
    const validUsers = [
        { username: 'fabri', password: 'fabri123' },
        { username: 'usuario', password: '12345' }
    ];

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Eliminar mensaje de error anterior si existe
        const oldError = document.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }
        
        const username = loginForm.querySelector('input[type="text"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value;

        // Validar credenciales
        const userFound = validUsers.find(user => 
            user.username === username && user.password === password
        );

        if (userFound) {
            // Login exitoso
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            alert('¡ Bienvenido, ' + username + ' a Cuerar,que tengas Buen dia !');
            window.location.href = '../index.html';
        } else {
            // Login fallido - Crear mensaje de error
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.marginTop = '10px';
            errorDiv.style.textAlign = 'center';
            errorDiv.style.fontSize = '14px';
            errorDiv.textContent = 'Usuario o contraseña incorrectos';
            
            loginForm.appendChild(errorDiv);
        }
    });
});