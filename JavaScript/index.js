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




var modal = document.getElementById("quadro-modal");


var btn = document.getElementById("criar-quadro-btn");


var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const jsonURL = "links.json";

const maxQuadros = 50;

let links = []

function carregarLinks(){
    fetch(jsonURL)
    .then(response => response.json())
    .then(data => {
        links = data;
    })
    .catch(error => {
        console.log('erro ao carregar o arquio JSON', error)
    }
    );
}

function criarQuadro(){
    if(document.querySelectorAll(".quadro").length >= maxQuadros){
        console.log('Número máximo de quadros atingido');
        return;
    }

    const modalDiv = document.createElement('div');
    modalDiv.classList.add("modal");
    
    const titulo = document.createElement('h2');
    titulo.innerText = "Novo Quadro";
    quadroDiv.appendChild(titulo);

    const excluirQuadroBtn = document.createElement("button");
    excluirQuadroBtn.innerText = "Excluir quadro";
    excluirQuadroBtn.onclick = function () {
        quadroDiv.remove();
    };
    quadroDiv.appendChild(excluirQuadroBtn);

    const link = document.createElement('a');
    link.href = links[0];
    link.target = "_blank";
    link.innerText = "Clique aqui para acessar o link";
    quadroDiv.appendChild(link);

    const corRandom = Math.floor(Math.random() * 16777215).toString(16);
    quadroDiv.style.backgroundColor = "#" + corRandom;

    const quadrosDiv = document.getElementById("criar-quadro");
    quadrosDiv.insertBefore(quadroDiv, quadrosDiv.firstChild);
}

window.onload = function () {
    carregarLinks();
}
    
    