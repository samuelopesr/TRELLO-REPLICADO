function abrirMenu(){
    document.getElementById('menu-abrir-fechar').style.width = "250px";
    document.getElementById('main').style.marginLeft = "250px";
    document.getElementById("btn-abrir").style.display = 'none';
}
function fecharMenu(){
    document.getElementById('menu-abrir-fechar').style.width = "0px";
    document.getElementById('main').style.marginLeft = "0px";
    document.getElementById("btn-abrir").style.display = 'block';
    
}