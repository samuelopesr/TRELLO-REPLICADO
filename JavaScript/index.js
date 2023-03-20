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
    
    const opcaoQuadro1 = document.createElement("div");
    opcaoQuadro1.classList.add("opcao-quadro");
    opcaoQuadro1.innerHTML = `
        <img src="">
        <button onclick="criarNovoQuadro('`+links[0]+`')">Selecionar</button>
    `;
    modalDiv.appendChild(opcaoQuadro1);

    const opcaoQuadro2 = document.createElement('div');
    opcaoQuadro2.classList.add("opcao-quadro");
    opcaoQuadro2.innerHTML = `
        <img src="">
        <button onclick="criarNovoQuadro"('`+links[1]+`')">Selcionar</button>
    `;
    modalDiv.appendChild(opcaoQuadro2);

    document.body.appendChild(modalDiv);

}


    
   