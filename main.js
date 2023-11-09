const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarImg = document.querySelector('.app__card-primary-butto-icon');
const musicaFocoInput = document.querySelector('#alternar-musica');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;
musica.volume = 0.5;
let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;
const musicaStart = new Audio('./sons/play.wav');
const musicaPause = new Audio('./sons/pause.mp3');
const musicaBeep = new Audio('./sons/beep.mp3');


function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? 
            <strong class="app__title-strong"> Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML =
                `
            Horra de voltar à superfície.
            <strong class="app__title-strong"> Faça uma pausa longa</strong>
            `
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        musicaBeep.play();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

function iniciarOuPausar() {
    if (intervaloID) {
        zerar();
        musicaPause.play();
        return;
    }
    musicaStart.play();
    intervaloID = setInterval(contagemRegressiva, 1000); // chama contagemRegressiva a cada 1 segundo
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarImg.setAttribute('src', './imagens/pause.png');

}

startPauseBt.addEventListener('click', iniciarOuPausar);

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function zerar() {
    clearInterval(intervaloID);
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarImg.setAttribute('src', './imagens/play_arrow.png');
    intervaloID = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000); //vira segundos e formato Date
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML =
        `
    ${tempoFormatado}
    `
}
mostrarTempo();




focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 5*60;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 15*60;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})
// focoBt.addEventListener('click', ()=>{
//     html.setAttribute('data-contexto','foco');
//     banner.setAttribute('src','./imagens/foco.png');
// })

// curtoBt.addEventListener('click', ()=>{
//     html.setAttribute('data-contexto','descanso-curto');
//     banner.setAttribute('src','./imagens/descanso-curto.png');
// })

// longoBt.addEventListener('click', ()=>{
//     html.setAttribute('data-contexto','descanso-longo');
//     banner.setAttribute('src','./imagens/descanso-longo.png');
// })


