let cartasDestapadas = 0;
let temporizador = false;
let pares = 0;
let timerInicial = 200;
let timer = 200;
let puntaje = 0;
let movimientos = 0;
let mostrarTiempo = document.getElementById('restante');
let mostrarPuntaje = document.getElementById('puntaje');
let mostrarMovimientos = document.getElementById('movimientos');




let winAudio = new Audio("/sound/playagain.mp3");
let loseAudio = new Audio('/sound/incorrecto.wav');
let clickAudio = new Audio("/sound/click.wav");
let rightAudio = new Audio("/sound/correcto.wav");
let wrongAudio = new Audio('/sound/incorrecto.wav');



let numeros =[1,1,2,2,3,3,4,4,5,5,9,9,7,7,8,8];
numeros = numeros.sort(function(){return Math.random() -0.3})

for (let i = 0; i <= 15; i++) {
    let tarjeta = document.getElementById(i);
    tarjeta.innerHTML = `<img src="/resource/img/animalito/${numeros[i]}.png" alt=" ">`;
    tarjeta.disabled = true;

    }
    
setTimeout(() => {
    
    for (let i = 0; i <= 15; i++) {
        let cartillas = document.getElementById(i);
        cartillas.innerHTML = ' ';
        cartillas.disabled = false;

    }
    contarTiempo();

}, 5000);


function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (pares<8) {
        timer--;
        }else{
        mostrarTiempo.innerHTML = `¡fantastico! tardaste solo: ${timerInicial - timer} segundos`;

        }
        if(timer < 0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas(numeros);
            loseAudio.play();
        }
    }, 1000, timer);    
}

function bloquearTarjetas(numeros){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="/resource/img/animalito/${numeros[i]}.png" alt=" ">`;
        tarjetaBloqueada.disabled = true;
    }
}

function girar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    if (cartasDestapadas ==0){
        //mostrar numero
        let card1 = document.getElementById(id);
        primeraEleccion = numeros[id];
        card1.innerHTML = `<img src="/resource/img/animalito/${primeraEleccion}.png" alt=" ">`;
        clickAudio.play();
        //dehabilitar boton
        card1.disabled = true;
        cartasDestapadas++;

        primerId = id;     

    }else if (cartasDestapadas == 1){
        //mostrar numero
        let card2 = document.getElementById(id);
        segundaEleccion = numeros[id];
        card2.innerHTML = `<img src="/resource/img/animalito/${segundaEleccion}.png" alt=" ">`;
        //dehabilitar boton
        card2.disabled = true;
        cartasDestapadas++;

        segundoId = id;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primeraEleccion == segundaEleccion){
            cartasDestapadas = 0;
            pares++;
            puntaje++;
            mostrarPuntaje.innerHTML = `puntaje: ${puntaje}`;
            rightAudio.play();
        }else{
            wrongAudio.play();
            setTimeout(() =>{ 
            card1 = document.getElementById(primerId);
            card2 = document.getElementById(segundoId);
            card1.innerHTML = ' ';
            card2.innerHTML = ' ';
            card1.disabled = false;
            card2.disabled = false;
            cartasDestapadas = 0;
            },500)

        }
    }

    if (pares == 8){
        winAudio.play();
        updateScoreUser();
        clearInterval(tiempoRegresivo);
        mostrarPuntaje.innerHTML = `puntaje: ${puntaje}`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    }

}
