function abrirMenu(){
    document.getElementById('menu-abrir-fechar').style.width = "250px";
    document.getElementById('main').style.marginLeft = "250px";
    document.getElementById("abrirMenu").style.display = 'none';
}
function fecharMenu(){
    document.getElementById('menu-abrir-fechar').style.width = "0px";
    document.getElementById('main').style.marginLeft = "0px";
    document.getElementById("abrirMenu").style.display = 'block';

}