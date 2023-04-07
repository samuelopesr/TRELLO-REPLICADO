function abrirMenu(){
    document.getElementById('menu-abrir-fechar').style.width = "250px";
    document.getElementById("abrirMenu").style.display = 'none';
    document.getElementById("par").style.display = 'none';
    document.getElementById('fav').style.display = 'none';
}
function fecharMenu(){
    document.getElementById('menu-abrir-fechar').style.width = "0px";
    document.getElementById('main').style.marginLeft = "0px";
    document.getElementById("abrirMenu").style.display = 'block';
    document.getElementById("par").style.display = 'block';
    document.getElementById('fav').style.display = 'block';

}

const star1 = document.querySelector('.star1');
const star2 =  document.querySelector('.star2');


star1.addEventListener('mouseenter', () => {
    star1.style.display = "none";
    star2.style.display = "block";
})

star2.addEventListener('mouseleave', () => {
    star1.style.display = 'block';
    star2.style.display = 'none';
})

function abrirJanelaAreaDeTrbalho(){
    document.getElementById('abrir-janela-visivel-area-de-trabalho').style.display = 'block';
    
}
function fecharJanelaAreaDeTrbalho(){
    document.getElementById('abrir-janela-visivel-area-de-trabalho').style.display = 'none';
}

function abrirPopUpQuadro(){
    document.getElementById('pop-up-quadro').style.display = 'block';
}
function fecharPopUpQuadro(){
    document.getElementById('pop-up-quadro').style.display = 'none';
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