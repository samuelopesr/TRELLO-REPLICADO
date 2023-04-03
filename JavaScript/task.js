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
    tarefa.setAttribute("draggable", "true");


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

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";
    botaoEditar.classList.add("btnEditar");
    let isDivCentroOpen = false;
    botaoEditar.addEventListener("click", () => {

  if (!isDivCentroOpen) {
    isDivCentroOpen = true;
    botaoEditar.disabled = true;

  const divCentro = document.createElement("div");
  divCentro.style.background = "#19233d9a";
  divCentro.style.boxShadow = "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )";
  divCentro.style.backdropFilter = "blur( 10px )";
  divCentro.style.border = "border: 1px solid rgba( 255, 255, 255, 0.18 )";
  divCentro.style.borderRadius = "10px"
  divCentro.style.position = "fixed";
  divCentro.style.height = "90vh";
  divCentro.style.width = "80vw";
  divCentro.style.top = "50%";
  divCentro.style.left = "50%";
  divCentro.style.transform = "translate(-50%, -50%)";
  
  const btnCriarInput = document.createElement("button");
  btnCriarInput.textContent = "Criar Atividade";
  btnCriarInput.style.marginLeft = "20px";
  btnCriarInput.style.marginTop = "25px";
  btnCriarInput.addEventListener("click", criarAtividade)

  function closeDivCentro() {
    if (isDivCentroOpen) {
      isDivCentroOpen = false;
      document.body.removeChild(divCentro);
      botaoEditar.disabled = false;
    }
  }
//codigo base de exemplo -- inicio
let atividade = [];
let numAtividade = 0;

function criarAtividade(){
  const tituloH2 = prompt("digite o titulo da atividade:")

    const atividades = document.createElement("div");
    atividades.style.display = "block";
    atividades.style.height = "none";
    atividades.style.width = "100vw";

    const inputTexto = document.createElement("textarea")
  inputTexto.style.display = "flex";
  inputTexto.style.position = "relative";
  inputTexto.style.width = "65vw";
  inputTexto.style.height = "95px";
  inputTexto.style.resize = "none";
  inputTexto.style.marginLeft = "40px";
  inputTexto.addEventListener("input", () => {
    inputTexto.style.height = "auto";
    inputTexto.style.height = `${inputTexto.scrollHeight}px`;
  });
  inputTexto.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      inputTexto.value += "\n";
    }
  });

const mainTitle =  document.createElement("h2");
  mainTitle.textContent = tituloH2;
  mainTitle.style.position = "relative";
  mainTitle.style.marginLeft = "38%";
  mainTitle.style.fontSize = "0.9em";
  mainTitle.style.color = "white";
  mainTitle.style.marginBottom = "10px";

  const btnRemoveInput = document.createElement("button");
  btnRemoveInput.textContent = "Remover Atividade";
  btnRemoveInput.style.marginLeft = "25px";
  btnRemoveInput.style.marginTop = "25px";
  btnRemoveInput.addEventListener("click", () =>{
       atividade.remove();
       numAtividade--;
  })

    atividades.appendChild(mainTitle);
    atividades.appendChild(inputTexto);
    atividades.appendChild(btnRemoveInput);
    atividade.push(atividades);
    divCentro.appendChild(atividades);

    numAtividade++;

}
//codigo base de exemplo -- final

  const titulo = document.createElement("h1");
  titulo.textContent = texto;
  titulo.style.textAlign = "center";
  titulo.style.fontSize = "1.6em";
  titulo.style.color = "white";
  titulo.style.marginTop = "20px";

  const btnFechar =  document.createElement("button");
  btnFechar.textContent = "X";
  btnFechar.style.float = "right";
  btnFechar.style.margin = "10px";
  btnFechar.style.cursor = "pointer";
  btnFechar.addEventListener("click", closeDivCentro)

  document.body.appendChild(divCentro);

  divCentro.appendChild(btnFechar);

  divCentro.appendChild(titulo);

  divCentro.appendChild(btnCriarInput);

  }



});
  
    tarefa.appendChild(botaoExcluir);
 
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


        const titulo = document.createElement("h2");
        titulo.textContent = tarefaInfo.titulo;

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