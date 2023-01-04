const inputNovaTarefa = document.getElementById('inputNovaTarefa');
const btnAddTarefa = document.getElementById('btnAddTarefa');
const listaTarefas = document.getElementById('listaTarefas');

inputNovaTarefa.addEventListener('keypress', (e) => {
    
    if(e.key === 'Enter'){
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }
        adiconarTarefa(tarefa);
    }
});

btnAddTarefa.addEventListener('click', (e) => {
    
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),
    }
    adiconarTarefa(tarefa);

})

function gerarId(){
    return Math.floor(Math.random() * 3000);
}

function adiconarTarefa(tarefa){

    let li = criarTagLi(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';

}

function criarTagLi(tarefa){

    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);

    return li;

}

function editar(idTarefa){
    alert(idTarefa);
}

function excluir(idTarefa){
    let confirmacao = window.confirm('Tem certeza que deseja excluir ?');

    if(confirmacao){
        let li = document.getElementById('' + idTarefa + '');
        if(li){
            listaTarefas.removeChild(li);
        }
    }

}