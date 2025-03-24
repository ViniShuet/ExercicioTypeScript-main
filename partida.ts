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

function editarPartida(id:number){
//find = busque dentro desse array...
    const partida = partidas.find((p:Partida) => p.id == id); 
    //se nao achar nenhum campeonato
    if(!partida) 
        return;

    (document.getElementById("timeMandante") as HTMLInputElement).value = partida.timeMandante;
    (document.getElementById("timeVisitante") as HTMLInputElement).value = partida.timeVisitante;
    (document.getElementById("campeonato") as HTMLSelectElement).value = partida.campeonato;
    (document.getElementById("dataPartida") as HTMLInputElement).value = partida.dataPartida;

    //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const partidaIndex = partidas.findIndex((p:Partida) => p.id == id);

    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if(partidaIndex !== -1){
        //se ja tem o mesmo index na lista = remover da lista
        partidas.splice(partidaIndex, 1);
    }

    salvarPartidaStorage();
    atualizarTabelaPartida();
}

function removerPartida(id:number){
       //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const partidaIndex = partidas.findIndex((p:Partida) => p.id == id);

    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if(partidaIndex !== -1){
        //se ja tem o mesmo index na lista = remover da lista
        partidas.splice(partidaIndex, 1);
    }

    salvarPartidaStorage();
    atualizarTabelaPartida();
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