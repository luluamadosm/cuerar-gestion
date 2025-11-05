document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.register-form');

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        try {
            // Crear usuario en Firebase Authentication
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Guardar información adicional en Firestore
            await db.collection('users').doc(user.uid).set({
                username: username,
                email: email,
                phone: phone,
                createdAt: new Date()
            });

            // Mensaje de éxito
            alert('¡Ya estás registrado ' + username + ', bienvenido a Cuerar!');
            
            // Redirigir al index
            window.location.href = '../index.html';

        } catch (error) {
            // Manejar errores
            let errorMessage = 'Error al registrar usuario';
            
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Este correo ya está registrado';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'La contraseña debe tener al menos 6 caracteres';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Correo electrónico inválido';
            }
            
            alert(errorMessage);
        }
    });
});