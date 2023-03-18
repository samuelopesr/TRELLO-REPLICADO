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

const jsonURL = "links.json"

const maxQuadros = 50;

let links = []

function carregarLinks(){
    fetch(jsonURL)
    .then(response => response.json())
    .then(data => {
        link = data;
    })
    .catch(error => {
        console.log('erro ao carregar o arquio JSON', error)
    }
    );
}

function criarQuadro(){
    if(document.querySelectorAll('.quadro').length >= maxQuadros){
        alert('Número máximo de quadros atingido');
        return;
    }

    const quadroDiv = document.createElement('div');
    quadroDiv.classList.add('quadro');
    quadro

    let excluirQuadroBtn = document.createElement('button');
    excluirQuadroBtn.innerText = 'Excluir quadro';
    excluirQuadroBtn.onclick = function(){
        quadroDiv.remove();
    }
    quadroDiv.appendChild(excluirQuadroBtn);

    let corRandom = Math.floor(Math.random()*16777215).toString(16);
    quadroDiv.style.backgroundColor = '#' + corRandom;

    let criarQuadroDiv = document.getElementById('criar-quadro');
    criarQuadroDiv.insertBefore(quadroDiv, criarQuadroDiv.firstChild);

    let link = "https://www.google.com";
    window.open(link, '_blank');
}