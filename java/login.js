document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const oldError = document.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }
        
        const email = loginForm.querySelector('input[type="text"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            // Iniciar sesión con Firebase
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Obtener datos del usuario desde Firestore
            const userDoc = await db.collection('users').doc(user.uid).get();
            const userData = userDoc.data();

            // Guardar sesión
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', userData.username);
            sessionStorage.setItem('email', user.email);

            alert('¡Bienvenido, ' + userData.username + '!');
            window.location.href = '../index.html';

        } catch (error) {
            // Mostrar error
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.marginTop = '10px';
            errorDiv.style.textAlign = 'center';
            errorDiv.style.fontSize = '14px';
            
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorDiv.textContent = 'Usuario o contraseña incorrectos';
            } else {
                errorDiv.textContent = 'Error al iniciar sesión';
            }
            
            loginForm.appendChild(errorDiv);
        }
    });
});