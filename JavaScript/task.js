let tarefas = {};
let numTarefas = 0;

function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function mostrarModal() {
  const modalContainer = document.querySelector("#modal-container");
  modalContainer.innerHTML = `
    <div class="modal">
      <input type="text" id="texto-editar" />
      <button id="btn-salvar">Salvar</button>
      <button id="btn-cancelar">Cancelar</button>
    </div>
  `;
  const inputEditar = document.querySelector("#texto-editar");
  const btnSalvar = document.querySelector("#btn-salvar");
  const btnCancelar = document.querySelector("#btn-cancelar");

  btnSalvar.addEventListener("click", () => {
    const novoTexto = inputEditar.value;
    const tarefa = document.querySelector(".tarefa.editando");
    tarefa.querySelector("h2").textContent = novoTexto;
    const tarefaInfo = tarefas.find((t) => t.id === tarefa.id);
    tarefaInfo.titulo = novoTexto;
    salvarTarefas();
    fecharModal();
  });

  btnCancelar.addEventListener("click", () => {
    fecharModal();
  });

  const fecharModal = () => {
    modalContainer.innerHTML = "";
    document.body.classList.remove("modal-aberto");
  };

  inputEditar.value = textoAntigo;
  document.body.classList.add("modal-aberto");
  inputEditar.focus();
}

function editarTarefa(tarefa) {
  const textoAntigo = tarefa.querySelector("h2").textContent;

  tarefa.classList.add("editando");
  mostrarModal(textoAntigo);
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

    const botaoEditar =  document.createElement("button");
    botaoEditar.textContent = "E";
    botaoEditar.classList.add("btn-editarTarefa");
    botaoEditar.addEventListener("click", () => {
    })

    tarefa.appendChild(botaoExcluir);

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
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }
  
  function carregarTarefas() {
  const tarefasSalvas = localStorage.getItem("tarefas");
  
  if (tarefasSalvas) {
  tarefas = JSON.parse(tarefasSalvas);
  numTarefas = Object.keys(tarefas).length;
  renderizarTarefas();
  }
  }
  
  carregarTarefas();