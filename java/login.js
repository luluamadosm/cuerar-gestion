document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    if (!loginForm) return;

    // Usuarios de ejemplo (fallback si no hay Firebase)
    const validUsers = [
        { username: 'fabri', password: 'fabri123' },
        { username: 'usuario', password: '12345' }
    ];

    // Helpers
    const getInputValue = () => {
        // intentar selectores comunes: email, text, name=email, name=username, id=email
        const selectors = [
            'input[type="email"]',
            'input[type="text"]',
            'input[name="email"]',
            'input[name="username"]',
            'input[id="email"]',
            'input[id="username"]'
        ];
        for (const sel of selectors) {
            const el = loginForm.querySelector(sel);
            if (el && el.value !== undefined) return el.value.trim();
        }
        return '';
    };

    const getPasswordValue = () => {
        const pw = loginForm.querySelector('input[type="password"]') || loginForm.querySelector('input[name="password"]');
        return pw ? pw.value.trim() : '';
    };

    const isEmailLike = (s) => typeof s === 'string' && s.includes('@');

    const showError = (message) => {
        const old = loginForm.querySelector('.error-message');
        if (old) old.remove();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.marginTop = '10px';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.fontSize = '14px';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.textContent = message;
        loginForm.appendChild(errorDiv);
    };

    // Depuración: mostrar estado inicial de objetos Firebase
    console.debug('login.js: typeof firebase=', typeof firebase, 'typeof auth=', typeof auth, 'typeof db=', typeof db);

    // Comprueba disponibilidad de Firebase de forma segura
    const hasFirebaseCompat = (typeof auth !== 'undefined' && auth && typeof auth.signInWithEmailAndPassword === 'function');
    const hasFirebaseNamespace = (typeof firebase !== 'undefined' && firebase && firebase.auth && typeof firebase.auth === 'function');
    const hasDb = (typeof db !== 'undefined' && db && typeof db.collection === 'function');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // quitar mensaje anterior
        const oldError = loginForm.querySelector('.error-message');
        if (oldError) oldError.remove();

        const identifier = getInputValue();
        const password = getPasswordValue();

        if (!identifier || !password) {
            showError('Por favor ingresa usuario/email y contraseña.');
            return;
        }

        // Si el identificador parece email y hay Firebase, intentar login con Firebase
        if (isEmailLike(identifier) && (hasFirebaseCompat || hasFirebaseNamespace)) {
            try {
                // compat API (auth variable)
                let userCredential;
                if (hasFirebaseCompat) {
                    userCredential = await auth.signInWithEmailAndPassword(identifier, password);
                } else {
                    // namespace firebase.auth()
                    userCredential = await firebase.auth().signInWithEmailAndPassword(identifier, password);
                }

                const user = userCredential.user || (userCredential && userCredential.user) || userCredential;
                let usernameToStore = identifier;

                if (hasDb && user && user.uid) {
                    try {
                        const userDoc = await db.collection('users').doc(user.uid).get();
                        if (userDoc && userDoc.exists) {
                            const userData = userDoc.data();
                            if (userData && userData.username) usernameToStore = userData.username;
                        }
                    } catch (err) {
                        // no bloquear si falla lectura de Firestore
                    }
                }

                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', usernameToStore);
                if (user && user.email) sessionStorage.setItem('email', user.email);

                alert('¡Bienvenido, ' + usernameToStore + '!');
                window.location.href = '../index.html';
                return;
            } catch (error) {
                // firebase error codes
                if (error && (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email')) {
                    showError('Usuario o contraseña incorrectos');
                } else {
                    showError('Error al iniciar sesión');
                }
                return;
            }
        }

        // Si no hay Firebase o el identificador no es email, usar fallback por username local
        const userFound = validUsers.find(user => user.username === identifier && user.password === password);
        if (userFound) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', userFound.username);
            alert('¡Bienvenido, ' + userFound.username + ' a Cuerar, que tengas buen día!');
            window.location.href = '../index.html';
        } else {
            showError('Usuario o contraseña incorrectos');
        }
    });
});