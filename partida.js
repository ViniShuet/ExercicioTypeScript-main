"use strict";
var formPartida = document.getElementById("formPartida");
var tabelabPartidas = document.getElementById("tbPartidas");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
// Função para carregar campeonatos no <select>
function carregarCampeonatos() {
    const selectCampeonato = document.getElementById("campeonato");
    selectCampeonato.innerHTML = ""; // Limpa o select
    campeonatos.forEach((campeonato) => {
        const option = document.createElement("option");
        option.value = campeonato.nome;
        option.textContent = campeonato.nome;
        selectCampeonato.appendChild(option);
    });
}
function atualizarTabelaPartida() {
    tabelabPartidas.innerHTML = "";
    partidas.forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.timeMandante}</td>
            <td>${p.timeVisitante}</td>
            <td>${p.campeonato}</td>
            <td>${p.dataPartida}</td>
        `;
        tabelabPartidas.appendChild(row);
    });
}
function salvarPartidaStorage() {
    localStorage.setItem("partidas", JSON.stringify(partidas));
}
function salvarPartida(event) {
    event.preventDefault();
    const novaPartida = {
        id: Date.now(),
        timeMandante: document.getElementById("timeMandante").value,
        timeVisitante: document.getElementById("timeVisitante").value,
        campeonato: document.getElementById("campeonato").value,
        dataPartida: document.getElementById("dataPartida").value
    };
    partidas.push(novaPartida);
    salvarPartidaStorage();
    atualizarTabelaPartida();
    formPartida.reset();
    alert("Cadastrado com sucesso!");
}
// Função para observar mudanças no localStorage
function observarMudancasLocalStorage() {
    window.addEventListener("storage", (event) => {
        if (event.key === "campeonatos") {
            campeonatos = JSON.parse(event.newValue || "[]");
            carregarCampeonatos(); // Atualiza o <select> de campeonatos
        }
    });
}
// Carrega os campeonatos ao iniciar
carregarCampeonatos();
// Atualiza a tabela de partidas ao iniciar
atualizarTabelaPartida();
// Observa mudanças no localStorage
observarMudancasLocalStorage();
// Adiciona o evento de submit ao formulário
formPartida.addEventListener("submit", salvarPartida);
