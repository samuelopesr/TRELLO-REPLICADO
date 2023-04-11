function indIspo()
{
    alert('página indisponível');
}


function diminuirMenu(){
    
    const novaLargura = window.innerWidth  
    const novaAltura = window.innerHeight 

    const viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("menu-lateral",`width=${novaLargura}, height=${novaAltura}`);  

    const menuLateral = document.querySelector("#menu-lateral");
    if (novaLargura >= 769){
        menuLateral.style.overflow = "visible";
    } else {
        menuLateral.style.width = `${novaLargura}px`;
        menuLateral.style.height = `${novaAltura}px`;
        menuLateral.style.overflow = "hidden";
    }

    console.log("a função foi chamada!");

}

const mediaQuery =  window.matchMedia("(min-width: 769px)");
if(mediaQuery.matches){
    diminuirMenu();
}

window.addEventListener("resize", () => {
    if(mediaQuery.matches){
        diminuirMenu();
    }
});


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

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999"; 
    document.body.appendChild(overlay);
    
  
    const modal = document.createElement("div");
    modal.style.height = "600px";
    modal.style.width = "500px";
    modal.style.backgroundColor = "rgb(208, 208, 209)";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%";
    modal.style.textAlign = "center";
    modal.style.borderRadius = "10px";
    modal.style.boxShadow = "1px 2px 6px rgb(143, 142, 142)";

    overlay.appendChild(modal);


    const cor = gerarCorAleatoria();
    const quadro = document.createElement("div");
    quadro.classList.add("quadro");
    quadro.style.width = "210px";
    quadro.style.height = "130px";
    quadro.style.marginLeft = "5px";
    quadro.style.backgroundColor = cor;

    const botaoFechar = document.createElement("button");
    botaoFechar.textContent = "fechar";
    botaoFechar.style.position = "fixed";
    botaoFechar.style.height = "30px";
    botaoFechar.style.width = "60px";
    botaoFechar.style.marginLeft = "70px";
    botaoFechar.addEventListener("click", () => {
      modal.remove();
      overlay.remove();
    });
    

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
    container.style.flexWrap = "wrap";

  

    modal.appendChild(botaoFechar);

    container.appendChild(quadro);

    quadros.push({ titulo: texto, cor: cor });
    numQuadros++;

    salvarQuadros();
  }
}

function renderizarQuadros() {
  const container = document.querySelector("#criar-quadro");
  container.style.flexWrap = "wrap";

  quadros.forEach((quadroInfo) => {
    const quadro = document.createElement("div");
    quadro.classList.add("quadro");
    quadro.style.width = "210px";
    quadro.style.height = "130px";
    quadro.style.marginLeft = "5px";
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


const trello1 = document.querySelector('.trello1');
const trello2 =  document.querySelector('.trello2');


trello1.addEventListener('mouseenter', () => {
    trello1.style.display = "none";
    trello2.style.display = "block";
})

trello2.addEventListener('mouseleave', () => {
    trello1.style.display = 'block';
    trello2.style.display = 'none';
    
})