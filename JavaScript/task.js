let quadros = [];
let numQuadros = 0;

function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
function criarQuadro() {
  const texto = prompt("Digite o título do quadro:");
  if (texto) {
    const cor = gerarCorAleatoria();
    const quadro = document.createElement("div");
    quadro.classList.add("quadro");
    quadro.style.width = "210px";
    quadro.style.height = "130px";
    quadro.style.backgroundColor = cor;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir quadro";
    botaoExcluir.addEventListener("click", () => {
      quadro.remove();
      numQuadros--;
      quadros = quadros.filter((q) => q.titulo !== texto);
      salvarQuadros();
    });

    quadro.appendChild(botaoExcluir);

    const titulo = document.createElement("h2");
    titulo.textContent = texto;

    quadro.appendChild(titulo);

    const container = document.querySelector("#criar-quadro");
    container.appendChild(quadro);

    quadros.push({ titulo: texto, cor: cor });
    numQuadros++;

    salvarQuadros();
  }
}

function renderizarQuadros() {
  const container = document.querySelector("#criar-quadro");

  quadros.forEach((quadroInfo) => {
    const quadro = document.createElement("div");
    quadro.classList.add("quadro");
    quadro.style.width = "210px";
    quadro.style.height = "130px";
    quadro.style.backgroundColor = quadroInfo.cor;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir quadro";
    botaoExcluir.addEventListener("click", () => {
      quadro.remove();
      numQuadros--;
      quadros = quadros.filter((q) => q !== quadroInfo);
      salvarQuadros();
    });

    const titulo = document.createElement("h2");
    titulo.textContent = quadroInfo.titulo;

    quadro.appendChild(botaoExcluir);
    quadro.appendChild(titulo);

    container.appendChild(quadro);
  });
}

function salvarQuadros() {
  const json = JSON.stringify(quadros);
  localStorage.setItem("quadros", json);
}

function carregarQuadros() {
  fetch('quadros.json')
    .then((response) => response.json())
    .then((data) => {
      quadros = data;
      numQuadros = quadros.length;
      renderizarQuadros();
    });

  const quadrosJSON = localStorage.getItem("quadros");
  if (quadrosJSON) {
    quadros = JSON.parse(quadrosJSON);
    numQuadros = quadros.length;
    renderizarQuadros();
  }
}

const botaoCriarQuadro = document.querySelector("#criar-novo-quadro");
botaoCriarQuadro.addEventListener("click", criarQuadro);

window.addEventListener("load", carregarQuadros);

function excluirTodosQuadros() {
  if (confirm("Tem certeza que deseja excluir todos os quadros?")) {
    const quadros = document.querySelectorAll(".quadro");
    for (let i = 0; i < quadros.length; i++) {
      quadros[i].remove();
    }
    numQuadros = 0;
    quadros.length = 0; 
    localStorage.clear();
  }
}