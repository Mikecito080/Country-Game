// Importa Firebase y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDDlwzVhlbtZWfN2FEfdeOcPCEmKmU4b8g",
    authDomain: "crud-8a6f6.firebaseapp.com",
    projectId: "crud-8a6f6",
    storageBucket: "crud-8a6f6.firebasestorage.app",
    messagingSenderId: "724512651895",
    appId: "1:724512651895:web:c5e7d2e912bf51aaa9a472"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Variables de juego
const flags = [
  { src: "colombia.png", country: "Colombia", options: ["Colombia", "Vanuatu", "Mozambique", "Nepal"] },
  { src: "brasil.png", country: "Brazil", options: ["Brazil", "Bhutan", "Eswatini", "Togo"] }
];

let currentFlagIndex = 0;
let attempts = 3;

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

function checkAnswer(selectedOption) {
  const message = document.getElementById("message");
  const correctCountry = flags[currentFlagIndex].country;

  if (selectedOption === correctCountry) {
    message.textContent = "¡Correcto!";
    currentFlagIndex = (currentFlagIndex + 1) % flags.length;
    attempts = 3;
    loadFlag();
  } else {
    attempts--;
    if (attempts > 0) {
      message.textContent = `Incorrecto, te quedan ${attempts} intentos.`;
    } else {
      message.textContent = "¡Se acabaron tus intentos!";
      disableGame();
    }
  }
}

function disableGame() {
  document.getElementById("options").innerHTML = "";
}

// Cargar la primera bandera
loadFlag();

// CRUD de usuarios
const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const agregarBtn = document.getElementById("agregar");
const listado = document.getElementById("listado");
const nombreEdit = document.getElementById("nombreEdit");
const emailEdit = document.getElementById("emailEdit");
const guardarBtn = document.getElementById("guardar");
let idEdicion = null;

agregarBtn.addEventListener("click", async () => {
  const nombre = nombreInput.value;
  const email = emailInput.value;

  if (nombre && email) {
    try {
      await addDoc(collection(db, "usuarios"), { nombre, email });
      nombreInput.value = "";
      emailInput.value = "";
      cargarUsuarios();
    } catch (e) {
      console.error("Error agregando usuario: ", e);
    }
  }
});

const cargarUsuarios = async () => {
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  listado.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const usuario = doc.data();
    const li = document.createElement("li");
    li.textContent = `${usuario.nombre} - ${usuario.email}`;
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEditar.addEventListener("click", () => editarUsuario(doc.id, usuario));
    btnEliminar.addEventListener("click", () => eliminarUsuario(doc.id));

    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);
    listado.appendChild(li);
  });
};

const editarUsuario = (id, usuario) => {
  idEdicion = id;
  nombreEdit.value = usuario.nombre;
  emailEdit.value = usuario.email;
};

guardarBtn.addEventListener("click", async () => {
  const nombre = nombreEdit.value;
  const email = emailEdit.value;

  if (nombre && email && idEdicion) {
    try {
      const usuarioRef = doc(db, "usuarios", idEdicion);
      await updateDoc(usuarioRef, { nombre, email });
      nombreEdit.value = "";
      emailEdit.value = "";
      idEdicion = null;
      cargarUsuarios();
    } catch (e) {
      console.error("Error actualizando usuario: ", e);
    }
  }
});

const eliminarUsuario = async (id) => {
  try {
    await deleteDoc(doc(db, "usuarios", id));
    cargarUsuarios();
  } catch (e) {
    console.error("Error eliminando usuario: ", e);
  }
};

cargarUsuarios();
