const html = document.querySelector("html");

const focoBt = document.querySelector(".app__card-button--foco");
const descansoCurtoBt = document.querySelector(".app__card-button--curto");
const descansoLongoBt = document.querySelector(".app__card-button--longo");
const startBt = document.querySelector("#start-pause");
const modeButton = document.querySelectorAll(".app__card-button");

const titulo = document.querySelector(".app__title");
const imagem = document.querySelector(".app__image");
const timer = document.querySelector("#timer");
const startBtText = startBt.lastElementChild;
const startBtImg = startBt.firstElementChild;

const music = new Audio("./sons/luna-rise-part-one.mp3");
const musicInput = document.querySelector("#alternar-musica");
const iniciarAudio = new Audio("./sons/play.wav");
const pausarAudio = new Audio("./sons/pause.mp3");
const finalizarAudio = new Audio("./sons/beep.mp3");
iniciarAudio.volume = 0.25;
pausarAudio.volume = 0.25;
finalizarAudio.volume = 0.25;

focoBt.addEventListener("click", foco);
descansoCurtoBt.addEventListener("click", descansoCurto);
descansoLongoBt.addEventListener("click", descansoLongo);
musicInput.addEventListener("click", playMusic);
startBt.addEventListener("click", iniciar);

var tempoSegundos = 1500;
mostrarTempo(tempoSegundos);
var intervalId = null;

function foco() {
    html.setAttribute("data-contexto", "foco");
    titulo.innerHTML = `<h1 class="app__title">
    Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>
</h1>`;
    imagem.setAttribute("src", "/imagens/foco.png");
    zerar();
    tempoSegundos = 1500;
    mostrarTempo(tempoSegundos);
    ativar(focoBt);
};

function descansoCurto() {
    html.setAttribute("data-contexto", "descanso-curto");
    titulo.innerHTML = `<h1 class="app__title">
    Que tal dar uma respirada?<br>
    <strong class="app__title-strong">Faça uma pausa curta!</strong>
</h1>`;
    imagem.setAttribute("src", "/imagens/descanso-curto.png");
    zerar();
    tempoSegundos = 3;
    mostrarTempo(tempoSegundos);
    ativar(descansoCurtoBt);
};

function descansoLongo() {
    html.setAttribute("data-contexto", "descanso-longo");
    titulo.innerHTML = `<h1 class="app__title">
    Hora de voltar à superfície.<br>
    <strong class="app__title-strong">Faça uma pausa longa.</strong>
</h1>`;
    imagem.setAttribute("src", "/imagens/descanso-longo.png");
    zerar();
    tempoSegundos = 900;
    mostrarTempo(tempoSegundos);
    ativar(descansoLongoBt);
};

function ativar(item) {
    modeButton.forEach(button => button.classList.remove("active"));
    item.classList.add("active");
};

function playMusic(){
    if(music.paused) {
        music.play();
    } else {
        music.pause();
    };
    music.loop = true;
    music.volume = 0.5;
};

function contagemRegressiva() {
    if (tempoSegundos <= 0){
        finalizarAudio.play();
        zerar();
        return
    };
    tempoSegundos -= 1;
    mostrarTempo(tempoSegundos)
};

function iniciar() {
    if(intervalId) {
        pausarAudio.play();
        zerar();
        return
    };
    iniciarAudio.play();
    intervalId = setInterval(contagemRegressiva, 1000);

    if (startBtText.textContent == "Iniciar") {
        startBtText.textContent = "Pausar";
        startBtImg.setAttribute("src", "/imagens/pause.png");
    } else {
        startBtText.textContent = "Iniciar";
        startBtImg.setAttribute("src", "/imagens/play_arrow.png");
    };
};

function zerar(){
    clearInterval(intervalId);
    intervalId = null;
    startBtText.textContent = "Iniciar";
    startBtImg.setAttribute("src", "/imagens/play_arrow.png");
};

function mostrarTempo(item){
    const tempo = new Date(item * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: '2-digit', second: '2-digit'});
    timer.textContent = tempoFormatado;
};