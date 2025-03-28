// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para guardar datos en Firestore
export async function saveRecord(username, score) {
  try {
    await addDoc(collection(db, "records"), {
      username: username,
      score: score
    });
    console.log("Puntaje guardado correctamente");
  } catch (error) {
    console.error("Error al guardar el puntaje:", error);
  }
}

// Función para cargar y mostrar records
export async function loadRecords() {
  const recordsList = document.getElementById("records");
  recordsList.innerHTML = ""; // Limpiar lista antes de actualizar

  try {
    const q = query(collection(db, "records"), orderBy("score", "desc")); // Ordenar de mayor a menor puntaje
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const record = doc.data();
      const li = document.createElement("li");
      li.textContent = `${record.username}: ${record.score} pts`;
      recordsList.appendChild(li);
    });

  } catch (error) {
    console.error("Error al cargar los records:", error);
  }
}
