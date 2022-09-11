//Arreglo que contiene las palabras para jugar
let arrayPalabras =["PERRO", "GATO", "CABALLO","ELEFANTE", "CEBRA", "OVEJA","ARDILLA", "BALLENA", "COCODRILO", "CERDO", "DINOSAOURIO", "DRAGON","GALLINA", "GALLO", "POLLITO","LOBO", "MAPACHE", "RATON","PALOMA", "PEZ", "TIBURON", "TIGRE", "UNICORNIO", "VACA","ZORRO"];
//Arreglo que contiene las ayudas de cada palabra


let opciones = ["PERRO", "LINCE", "CABALLO",
                    "MAMUT", "CEBRA", "OVEJA",
                    "ARDILLA", "CACHALOTE", "CAIMAN",
                    "CERDO", "IGUANA", "MURCIELAGO",
                    "POLLITO", "GALLO", "GALLO",
                    "LOBO", "PANDA", "RATON",
                    "CANARIO", "SALMON", "CACHALOTE",
                    "JAGUAR", "UNICORNIO", "CHIVO",
                    "HIENA"
];
let  opciones1=["COYOTE", "GATO", "CEBRA",
                    "ELEFANTE", "CABALLO", "CABRA",
                    "RATON", "TUBURON", "LAGARTO",
                    "JAVALI", "LAGARTIJA", "DRAGON",
                    "POLLO", "GALLINA", "GALLINA",
                    "PERRO", "ARDILLA", "RATA",
                    "COLIBRI", "PEZ", "TIBURON",
                    "TIGRE", "CABALLO", "VACA",
                    "COYOTE"
        ]
let opciones2=["LOBO", "TIGRILLO", "BURRO",
                    "RINOCERONTE", "CABRA", "BORREGO",
                    "CUY", "BALLENA", "COCODRILO",
                    "CHANCHO", "DINOSAOURIO", "GODZILLA",
                    "GALLINA", "POLLITO", "POLLITO",
                    "ZORRO", "MAPACHE", "ROEDOR",
                    "PALOMA", "ATUN", "BALLENA",
                    "CHITA", "VENADO", "TORO",
                    "ZORRO"
        ]
let imegenes=["Dog.png","cat.png","horse.png","elephant.png","zebra.png","sheep.png","squirrel.png","whale.png","crocodile.png","pig.png","dinosaur.png","drogon.png","chicken.png","rooster.png","chick.png","wolf.png","raccoon.png","mause.png","dove.png","fish.png","shark.png","tiger.png","unicorn.png","cow.png","fox.png" ]


//variable que guarda la cantidad de palabras ya jugadas
let cantPalabrasJugadas = 0;

//Variable que guarda la cantidad de intentos restantes
let intentosRestantes = 5;

//variable que guarda el indice de la Palabra actual
let posActual = 0;

let arrayPalabraActual = [];

//Cantidad de de letras acertadas por cada jugada
let cantidadAcertadas = 0;

//Arreglo que guarda cada letra en divs
let divsPalabraActual = [];

//Cantidad de palabras que debe acertar en cada jugada.
let totalQueDebeAcertar;


let wrongAudio = new Audio('/resource/sound/incorrecto.wav');
let winAudio = new Audio("/resource/sound/playagain.mp3");

function comenzarJuego(){
    //reseteamos las variables
    posActual = 0;
    //activamos las pantallas necesarias
    document.getElementById("inicial").style.display = "none";
    document.getElementById("juego").style.display = "block";
    cargarNuevaPalabra();

}

