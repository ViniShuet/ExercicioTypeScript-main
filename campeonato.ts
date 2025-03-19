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

    campeonatos.forEach((c : Campeonato) => {
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

function editarCampeonato(id:number){
    //find = busque dentro desse array...
    const campeonato = campeonatos.find((c:Campeonato) => c.id == id); 
    //se nao achar nenhum campeonato
    if(!campeonato) 
        return;

    (document.getElementById("nome") as HTMLInputElement).value = campeonato.nome;
    (document.getElementById("categoria") as HTMLSelectElement).value = campeonato.categoria;
    (document.getElementById("tipo") as HTMLSelectElement).value = campeonato.tipo;
    (document.getElementById("dataInicio") as HTMLInputElement).value = campeonato.dataInicio;
    (document.getElementById("dataFim") as HTMLInputElement).value = campeonato.dataFim;

    //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const campIndex = campeonatos.findIndex((c:Campeonato) => c.id == id);

    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if(campIndex !== -1){
        //se ja tem o mesmo index na lista = remover da lista
        campeonatos.splice(campIndex, 1);
    }

    salvarLocalStorage();
    atualizarTabela();

}

function removerCampeonato(id:number){
     //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
     const campIndex = campeonatos.findIndex((c:Campeonato) => c.id == id);

     //validar se encontrou algum item
     //se for diferente, quer dizer que ele encontrou = -1
     if(campIndex !== -1){
         //se ja tem o mesmo index na lista = remover da lista
         campeonatos.splice(campIndex, 1);
     }
 
     salvarLocalStorage();
     atualizarTabela();
}

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
        categoria: (document.getElementById("categoria") as HTMLSelectElement).value,
        tipo:(document.getElementById("tipo") as HTMLSelectElement).value,
        dataFim: (document.getElementById("dataInicio") as HTMLInputElement).value,
        dataInicio:(document.getElementById("dataFim") as HTMLInputElement).value
    }
    campeonatos.push(novoCampeonato)
    atualizarTabela();
    salvarLocalStorage();
    formCampeonato.reset();
    alert("Cadastrado com sucesso!")

}

formCampeonato.addEventListener("submit", salvar)
atualizarTabela()