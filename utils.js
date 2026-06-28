function generarAleatorio (min,max){
    let random=Math.random();//0-1
    let numero = random*(max-min); //0-max   0-595
    let numeroEntero = parseInt(numero);
    numeroEntero= numeroEntero + min; //5-600
    return numeroEntero
}