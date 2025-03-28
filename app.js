// Firebase Configuración
const firebaseConfig = {
  apiKey: "AIzaSyDDlwzVhlbtZWfN2FEfdeOcPCEmKmU4b8g",
  authDomain: "crud-8a6f6.firebaseapp.com",
  projectId: "crud-8a6f6",
  storageBucket: "crud-8a6f6.firebasestorage.app",
  messagingSenderId: "724512651895",
  appId: "1:724512651895:web:c5e7d2e912bf51aaa9a472"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Variables globales
let currentFlagIndex = 0;
let attempts = 3;
let score = 0;
let username = "";

// Función para registrar usuario
const registerButton = document.getElementById("register");
registerButton.addEventListener("click", () => {
  const input = document.getElementById("username");
  if (input.value.trim() !== "") {
    username = input.value.trim();
    alert(`Usuario registrado: ${username}`);
  } else {
    alert("Por favor, ingrese un nombre de usuario.");
  }
});

// Función para cargar una bandera
function loadFlag() {
  const flagElement = document.getElementById("flag");
  const optionsContainer = document.getElementById("options");
  const currentFlag = flags[currentFlagIndex];
  
  flagElement.src = currentFlag.src;
  optionsContainer.innerHTML = "";
  
  currentFlag.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option));
    optionsContainer.appendChild(button);
  });
}

// Función para verificar la respuesta
function checkAnswer(selectedOption) {
  const message = document.getElementById("message");
  const correctCountry = flags[currentFlagIndex].country;

  if (selectedOption === correctCountry) {
    message.textContent = "¡Correcto!";
    score += 10;
    currentFlagIndex = (currentFlagIndex + 1) % flags.length;
    attempts = 3;
    loadFlag();
  } else {
    attempts--;
    if (attempts > 0) {
      message.textContent = `Incorrecto. Te quedan ${attempts} intentos.`;
    } else {
      message.textContent = "¡Se acabaron tus intentos! Fin del juego.";
      saveRecord();
      disableGame();
    }
  }
}

// Función para guardar el record en Firebase
function saveRecord() {
  if (username !== "") {
    db.collection("records").add({
      username: username,
      score: score,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      alert("Record guardado exitosamente.");
    })
    .catch(error => {
      console.error("Error al guardar el record: ", error);
    });
  }
}

// Función para deshabilitar el juego
function disableGame() {
  document.getElementById("options").innerHTML = "";
  document.getElementById("flag").src = "";
}

// Inicializar juego
loadFlag();
