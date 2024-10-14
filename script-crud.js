const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const btnCancelarTarefa = document.querySelector(".app__form-footer__button--cancel");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const listaTarefa = document.querySelector(".app__section-task-list");

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

btnAdicionarTarefa.addEventListener("click", adicionarTarefa);
btnCancelarTarefa.addEventListener("click", cancelarTarefa);
formAdicionarTarefa.addEventListener("submit", submitTarefa);

function submitTarefa(event) {
    event.preventDefault();
    const tarefa = {
        descricao: textarea.value
    };
    tarefas.push(tarefa);
    atualizarTarefas();
    const elementoTarefa = criarNovoElemento(tarefa);
    listaTarefa.append(elementoTarefa);
    textarea.value = "";
    adicionarTarefa();
};
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function adicionarTarefa() {
    formAdicionarTarefa.classList.toggle("hidden");
}

function criarNovoElemento(tarefa) {
    const li = document.createElement('li');
    li.classList.add("app__section-task-list-item");

    const svg = document.createElement('svg');
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`;
    
    const p = document.createElement('p');
    p.classList.add("app__section-task-list-item-description");
    p.textContent = tarefa.descricao;

    const button = document.createElement('button');
    button.classList.add("app_button-edit");
    
    button.onclick = () => {
        const novaTarefa = prompt("Qual é o novo nome da tarefa?");
        if(novaTarefa) {
        p.textContent = novaTarefa;
        tarefa.descricao = novaTarefa;
        atualizarTarefas();
        };
    };
    const img = document.createElement('img');
    img.setAttribute("src", "/imagens/edit.png");

    button.append(img);
    li.append(svg);
    li.append(p);
    li.append(button);

    return li;
}

tarefas.forEach ((tarefa) => {
    const elemetoTarefa = criarNovoElemento(tarefa);
    listaTarefa.append(elemetoTarefa);
})

function cancelarTarefa() {
    textarea.value = "";
    adicionarTarefa();
}