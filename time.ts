var formTime = document.getElementById("formTime") as HTMLFormElement
var tbTime = document.getElementById("tbTime") as HTMLElement

var times = JSON.parse(localStorage.getItem("times") || "[]")

interface Time{
    id:number,
    nomeTime:String,
    nomeAbreviadoTime:String
}

function atualizarTabelaTime(){
    tbTime.innerHTML = "";

    times.forEach((t : Time) => {
        tbTime.innerHTML += `
        <tr>
            <td>${t.nomeTime}</td>
            <td>${t.nomeAbreviadoTime}</td>
            <td>
                <button onclick="editarCampeonato(${t.id})"> Editar </button>
                <button onclick="removerCampeonato(${t.id})"> Remover </button>
            </td>
        </tr>
        `;
    });

}

function salvarLocalStorageTime(){
    let timesSalvar = JSON.stringify(times)
    localStorage.setItem("times", timesSalvar)
}

function salvarTime(event:Event){
    //cancela o disparo do envento ao servidor, para a gente tratar no JavaScript
    event?.preventDefault();

    const novoTime : Time = {
        id:Date.now(),
        nomeTime: (document.getElementById("nomeTime") as HTMLInputElement).value,
        nomeAbreviadoTime: (document.getElementById("nomeAbreviadoTime") as HTMLInputElement).value
    }
    campeonatos.push(novoTime)
    atualizarTabelaTime();
    salvarLocalStorageTime();
    formTime.reset();
    alert("Cadastrado com sucesso!")

}

function editarTime(id:number){
    //find = busque dentro desse array...
    const time = times.find((t:Time) => t.id == id); 
    //se nao achar nenhum campeonato
    if(!time) 
        return;

    (document.getElementById("nomeTime") as HTMLInputElement).value = time.nomeTime;
    (document.getElementById("nomeAbreviadoTime") as HTMLInputElement).value = time.nomeAbreviadoTime;

    //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const timeIndex = times.findIndex((t:Time) => t.id == id);

    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if(timeIndex !== -1){
        //se ja tem o mesmo index na lista = remover da lista
        campeonatos.splice(timeIndex, 1);
    }

    salvarLocalStorageTime();
    atualizarTabelaTime();

}

function removerTime(id:number){
    //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
    const timeIndex = times.findIndex((t:Time) => t.id == id);

    //validar se encontrou algum item
    //se for diferente, quer dizer que ele encontrou = -1
    if(timeIndex !== -1){
        //se ja tem o mesmo index na lista = remover da lista
        campeonatos.splice(timeIndex, 1);
    }

    salvarLocalStorageTime();
    atualizarTabelaTime();

}

formTime.addEventListener("submit", salvar)
atualizarTabelaTime()