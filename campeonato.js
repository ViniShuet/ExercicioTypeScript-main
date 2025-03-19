"use strict";
var formCampeonato = document.getElementById("formCampeonato");
var tabelaCampeonato = document.getElementById("tbCampeonatos");
//parse = passe para JSON
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
//array de campeonatos para armazenar. || = caso nao exista, jogue array vazio
console.log("*** Criacao Interface ***");
function atualizarTabela() {
    tabelaCampeonato.innerHTML = "";
    campeonatos.forEach((c) => {
        tabelaCampeonato.innerHTML += `
        <tr>
            <td>${c.nome}</td>
            <td>${c.categoria}</td>
            <td>${c.tipo}</td>
            <td>${c.dataInicio}</td>
            <td>${c.dataFim}</td>
            <td>
                <button onclick="editarCampeonato(${c.id})"> Editar </button>
                <button onclick="removerCampeonato(${c.id})"> Remover </button>
            </td>
        </tr>
        `;
    });
}
function editarCampeonato(id) {
    //find = busque dentro desse array...
    const campeonato = campeonatos.find((c) => c.id == id);
    //se nao achar nenhum campeonato
    if (!campeonato)
        return;
    document.getElementById("nome").value = campeonato.nome;
    document.getElementById("categoria").value = campeonato.categoria;
    document.getElementById("tipo").value = campeonato.tipo;
    document.getElementById("dataInicio").value = campeonato.dataInicio;
    document.getElementById("dataFim").value = campeonato.dataFim;
    //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const campIndex = campeonatos.findIndex((c) => c.id == id);
    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if (campIndex !== -1) {
        //se ja tem o mesmo index na lista = remover da lista
        campeonatos.splice(campIndex, 1);
    }
    salvarLocalStorage();
    atualizarTabela();
}
function salvarLocalStorage() {
    let campeonatosSalvar = JSON.stringify(campeonatos);
    localStorage.setItem("campeonatos", campeonatosSalvar);
}
function salvar(event) {
    //cancela o disparo do envento ao servidor, para a gente tratar no JavaScript
    event === null || event === void 0 ? void 0 : event.preventDefault();
    const novoCampeonato = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        tipo: document.getElementById("tipo").value,
        dataFim: document.getElementById("dataInicio").value,
        dataInicio: document.getElementById("dataFim").value
    };
    campeonatos.push(novoCampeonato);
    atualizarTabela();
    salvarLocalStorage();
    formCampeonato.reset();
    alert("Cadastrado com sucesso!");
}
formCampeonato.addEventListener("submit", salvar);
atualizarTabela();
