const html = document.querySelector('html');
const focoButton = document.querySelector('.app__card-button--foco ');
const shortRest = document.querySelector('.app__card-button--curto');
const longRest = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const appTitle = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const musicButton = document.querySelector('#alternar-musica');
const startButton = document.querySelector('#start-pause');
const startPauseButton = document.querySelector('#start-pause span');
const startPauseButtonImg = document.querySelector('#start-pause img');
const timer = document.getElementById('timer');

const music = new Audio('/sons/luna-rise-part-one.mp3');
music.loop = true;

const beep = new Audio('/sons/beep.mp3');
beep.volume = 0.25;

const start = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');

const timeSecSec = 1500;
let timeSec = timeSecSec;
let idInterval = null;

musicButton.addEventListener('change', () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
})

focoButton.addEventListener('click', () => {
    timeSec = 1500;
    changeContext('foco');
    focoButton.classList.add('active');
})

shortRest.addEventListener('click', () => {
    timeSec = 300;
    changeContext('descanso-curto');
    shortRest.classList.add('active');
})

longRest.addEventListener('click', () => {
    timeSec = 900;
    changeContext('descanso-longo');
    longRest.classList.add('active');
})

function changeContext(contexto) {
    showTime();
    buttons.forEach((contexto) => {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            appTitle.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;
        case "descanso-curto":
            appTitle.innerHTML = `Que tal dar uma respirada<br><strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            appTitle.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong" > 
            Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const count = () => {
    if (timeSec <= 0) {
        toZero()
        timeSec = timeSecSec;
        beep.play();
        startPauseButton.textContent = "Começar";
        showTime();
        startPauseButtonImg.setAttribute('src', `/imagens/play_arrow.png`);
        alert('Tempo esgotado!');
        return;
    }
    timeSec -= 1;
    showTime ();
}

startButton.addEventListener('click', iniciar);

function iniciar() {
    if(timeSec == 5){
        start.play();
        startPauseButton.textContent = "Pausar";
        startPauseButtonImg.setAttribute('src', `/imagens/pause.png`);
    } else {
        pause.play();
        startPauseButton.textContent = "Começar";
        startPauseButtonImg.setAttribute('src', `/imagens/play_arrow.png`);
    }

    if (idInterval != null) {
        toZero();
        return;
    }
    idInterval = setInterval(count, 1000);
    startPauseButton.textContent = "Pausar";
    startPauseButtonImg.setAttribute('src', `/imagens/pause.png`);
}

function toZero() {
    clearInterval(idInterval);
    idInterval = null;
}

function showTime() {
    const time = new Date(timeSec * 1000);
    const formactTime = time.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${formactTime}`;
}

showTime();