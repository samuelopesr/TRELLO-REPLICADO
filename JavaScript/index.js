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




let numQuadros = 0;

function criarQuadro() {

  if (numQuadros >= 50) {
    alert("Limite de quadros atingido!");
    return;
  }
  
  
  const quadro = document.createElement("div");
  quadro.classList.add("quadro");
  quadro.style.width = "210px";
  quadro.style.height = "130px";
  
  
  const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "Excluir quadro";
  botaoExcluir.addEventListener("click", () => {
    quadro.remove();
    numQuadros--;
  });
  
 
  const texto = document.createElement("h2");
  texto.textContent = "Novo quadro";
  

  quadro.appendChild(botaoExcluir);
  quadro.appendChild(texto);
  
 
  const container = document.querySelector("#criar-quadro");
  container.appendChild(quadro);
  

  numQuadros++;
}


const botaoCriarQuadro = document.querySelector("#criar-novo-quadro");
botaoCriarQuadro.addEventListener("click", criarQuadro);



    
   