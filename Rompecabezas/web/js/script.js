let puzzleContainer = document.getElementById("puzzle");
let mensaje = document.getElementById("mensaje");

let piezas = [
    {id: 1, url: 'img/00.jpg'},
    {id: 2, url: 'img/01.jpg'},
    {id: 3, url: 'img/02.jpg'},
    {id: 4, url: 'img/03.jpg'},
    {id: 5, url: 'img/10.jpg'},
    {id: 6, url: 'img/11.jpg'},
    {id: 7, url: 'img/12.jpg'},
    {id: 8, url: 'img/13.jpg'},
    {id: 9, url: 'img/20.jpg'},
    {id: 10, url: 'img/21.jpg'},
    {id: 11, url: 'img/22.jpg'},
    {id: 12, url: 'img/23.jpg'},
    {id: 13, url: 'img/30.jpg'},
    {id: 14, url: 'img/31.jpg'},
    {id: 15, url: 'img/32.jpg'},
    {id: '', url: ''}
];

let estado = [];
let temporizadorId;
let tiempoRestante = 50;
let temporizadorElemento;

function mezclar(array) {
    let copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function dibujar() {
    puzzleContainer.innerHTML = "";
    estado.forEach((pieza, i) => {
        let celda = document.createElement("div");
        celda.classList.add("celda");
        if (pieza.id === "") {
            celda.classList.add("vacio");
        } else {
            celda.style.backgroundImage = `url('${pieza.url}')`;
            celda.addEventListener("click", () => mover(i));
        }
        puzzleContainer.appendChild(celda);
    });
}

function mover(indice) {
    let vacio = estado.findIndex(p => p.id === "");
    let filas = 4;
    let col = indice % filas;
    let fila = Math.floor(indice / filas);
    let colVacio = vacio % filas;
    let filaVacio = Math.floor(vacio / filas);
    
    if ((Math.abs(col - colVacio) === 1 && fila === filaVacio) ||
            (Math.abs(fila - filaVacio) === 1 && col === colVacio)) {
        [estado[indice], estado[vacio]] = [estado[vacio], estado[indice]];
        dibujar();
        verificar();
    }
}

function verificar() {
    let esGanador = true;
    for (let i = 0; i < piezas.length; i++) {
        if (estado[i].id !== piezas[i].id) {
            esGanador = false;
            break;
        }
    }
    if (esGanador) {
        clearInterval(temporizadorId);
        mostrarMensaje("🎉 ¡Ganaste!", "¡Felicidades! Has completado el rompecabezas.");
    }
}

function iniciarTemporizador() {
    temporizadorElemento = document.getElementById("temporizador");
    temporizadorId = setInterval(() => {
        tiempoRestante--;
        let minutos = Math.floor(tiempoRestante / 60);
        let segundos = tiempoRestante % 60;
        temporizadorElemento.innerHTML = `⏱️ Tiempo: ${minutos}:${segundos.toString().padStart(2, '0')}`;
        
        if (tiempoRestante <= 10) {
            temporizadorElemento.style.background = 'linear-gradient(135deg, #ff4757, #c44569)';
            temporizadorElemento.style.animation = 'pulse 0.5s infinite';
        }
        
        if (tiempoRestante <= 0) {
            clearInterval(temporizadorId);
            mostrarMensaje("⏰ ¡Tiempo Agotado!", "Se te acabó el tiempo. ¡Inténtalo de nuevo!");
        }
    }, 1000);
}

function mostrarMensaje(titulo, texto) {
    let modalOverlay = document.getElementById("modal-overlay");
    let modalTitle = document.getElementById("modal-title");
    let modalText = document.getElementById("modal-text");
    let restartButton = document.getElementById("modal-restart");
    
    modalTitle.innerHTML = titulo;
    modalText.innerHTML = texto;
    
    restartButton.onclick = () => {
        modalOverlay.style.display = "none";
        reiniciar();
    };
    
    modalOverlay.style.display = "flex";
}

function reiniciar() {
    estado = mezclar(piezas);
    mensaje.innerText = "";
    tiempoRestante = 300;
    clearInterval(temporizadorId);
    
    let temporizadorElemento = document.getElementById("temporizador");
    temporizadorElemento.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
    temporizadorElemento.style.animation = 'pulse 2s infinite';
    
    iniciarTemporizador();
    dibujar();
}

reiniciar();
