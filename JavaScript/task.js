let tarefas = [];
let numTarefas = 0;

function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function criarTarefa() {
  const texto = prompt("Digite o título da tarefa:");
  if (texto) {
    const cor = gerarCorAleatoria();
    const tarefa = document.createElement("div");
    tarefa.classList.add("tarefa");
    tarefa.style.width = "100%";
    tarefa.style.height = "50px";
    tarefa.style.position = "relative";
    tarefa.style.backgroundColor = cor;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "X";
    botaoExcluir.classList.add("btn-excluirTarefa")
    botaoExcluir.addEventListener("click", () => {
      tarefa.remove();
      numTarefas--;
      tarefas = tarefas.filter((q) => q.titulo !== texto);
      salvarTarefas();
    });

    tarefa.appendChild(botaoExcluir); // adicionar botão dentro da tarefa

    const titulo = document.createElement("h2");
    titulo.textContent = texto;

    tarefa.appendChild(titulo); // adicionar título dentro da tarefa

    const container = document.querySelector("#task-diaria");
    container.appendChild(tarefa);

    tarefas.push({ titulo: texto, cor: cor }); // adicionar tarefa ao array "tarefas"
    numTarefas++;

    salvarTarefas();
  }
}

function renderizarTarefas() {
  const container = document.querySelector("#task-diaria");
  container.style.display = "flex";
  container.style.flexDirection = "column";

  tarefas.forEach((tarefaInfo) => {
    const tarefa = document.createElement("div");
    tarefa.classList.add("tarefa");
    tarefa.style.width = "100%";
    tarefa.style.height = "50px";
    tarefa.style.position = "relative"
    tarefa.style.backgroundColor = tarefaInfo.cor;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "X";
    botaoExcluir.addEventListener("click", () => {
      tarefa.remove();
      numTarefas--;
      tarefas = tarefas.filter((q) => q !== tarefaInfo);
      salvarTarefas();
    });

    const titulo = document.createElement("h2");
    titulo.textContent = tarefaInfo.titulo;

    tarefa.appendChild(botaoExcluir);
    tarefa.appendChild(titulo);

    container.appendChild(tarefa);
  });
}

function salvarTarefas() {
  const json = JSON.stringify(tarefas);
  localStorage.setItem("tarefas", json);
}

function carregarTarefas() {
  const tarefasJSON = localStorage.getItem("tarefas");
  if (tarefasJSON) {
    tarefas = JSON.parse(tarefasJSON);
    numTarefas = tarefas.length;
    renderizarTarefas();
  }
}

const botaoCriarTarefa = document.querySelector("#btn-addtask1");
botaoCriarTarefa.addEventListener("click", criarTarefa);

window.addEventListener("load", carregarTarefas);


function excluirTodasTarefas() {
  if (confirm("Tem certeza que deseja excluir todas as tarefas?")) {
    const tasks = document.querySelectorAll(".task");
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].remove();
    }
    numTarefas = 0;
    tarefas.length = 0;
    localStorage.removeItem("tarefas");
  }
}