//Funcion que carga la  palabra nueva para jugar
function cargarNuevaPalabra(){
    //Aumento en uno cantidad e palabras jugadas y controlo si llego a su limite
    cantPalabrasJugadas ++;
    if(cantPalabrasJugadas>25){
        //volvemos a cargar el arreglo
        arrayPalabras =["PERRO", "GATO", "CABALLO",
                    "ELEFANTE", "CEBRA", "OVEJA",
                    "ARDILLA", "BALLENA", "COCODRILO",
                    "CERDO", "DINOSAOURIO", "DRAGON",
                    "GALLINA", "GALLO", "POLLITO",
                    "LOBO", "MAPACHE", "RATON",
                    "PALOMA", "PEZ", "TIBURON",
                    "TIGRE", "UNICORNIO", "VACA",
                    "ZORRO"];

        opciones=["PERRO", "LINCE", "CABALLO",
                    "MAMUT", "CEBRA", "OVEJA",
                    "ARDILLA", "CACHALOTE", "CAIMAN",
                    "CERDO", "IGUANA", "MURCIELAGO",
                    "POLLITO", "GALLO", "GALLO",
                    "LOBO", "PANDA", "RATON",
                    "CANARIO", "SALMON", "CACHALOTE",
                    "JAGUAR", "UNICORNIO", "CHIVO",
                    "HIENA"
        ]
        opciones1=["COYOTE", "GATO", "CEBRA",
                    "ELEFANTE", "CABALLO", "CABRA",
                    "RATON", "TUBURON", "LAGARTO",
                    "JAVALI", "LAGARTIJA", "DRAGON",
                    "POLLO", "GALLINA", "GALLINA",
                    "PERRO", "ARDILLA", "RATA",
                    "COLIBRI", "PEZ", "TIBURON",
                    "TIGRE", "CABALLO", "VACA",
                    "COYOTE"
        ];
        opciones2=["LOBO", "TIGRILLO", "BURRO",
                    "RINOCERONTE", "CABRA", "BORREGO",
                    "CUY", "BALLENA", "COCODRILO",
                    "CHANCHO", "DINOSAOURIO", "GODZILLA",
                    "GALLINA", "POLLITO", "POLLITO",
                    "ZORRO", "MAPACHE", "ROEDOR",
                    "PALOMA", "ATUN", "BALLENA",
                    "CHITA", "VENADO", "TORO",
                    "ZORRO"
        ];
        imegenes=["Dog.png","cat.png","horse.png","elephant.png","zebra.png","sheep.png","squirrel.png","whale.png","crocodile.png","pig.png","dinosaur.png","drogon.png","chicken.png","rooster.png","chick.png","wolf.png","raccoon.png","mause.png","dove.png","fish.png","shark.png","tiger.png","unicorn.png","cow.png","fox.png" ]

        
    }




    //Selecciono una posicion random
    posActual = Math.floor(Math.random()*arrayPalabras.length);



    //Tomamos la palabra nueva
    let palabra = arrayPalabras[posActual];
    totalQueDebeAcertar = palabra.length;
    cantidadAcertadas = 0;




    //Guardamos la palabra que esta en formato string en un arreglo
    arrayPalabraActual = palabra.split('');

    //limpiamos los contenedores que quedaron cargadas con la palabra anterior
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    //Cargamos la cantidad de divs (letras) que tiene la palabra
    for(i=0;i<palabra.length;i++){
        var divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    //Selecciono todos los divs de la palabra
    divsPalabraActual = document.getElementsByClassName("letra");

    //setemos los intentos
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;

    //Cargamos la ayuda de la pregunta
    //document.getElementById("ayuda").innerHTML = ayudas[posActual];

    document.getElementById("opcion").innerHTML = opciones[posActual];

    document.getElementById("opcion1").innerHTML = opciones1[posActual];

    document.getElementById("opcion2").innerHTML = opciones2[posActual];

    document.getElementById("imagen").src = "/resource/img/animals/" + imegenes[posActual];

   //elimino el elemento ya seleccionado del arreglo.
    //splice(posActual,1): A partir de la posicon posActual elimino 1 elemento
    arrayPalabras.splice(posActual,1);
    //ayudas.splice(posActual,1);
    opciones.splice(posActual,1);
    opciones1.splice(posActual,1);
    opciones2.splice(posActual,1);
    imegenes.splice(posActual,1);


}

//Llamada para cargar la primera palabra del juego
cargarNuevaPalabra();


//Detecto la tecla que el usuario presion
document.addEventListener("keydown", event => {
    //Controlo si la tecla presionada es una letra
    if(isLetter(event.key)){
        //Tomo las letras ya ingresadas hasta el momento
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        letrasIngresadas = letrasIngresadas.split('');
        //controlo si la letra presionada ya ha sido ingresada

        if(letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1){
            //variable bandera para saber si la letra ingresada esta en la palabra a descrubir
            let acerto = false;

            //Recorro el arreglo que ocntiene la palabra para verificar si la palabra ingresada esta
            for(i=0;i<arrayPalabraActual.length;i++){
                if(arrayPalabraActual[i] == event.key.toUpperCase()){//acertó
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true;
                    //Aumento en uno la cantidad de letras acertadas
                    cantidadAcertadas = cantidadAcertadas + 1;
                }
            }



            //Controlo si acerto al menos una letra
            if(acerto==true){
                //controlamos si ya acerto todas
                if(totalQueDebeAcertar == cantidadAcertadas){
                    //asigno a cada div de la palabra la clase pintar para ponerlo en COLOR cada div y reprodicuimos el audio
                    for(i=0;i<arrayPalabraActual.length;i++){
                        divsPalabraActual[i].className="letra pintar";
                        winAudio.play();
                        //cargarNuevaPalabra();
                        //terminarJuego();
                        
                        
                    }
                    updateScoreUser();                    
                }
            }else{
                //No acerto, decremento los intentos restantes
                intentosRestantes = intentosRestantes - 1;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                //controlamos si ya acabo todas la oportunidades
                if(intentosRestantes<=0){
                    for(i=0;i<arrayPalabraActual.length;i++){
                        divsPalabraActual[i].className="letra pintarError";
                         wrongAudio.play();
                         cargarNuevaPalabra();
                         //setTimeout(cargarNuevaPalabra(), 10000);

                    }
                }
            }


            //agrega la letra ingresada a las letras ya ingresadas que se visualizan
            document.getElementById("letrasIngresadas").innerHTML += event.key.toLocaleUpperCase() + " - ";

        }
    }
});

//Funcion que me determina si un caracter es una letra
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function terminarJuego(){
    //ocultamos las pantallas y mostramos la pantalla final
    document.getElementById("juego").style.display = "none";
    document.getElementById("final").style.display = "block";
 }

 function volverAlInicio(){
    //ocultamos las pantallas y activamos la inicial
    document.getElementById("final").style.display = "none";
    document.getElementById("inicial").style.display = "block";
    document.getElementById("juego").style.display = "none";
}