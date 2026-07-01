let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 40;
let ALTURA_PERSONAJE = 75;
let ANCHO_PERSONAJE = 40;
const ANCHO_LIMON = 40;
const ALTO_LIMON = 40;

let personajeX = canvas.width / 2;
let personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
let limonX = canvas.width / 2;
let limonY = 0;
let puntaje = 0;
let vidas = 3;
let velocidadCaida = 200;
let intervalo;

// Cargar imagen del limón
let imagenLimon = new Image();
imagenLimon.src = "limon.png";

function iniciar() {
    clearInterval(intervalo);
    intervalo = setInterval(bajarLimon, velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
    mostrarEnSpan("txtPuntaje", puntaje);
    mostrarEnSpan("txtVidas", vidas);
}

function dibujarSuelo() {
    ctx.fillStyle = "green";
    ctx.fillRect(
        0,
        canvas.height - ALTURA_SUELO,
        canvas.width,
        ALTURA_SUELO
    );
}

function dibujarPersonaje() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
        personajeX,
        personajeY,                        
        ANCHO_PERSONAJE,
        ALTURA_PERSONAJE
    );
}

function moverIzquierda() {
    personajeX = personajeX - 10;

    if (personajeX < 0) {
        personajeX = 0;
    }

    actualizarPantalla();
}

function moverDerecha() {
    personajeX = personajeX + 10;

    if (personajeX > canvas.width - ANCHO_PERSONAJE) {
        personajeX = canvas.width - ANCHO_PERSONAJE;
    }

    actualizarPantalla();
}

function actualizarPantalla() {
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarLimon() {
    // Dibujar la imagen del limón si está cargada
    if (imagenLimon.complete) {
        ctx.drawImage(imagenLimon, limonX, limonY, ANCHO_LIMON, ALTO_LIMON);
    } else {
        // Fallback: dibujar un cuadrado si la imagen no está cargada
        ctx.fillStyle = "yellow";
        ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTO_LIMON);
    }
}

function bajarLimon() {
    limonY = limonY + 10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado() {
    if (
        limonX + ANCHO_LIMON > personajeX &&
        limonX < personajeX + ANCHO_PERSONAJE &&
        limonY + ALTO_LIMON > personajeY &&
        limonY < personajeY + ALTURA_PERSONAJE
    ) {
        aparecerLimon();

        puntaje++;
        mostrarEnSpan("txtPuntaje", puntaje);

        if (puntaje == 3) {
            velocidadCaida = 150;
            clearInterval(intervalo);
            intervalo = setInterval(bajarLimon, velocidadCaida);
        }

        if (puntaje == 6) {
            velocidadCaida = 100;
            clearInterval(intervalo);
            intervalo = setInterval(bajarLimon, velocidadCaida);
        }

        if (puntaje == 10) {
            clearInterval(intervalo);
            alert("GANADOR! Atrapaste los limones, ahora haz una buena limonada");
        }
    }
}

function aparecerLimon() {
    limonX = generarAleatorio( 0,canvas.width - ANCHO_LIMON
    );
    limonY = 0;
    actualizarPantalla();
}

function detectarPiso() {
    if (limonY + ALTO_LIMON >= canvas.height - ALTURA_SUELO) {
        aparecerLimon();
        vidas--;
        mostrarEnSpan("txtVidas", vidas);
        if (vidas == 0) {
            clearInterval(intervalo);
            alert("PERDISTE");
        }
    }
}

function reiniciar() {
    clearInterval(intervalo);
    vidas = 3;
    puntaje = 0;
    velocidadCaida = 200;
    personajeX = canvas.width / 2;
    personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
    limonX = canvas.width / 2;
    limonY = 0;

    mostrarEnSpan("txtVidas", vidas);
    mostrarEnSpan("txtPuntaje", puntaje);
    iniciar();
}

function desaparcerPersonaje(){
    ALTURA_PERSONAJE = 0;
    ANCHO_PERSONAJE = 0;
    ctx.clearRect(0,0,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}