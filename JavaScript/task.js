let tarefas = {};
let numTarefas = 0;

function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function criarTarefa(containerId) {
  const texto = prompt("Digite o título da tarefa:");
  if (texto) {
    const cor = gerarCorAleatoria();
    const container = document.querySelector("#" + containerId);

    const tarefa = document.createElement("div");
    tarefa.classList.add("tarefa");
    tarefa.style.width = "100%";
    tarefa.style.height = "50px";
    tarefa.style.backgroundColor = cor;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "X";
    botaoExcluir.classList.add("btn-excluirTarefa");
    botaoExcluir.addEventListener("click", () => {
      tarefa.remove();
      numTarefas--;
      const id = tarefa.dataset.id;
      delete tarefas[id];
      salvarTarefas();
    });
    tarefa.appendChild(botaoExcluir);

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("btnEditar");
    botaoEditar.addEventListener("click", () => {
      console.log("Botão clicado")
    })

    tarefa.appendChild(botaoEditar);

    const titulo = document.createElement("h2");
    titulo.textContent = texto;

    tarefa.appendChild(titulo);

    container.appendChild(tarefa);

    const id = Date.now().toString(); 

    tarefas[id] = { id, titulo: texto, cor: cor, div: containerId };
    numTarefas++;

    salvarTarefas();
    carregarTarefas();
  }
}

const botaoCriarTarefaDiaria = document.querySelector("#btn-addtask1");
botaoCriarTarefaDiaria.addEventListener("click", () => {
  criarTarefa("task-diaria");
});

const botaoCriarTarefaOngoing = document.querySelector("#btn-addtask2");
botaoCriarTarefaOngoing.addEventListener("click", () => {
  criarTarefa("task-ongoing");
});

const botaoCriarTarefaConcluida = document.querySelector("#btn-addtask3");
botaoCriarTarefaConcluida.addEventListener("click", () => {
  criarTarefa("task-concluida");
});

function carregarTarefas() {
  const tarefasJSON = localStorage.getItem("tarefas");
  if (tarefasJSON) {
    try {
      tarefas = JSON.parse(tarefasJSON);
      numTarefas = tarefas.length;
      console.debug(`Tarefas carregadas do localStorage: ${tarefasJSON}`);
    } catch (error) {
      console.error("Erro ao carregar tarefas do localStorage:", error);
    }
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }
  renderizarTarefas();
}

document.addEventListener("DOMContentLoaded", () => {
  carregarTarefas();
  renderizarTarefas();
});

function renderizarTarefas() {
  const containers = document.querySelectorAll(".task-container");

  containers.forEach((container) => {
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.flexDirection = "column";

    Object.values(tarefas).forEach((tarefaInfo) => {
      if (tarefaInfo.div === container.id) {
        const tarefa = document.createElement("div");
        tarefa.classList.add("tarefa");
        tarefa.style.width = "100%";
        tarefa.style.height = "50px";
        tarefa.style.backgroundColor = tarefaInfo.cor;
        tarefa.dataset.id = tarefaInfo.id;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "X";
        botaoExcluir.addEventListener("click", () => {
          tarefa.remove();
          numTarefas--;
          const id = tarefa.dataset.id;
          delete tarefas[id];
          console.debug(`Tarefa com id ${id} removida com sucesso!`);
          console.debug(`Número de tarefas restantes: ${numTarefas}`);
        });


        const titulo = document.createElement("titulo.textContent = tarefaInfo.titulo;")

        tarefa.appendChild(botaoExcluir);
        tarefa.appendChild(titulo);
    
        container.appendChild(tarefa);
      }
    });

  });
}

function salvarTarefas() {
  const json = JSON.stringify(tarefas);
  localStorage.setItem("tarefas", json);
  console.debug("Tarefas salvas no localStorage: ", json);
  carregarTarefas();
}

function excluirTodasTarefas() {
  if (confirm("Tem certeza que deseja excluir todas as tarefas?")) {
  const tasks = document.querySelectorAll(".tarefa");
  for (let i = 0; i < tasks.length; i++) {
  tasks[i].remove();
  numTarefas = 0;
  tarefas.length = 0;
  localStorage.removeItem("tarefas");
  }}

  window.addEventListener("beforeunload", function() {
    salvarTarefas();
  });
}