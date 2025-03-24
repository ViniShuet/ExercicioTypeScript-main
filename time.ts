var formTime = document.getElementById("formTime") as HTMLFormElement
var tbTime = document.getElementById("tbTime") as HTMLElement

var times = JSON.parse(localStorage.getItem("times") || "[]")

interface Time{
    id:number,
    nomeTime:String,
    nomeCurto:String
}

// Função para atualizar a tabela de times
function atualizarTabelaTime() {
    tbTime.innerHTML = "";

    times.forEach((t: Time) => {
        tbTime.innerHTML += `
        <tr>
            <td>${t.nomeTime}</td>
            <td>${t.nomeCurto}</td>
            <td>
                <button onclick="editarTime(${t.id})">Editar</button>
                <button onclick="removerTime(${t.id})">Remover</button>
            </td>
        </tr>
        `;
    });
}

function salvarTimeStorage(){
    let timesSalvar = JSON.stringify(times)
    localStorage.setItem("times", timesSalvar)
}

function salvarTime(event:Event){
    //cancela o disparo do envento ao servidor, para a gente tratar no JavaScript
    event?.preventDefault();

    const novoTime : Time = {
        id:Date.now(),
        nomeTime: (document.getElementById("nomeTime") as HTMLInputElement).value,
        nomeCurto: (document.getElementById("nomeCurto") as HTMLInputElement).value
    }
    times.push(novoTime)
    atualizarTabelaTime();
    salvarTimeStorage();
    formTime.reset();
    alert("Cadastrado com sucesso!")

}


function editarTime(id:number){
    //find = busque dentro desse array...
        const time = times.find((p:Time) => p.id == id); 
        //se nao achar nenhum campeonato
        if(!time) 
            return;

        (document.getElementById("nomeTime") as HTMLInputElement).value = time.nomeTime;
        (document.getElementById("nomeCurto") as HTMLInputElement).value = time.nomeCurto;

        //findIndex = busca o index do objeto (dentro da tabela campeonatos, com o id)
        const timeIndex = times.findIndex((p:Time) => p.id == id);

        //validar se encontrou algum item
        //se for diferente, quer dizer que ele encontrou = -1
        if(timeIndex !== -1){
            //se ja tem o mesmo index na lista = remover da lista
            times.splice(timeIndex, 1);
        }

        salvarTimeStorage();
        atualizarTabelaTime();
    }


function removerTime(id: number) {
    const timeIndex = times.findIndex((t: Time) => t.id === id);
    if (timeIndex !== -1) {
        times.splice(timeIndex, 1);
    }

    salvarTimeStorage();
    atualizarTabelaTime();
}

formTime.addEventListener("submit", salvarTime)
atualizarTabelaTime()