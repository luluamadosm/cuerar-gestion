// firebase-config.js
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBWtGaQmc78iYfM788WIgjLISow6Y9gK-A",
    authDomain: "cuerar.firebaseapp.com",
    projectId: "cuerar",
    storageBucket: "cuerar.firebasestorage.app",
    messagingSenderId: "508766275777",
    appId: "1:508766275777:web:c7306244df040d8e73ec40"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Exportar referencias
const auth = firebase.auth();
const db = firebase.firestore();