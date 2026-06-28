let canvas= document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO =40;
const ALTURA_PERSONAJE =60;
const ANCHO_PERSONAJE = 40;
const ANCHO_LIMON = 20;
const ALTO_LIMON = 20;

let personajeX=canvas.width/2;
personajeY= canvas.height-(ALTURA_SUELO + ALTURA_PERSONAJE)
let limonX=canvas.width/2;
let limonY=0;

function iniciar(){
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}
function dibujarSuelo(){
    ctx.fillStyle="green";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);

}

function dibujarPersonaje(){
    ctx.fillStyle = "yellow";
    ctx.fillRect(personajeX,(personajeY),ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();


}

//Mover dereha 

function moverDerecha(){
    personajeX=personajeX+10 ;
    actualizarPantalla();

}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){  
    ctx.fillStyle = "pink";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTO_LIMON);
    detectarColision();
}

function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
}

function detectarColision(){
    if (limonX + ANCHO_LIMON > personajeX &&
        limonX < personajeX + ANCHO_PERSONAJE &&
        limonY + ALTO_LIMON > personajeY &&
        limonY < personajeY + ALTURA_PERSONAJE){

        //alert("ATRAPADO!");
        aparecerLimon();

    }
}

function probarAleatorio (){
    let aleatorio = generarAleatorio(10,80);
    console.log(aleatorio);
}

function aparecerLimon (){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}