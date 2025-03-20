"use strict";
var formPartida = document.getElementById("formPartida");
var tabelabPartidas = document.getElementById("tbPartidas");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function carregarCampeonatos() {
    const selectCampeonato = document.getElementById("campeonato");
    selectCampeonato.innerHTML = "";
    campeonatos.forEach((campeonato) => {
        const option = document.createElement("option");
        option.value = campeonato.nome;
        option.textContent = campeonato.nome;
        selectCampeonato.appendChild(option);
    });
}
function editarPartida(id) {
    //find = busque dentro desse array...
    const partida = partidas.find((p) => p.id == id);
    //se nao achar nenhum campeonato
    if (!partida)
        return;
    document.getElementById("timeMandante").value = partida.timeMandante;
    document.getElementById("timeVisitante").value = partida.timeVisitante;
    document.getElementById("campeonato").value = partida.campeonato;
    document.getElementById("dataPartida").value = partida.dataPartida;
    //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const partidaIndex = partidas.findIndex((p) => p.id == id);
    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if (partidaIndex !== -1) {
        //se ja tem o mesmo index na lista = remover da lista
        partidas.splice(partidaIndex, 1);
    }
    salvarPartidaStorage();
    atualizarTabelaPartida();
}
function removerPartida(id) {
    //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const partidaIndex = partidas.findIndex((p) => p.id == id);
    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if (partidaIndex !== -1) {
        //se ja tem o mesmo index na lista = remover da lista
        partidas.splice(partidaIndex, 1);
    }
    salvarPartidaStorage();
    atualizarTabelaPartida();
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
            <td>
                <button onclick="editarPartida(${p.id})"> Editar </button>
                <button onclick="removerPartida(${p.id})"> Remover </button>
            </td>
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
function observarMudancasLocalStorage() {
    window.addEventListener("storage", (event) => {
        if (event.key === "campeonatos") {
            campeonatos = JSON.parse(event.newValue || "[]");
            carregarCampeonatos();
        }
    });
}
carregarCampeonatos();
atualizarTabelaPartida();
observarMudancasLocalStorage();
formPartida.addEventListener("submit", salvarPartida);
