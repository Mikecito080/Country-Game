// Importar Firebase (si usas módulos, agrégalo en tu HTML con type="module")
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDDlwzVhlbtZWfN2FEfdeOcPCEmKmU4b8g",
  authDomain: "crud-8a6f6.firebaseapp.com",
  projectId: "crud-8a6f6",
  storageBucket: "crud-8a6f6.firebasestorage.app",
  messagingSenderId: "724512651895",
  appId: "1:724512651895:web:c5e7d2e912bf51aaa9a472"
  };
  
  // Inicializar Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Función para guardar puntajes en Firestore
  async function saveRecord(username, score) {
    try {
      await db.collection("records").add({
        username: username,
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("Puntaje guardado correctamente");
    } catch (error) {
      console.error("Error al guardar el puntaje:", error);
    }
  }
  
  // Función para obtener el nombre de usuario
  function getUsername() {
    return document.getElementById("username").value.trim();
  }
  
  // Evento para registrar usuario
  document.getElementById("register").addEventListener("click", function () {
    const username = getUsername();
    if (username) {
      console.log("Usuario registrado:", username);
    } else {
      alert("Por favor, ingresa un nombre de usuario.");
    }
  });
  