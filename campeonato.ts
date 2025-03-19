var formCampeonato = document.getElementById("formCampeonato") as HTMLFormElement
var tabelaCampeonato = document.getElementById("tbCampeonatos") as HTMLElement

//parse = passe para JSON
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]")
//array de campeonatos para armazenar. || = caso nao exista, jogue array vazio

console.log("*** Criacao Interface ***")
interface Campeonato {
    id:number
    nome:string;
    categoria:string;
    tipo:string;
    dataInicio:string;
    dataFim:string;
}

function atualizarTabela(){
    tabelaCampeonato.innerHTML = "";

    campeonatos.forEach(c => {
        tabelaCampeonato.innerHTML += `
        <tr>
            <td>${c.nome}</td>
            <td>${c.categoria}</td>
            <td>${c.tipo}</td>
            <td>${c.dataInicio}</td>
            <td>${c.dataFim}</td>
        </tr>
        `
    });

   
}

//teste

function salvarLocalStorage(){
    let campeonatosSalvar = JSON.stringify(campeonatos)
    localStorage.setItem("campeonatos", campeonatosSalvar)
}

function salvar(event:Event){
    //cancela o disparo do envento ao servidor, para a gente tratar no JavaScript
    event?.preventDefault();

    const novoCampeonato : Campeonato = {
        id:Date.now(),
        nome: (document.getElementById("nome") as HTMLInputElement).value,
        categoria:"profissional",
        tipo:"Pontos corridos",
        dataFim:"2025-10-30",
        dataInicio:"2025-04-01"
    }
    campeonatos.push(novoCampeonato)
    atualizarTabela()
    salvarLocalStorage()

}

formCampeonato.addEventListener("submit", salvar)
atualizarTabela()