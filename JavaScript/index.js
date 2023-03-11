function indIspo()
{
    alert('página indisponível');
}


function diminuirMenu(){
    
    const novaLargura = window.innerWidth  
    const novaAltura = window.innerHeight 

    const viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("menu-lateral",`width=${novaLargura}, height=${novaAltura}`);

    //verificação da largura da viewport e se é maior que 769px e mostra o conteúdo
    const menuLateral = document.querySelector("#menu-lateral");
    if (novaLargura >= 769){
        menuLateral.style.overflow = "visible";
    } else {
        menuLateral.style.width = `${novaLargura}px`;
        menuLateral.style.height = `${novaAltura}px`;
        menuLateral.style.overflow = "hidden";
    }

    console.log("resizeViewport() foi chamada!");

}

//chama a função diminuirMenu() quando a viewport for maior ou igual a 769px
const mediaQuery =  window.matchMedia("(min-width: 769px)");
if(mediaQuery.matches){
    diminuirMenu();
}

//chama a mesma função quando a viewport é redimensionada e dor maior ou igual a 769px
window.addEventListener("resize", () => {
    if(mediaQuery.matches){
        diminuirMenu();
    }
});