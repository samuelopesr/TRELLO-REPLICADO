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

function carregarQuadros() {
  const quadrosJSON = localStorage.getItem("quadros");
  if (quadrosJSON) {
    quadros = JSON.parse(quadrosJSON);
  }
}

carregarQuadros();

let numQuadros = 0;
let quadro = []

function criarQuadro() {

  if (numQuadros >= 50) {
    alert("Limite de quadros atingido!");
    return;
  }
  
  
  const quadro = document.createElement("div");
  quadro.classList.add("quadro");
  quadro.style.width = "210px";
  quadro.style.height = "130px";
  const cor = gerarCorAleatoria();
  quadro.style.backgroundColor = cor;
  
  const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "Excluir quadro";
  botaoExcluir.addEventListener("click", () => {
    quadro.remove();
    numQuadros--;
    const index = quadros.findIndex((q) => q.cor === cor);
    quadros.splice(index, 1);
    salvarQuadros();
  });
  
 
  const texto = document.createElement("h2");
  texto.textContent = "Novo quadro";
  const titulo = prompt("Digite o título do quadro:");
  if (!titulo) return;
  texto.textContent = titulo;
  

  quadro.appendChild(botaoExcluir);
  quadro.appendChild(texto);
  
 
  const container = document.querySelector("#criar-quadro");
  container.appendChild(quadro);
  

  numQuadros++;

  const quadroInfo = {
    cor: quadro.style.backgroundColor,
    texto: texto.textContent,
  };
  quadro.push(quadroInfo);

  const novoQuadro = {
    titulo,
    cor,
  };

  quadros.push(novoQuadro);
  numQuadros++;

  localStorage.setItem("quadros", JSON.stringify(quadro));

  salvarQuadros();

}



function carregarQuadros() {

    fetch('quadros.json')
    .then(response => response.json())
    .then(data => {
      quadros = data;
      numQuadros = quadros.length;
      renderizarQuadros();
    });
    
    const quadrosJSON = localStorage.getItem("quadros");
    if (quadrosJSON) {
      
      quadros = JSON.parse(quadrosJSON);
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
          
          quadro = quadro.filter((q) => q !== quadroInfo);
          localStorage.setItem("quadros", JSON.stringify(quadro));
        });
  
        const texto = document.createElement("h2");
        texto.textContent = quadroInfo.texto;
  
        quadro.appendChild(botaoExcluir);
        quadro.appendChild(texto);
  
        const container = document.querySelector("#criar-quadro");
        container.appendChild(quadro);
  
        numQuadros++;
      });
    }
  }

  function renderizarQuadros() {
    const container = document.querySelector("#criar-quadro");
  
    for (let i = 0; i < quadros.length; i++) {
      const quadro = document.createElement("div");
      quadro.classList.add("quadro");
      quadro.style.width = "210px";
      quadro.style.height = "130px";
      quadro.style.backgroundColor = quadros[i].cor;
  
      const botaoExcluir = document.createElement("button");
      botaoExcluir.textContent = "Excluir quadro";
      botaoExcluir.addEventListener("click", () => {
        quadro.remove();
        numQuadros--;
        quadros.splice(i, 1);
        salvarQuadros();
      });
  
      const texto = document.createElement("h2");
      texto.textContent = quadros[i].titulo;
  
      quadro.appendChild(botaoExcluir);
      quadro.appendChild(texto);
  
      container.appendChild(quadro);
    }
  }

  function salvarQuadros() {
    const json = JSON.stringify(quadros);
    fetch('quadros.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    });
  }

function excluirTodosQuadros() {
    if (confirm("Tem certeza que deseja excluir todos os quadros?")) {
      const quadros = document.querySelectorAll(".quadro");
      for (let i = 0; i < quadros.length; i++) {
        quadros[i].remove();
      }
      numQuadros = 0;
      quadros = [];
      localStorage.removeItem("quadros")
    }
  }

function gerarCorAleatoria() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

const botaoCriarQuadro = document.querySelector("#criar-novo-quadro");
botaoCriarQuadro.addEventListener("click", criarQuadro);

window.addEventListener("load", carregarQuadros);



    
   