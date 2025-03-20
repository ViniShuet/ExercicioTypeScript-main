var formPartida = document.getElementById("formPartida") as HTMLFormElement;
var tabelabPartidas = document.getElementById("tbPartidas") as HTMLTableSectionElement;
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");

interface Partida {
    id: number;
    timeMandante: string;
    timeVisitante: string;
    campeonato: string;
    dataPartida: string;
}


function carregarCampeonatos() {
    const selectCampeonato = document.getElementById("campeonato") as HTMLSelectElement;
    selectCampeonato.innerHTML = ""; 

    campeonatos.forEach((campeonato: { nome: string }) => {
        const option = document.createElement("option");
        option.value = campeonato.nome;
        option.textContent = campeonato.nome;
        selectCampeonato.appendChild(option);
    });
}

function atualizarTabelaPartida() {
    tabelabPartidas.innerHTML = "";

    partidas.forEach((p: Partida) => {
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

function salvarPartida(event: Event) {
    event.preventDefault();

    const novaPartida: Partida = {
        id: Date.now(),
        timeMandante: (document.getElementById("timeMandante") as HTMLInputElement).value,
        timeVisitante: (document.getElementById("timeVisitante") as HTMLInputElement).value,
        campeonato: (document.getElementById("campeonato") as HTMLSelectElement).value,
        dataPartida: (document.getElementById("dataPartida") as HTMLInputElement).value
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