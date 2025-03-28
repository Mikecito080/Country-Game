import { saveRecord, loadRecords } from "./firebase.js";

// Array de banderas y opciones
const flags = [
  { src: "colombia.png", country: "Colombia", options: ["Colombia", "Vanuatu", "Mozambique", "Nepal", "Kiribati", "Djibouti", "Malta", "Suriname"] },
  { src: "brasil.png", country: "Brazil", options: ["Brazil", "Bhutan", "Eswatini", "Togo", "Tuvalu", "Lesotho", "Zambia", "Andorra"] },
  { src: "kiribati.png", country: "Kiribati", options: ["Kiribati", "Togo", "Tuvalu", "Suriname", "Malta", "Mozambique", "Nepal", "Vanuatu"] },
  { src: "djibouti.png", country: "Djibouti", options: ["Djibouti", "Colombia", "Lesotho", "Zambia", "Andorra", "Bhutan", "Eswatini", "Brazil"] },
  { src: "nepal.png", country: "Nepal", options: ["Nepal", "Malta", "Kiribati", "Mozambique", "Vanuatu", "Djibouti", "Tuvalu", "Suriname"] },
  { src: "vanuatu.png", country: "Vanuatu", options: ["Vanuatu", "Colombia", "Djibouti", "Brazil", "Lesotho", "Bhutan", "Mozambique", "Nepal"] },
  { src: "mozambique.png", country: "Mozambique", options: ["Mozambique", "Nepal", "Kiribati", "Djibouti", "Vanuatu", "Malta", "Tuvalu", "Brazil"] },
  { src: "tuvalu.png", country: "Tuvalu", options: ["Tuvalu", "Suriname", "Djibouti", "Lesotho", "Zambia", "Brazil", "Nepal", "Vanuatu"] }
];

let currentUser = "";
let score = 0;
let currentFlagIndex = 0;
let attempts = 3;

document.getElementById("register").addEventListener("click", () => {
  const usernameInput = document.getElementById("username").value.trim();
  if (usernameInput) {
    currentUser = usernameInput;
    document.getElementById("user-container").style.display = "none";
  } else {
    alert("Por favor, introduce un nombre de usuario.");
  }
});

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
      onGameOver();
    }
  }
}

async function onGameOver() {
  if (currentUser) {
    await saveRecord(currentUser, score);
    loadRecords();
  }
  disableGame();
}

function disableGame() {
  document.getElementById("options").innerHTML = "";
  document.getElementById("flag").src = "";
}

document.addEventListener("DOMContentLoaded", loadRecords);
window.addEventListener("load", loadFlag);