/*
ACA TODOS LOS QUERY SELECTOR
*/

const cartasArray = [
    // Cartas con valor 01
    "src/cartas/celeste_01.png",
    "src/cartas/verde_01.png",
    "src/cartas/rosa_01.png",
    "src/cartas/dorado_01.png",
    
    // Cartas con valor 02
    "src/cartas/celeste_02.png",
    "src/cartas/verde_02.png",
    "src/cartas/rosa_02.png",
    "src/cartas/dorado_02.png",
    
    // Cartas con valor 03
    "src/cartas/celeste_03.png",
    "src/cartas/verde_03.png",
    "src/cartas/rosa_03.png",
    "src/cartas/dorado_03.png",
    
    // Cartas con valor 04
    "src/cartas/celeste_04.png",
    "src/cartas/verde_04.png",
    "src/cartas/rosa_04.png",
    "src/cartas/dorado_04.png",
    
    // Cartas con valor 05
    "src/cartas/celeste_05.png",
    "src/cartas/verde_05.png",
    "src/cartas/rosa_05.png",
    "src/cartas/dorado_05.png",
    
    // Cartas con valor 06
    "src/cartas/celeste_06.png",
    "src/cartas/verde_06.png",
    "src/cartas/rosa_06.png",
    "src/cartas/dorado_06.png",
    
    // Cartas con valor 07
    "src/cartas/celeste_07.png",
    "src/cartas/verde_07.png",
    "src/cartas/rosa_07.png",
    "src/cartas/dorado_07.png",
    
    // Cartas con valor 10
    "src/cartas/celeste_10.png",
    "src/cartas/verde_10.png",
    "src/cartas/rosa_10.png",
    "src/cartas/dorado_10.png",
    
    // Cartas con valor 11
    "src/cartas/celeste_11.png",
    "src/cartas/verde_11.png",
    "src/cartas/rosa_11.png",
    "src/cartas/dorado_11.png",
    
    // Cartas con valor 12
    "src/cartas/celeste_12.png",
    "src/cartas/verde_12.png",
    "src/cartas/rosa_12.png",
    "src/cartas/dorado_12.png"
];

let cartasHechasObjeto = [];

// Recorrer el array y generar los objetos
for (let i = 0; i < cartasArray.length; i++) {
    // Extraer el valor numérico de la carta a partir del nombre del archivo
    let valorCarta = parseInt(cartasArray[i].match(/\d+/)[0]);
/*comentario
Se utiliza el método match(/\d+/) para extraer el valor numérico de la carta directamente 
desde el nombre del archivo (e.g., "src/cartas/celeste_01.png" -> 01).

El valor numérico se convierte en un número entero con parseInt.
*/
    // Crear el objeto para cada carta
    cartasHechasObjeto.push({
        imagen: cartasArray[i],
        valorCarta: valorCarta,
        valorPuntos: valorCarta,
        jugador: false,      // Inicialmente no la tiene el jugador
        disponibleRepartir: true,    // Por defecto disponibles todas
        disponibleTirar: false,        //todavia ninguna carta fue repartida y asignada
        ordenAsignado: null,    // Van de 1 a 3, para saber que carta selecciona el jugador
        seleccionada: false, // Inicialmente no seleccionada
        utilizada: false     // Inicialmente no utilizada en el turno
    });    
}
for (let i = 0; i < 11; i++){
    cartasHechasObjeto[i+26].valorPuntos = 10; // hago que todos los 10, 11 y 12s, valgan 10 pts
}

let cartasJugador = [];//para ir poniendo las cartas que le toca al jugador
let cartasCPU = [];//para ir poniendo las cartas que le toca al CPU

let apuestaJugador = 0; //5-10-15
let apuestaCPU = 0;    //5-10-15

// En esta columna suceden las instancias de juego
let columna_dos = document.querySelector('#columna_2'); 
let columna_tres = document.querySelector('#columna_3');

let div_tirar = document.querySelector('#div_tirar');


let instanciaDeJuego = 0;

let cartasRepartidas = 0;

// Función para actualizar la interfaz según la instancia del juego
function cambiarInstancia() {
    switch (instanciaDeJuego) {
        case 0: // Para jugar
            columna_dos.innerHTML = `
            <button id="btn-jugar">Jugar</button>
            <button id="btn-instrucciones">Instrucciones</button>`;
            document.querySelector('#btn-jugar').addEventListener('click', funcion_btn_jugar);
            document.querySelector('#btn-instrucciones').addEventListener('click', funcion_btn_instrucciones);
            //guardarEstadoPartida();
            break;
        case 1: // Para repartir
            columna_dos.innerHTML = '<button id="btn-repartir">Repartir</button>';
            document.querySelector('#btn-repartir').addEventListener('click', funcion_btn_repartir);
            //guardarEstadoPartida();
            break;
        case 2: // Elegir apuesta viendo tus tres cartas

            columna_dos.innerHTML = `<div>
                <img src="${buscarParaDibujarCarta(true,1)}" alt ="Carta 1 del Jugador"></img>
                <img src="${buscarParaDibujarCarta(true,2)}" alt ="Carta 1 del Jugador"></img>
                <img src="${buscarParaDibujarCarta(true,3)}" alt ="Carta 1 del Jugador"></img>

                </div>
                <div id="apostar">
                    <h3>Selecciona un monto a apostar: </h3>
                    <div>
                        <button id="btn-apuesta-5">5</button>
                        <button id="btn-apuesta-10">10</button>
                        <button id="btn-apuesta-15">15</button>
                    </div>
                </div>`


            document.querySelector('#btn-apuesta-5').addEventListener('click', funcion_btn_apuesta_5);
            document.querySelector('#btn-apuesta-10').addEventListener('click', funcion_btn_apuesta_10);
            document.querySelector('#btn-apuesta-15').addEventListener('click', funcion_btn_apuesta_15);
            //guardarEstadoPartida();
            break;
        case 3: // Seleccionar carta a tirar
            columna_dos.innerHTML = `
            <div>
                <img src="src/cartas/atras_carta.png" alt="carta 1 de CPU">
                <img src="src/cartas/atras_carta.png" alt="carta 2 de CPU">
                <img src="src/cartas/atras_carta.png" alt="carta 3 de CPU"> 
             
            </div>
            <div id="espacio_mesa"></div>
            
            <div>
            <button class = "btn-carta" id = "carta_uno_jugador"> <img src="${buscarParaDibujarCarta(true,1)}" alt ="Carta 1 del Jugador"></img></button>
            <button class = "btn-carta" id = "carta_dos_jugador"> <img src="${buscarParaDibujarCarta(true,2)}" alt ="Carta 2 del Jugador"></img></button>
            <button class = "btn-carta" id = "carta_tres_jugador"> <img src="${buscarParaDibujarCarta(true,3)}" alt ="Carta 3 del Jugador"></img></button>

            </div>
            <div id ='div_tirar'>
            <button class="btn-tirar">Tirar</button>
            </div>
            `
            columna_tres.innerHTML = `<p>Pts. en juego: ${apuestaJugador+apuestaCPU}</p> `;
            document.querySelector('.btn-tirar').addEventListener('click', funcion_btn_tirar);
            document.querySelectorAll('.btn-carta').addEventListener('focus', funcion_activar_btn_tirar);
            break;
            guardarEstadoPartida();
        case 4: // Cierre de juego
            columna_dos.innerHTML = '<p>Fin del juego. ¡Gracias por jugar!</p>';
            //guardarEstadoPartida();
            break;
        case 5: // Pedir nombre para el top
            columna_dos.innerHTML = '<p>Introduce tu nombre para el ranking: </p>';
            //guardarEstadoPartida();
            break;
        case 6: //instrucciones de carta
            columna_dos.innerHTML = `
            <h3>Instrucciones</h3>
            <ul>
            <li>Se juega con una baraja española de 40 cartas. Las cartas numéricas (del 1 al 7) valen su número en puntos. Las figuras (sota, caballo y rey) valen 10 puntos cada una. </li>
            <li>Al iniciar un nuevo turno, cada jugador recibe 3 cartas al azar del mazo y debe decidir la cantidad de puntos a apostar. Puede apostar 5, 10 o 15 puntos.</li>
            <li>El turno tiene 3 rondas. En cada ronda los jugadores tiran una carta y gana la ronda quien haya tirado la carta de mayor valor. En la siguiente ronda se repite la mecánica con las cartas restantes. En la tercera ronda se repite la mecánica con la última carta que tiene cada jugador. </li>
            <li>Al finalizar el turno, el jugador que haya ganado más rondas suma los puntos apostados por ambos jugadores. Si hay empate en el turno, los puntos se dividen entre los dos jugadores. </li>
            <li>Cuando finaliza el turno se debe verificar si alguno de los jugadores ganó el juego al alcanzar o superar los 50 puntos. Si un jugador gana, se termina el juego y se puede iniciar un nuevo juego.</li>
            <li>Si al finalizar el turno ningún jugador alcanzó los 50 puntos, se juega un nuevo turno.</li>
            <li>Si al finalizar el turno ambos jugadores están empatados, se juega un nuevo turno.</li>
            <li>Al registrar el récord ganador se debe contar la cantidad de puntos finales y la cantidad de turnos en los que logró ganar. Es el mejor récord aquel que se logra en la menor cantidad de turnos.</li>
            </ul>
            `;
            columna_tres.innerHTML = `
            <button id="btn-jugar">Jugar</button>   
            `;
            document.querySelector('#btn-jugar').addEventListener('click', funcion_btn_jugar);
            //guardarEstadoPartida();
            break;
        default:
            break;
    }
}

/*LOCAL Y SESSION STORAGE ACTUALIZAR
// Guardar datos en sessionStorage
function guardarEstadoPartida() {
    let estadoPartida = {
        cartasJugador: cartasJugador,
        cartasCPU: cartasCPU,
        apuestaJugador: apuestaJugador,
        apuestaCPU: apuestaCPU,
        instanciaDeJuego: instanciaDeJuego
    };
    sessionStorage.setItem('estadoPartida', JSON.stringify(estadoPartida));
}

// Restaurar el estado desde sessionStorage
function restaurarEstadoPartida() {
    const estadoGuardado = sessionStorage.getItem('estadoPartida');
    if (estadoGuardado) {
        const estadoPartida = JSON.parse(estadoGuardado);
        cartasJugador = estadoPartida.cartasJugador;
        cartasCPU = estadoPartida.cartasCPU;
        apuestaJugador = estadoPartida.apuestaJugador;
        apuestaCPU = estadoPartida.apuestaCPU;


        instanciaDeJuego = estadoPartida.instanciaDeJuego;
        cambiarInstancia(); // Actualiza la interfaz al restaurar el estado
    }
}
*/


// Funciones para cada botón
function funcion_btn_jugar() {
    instanciaDeJuego = 1; // Cambiar a la instancia "Repartir"
    //restaurarEstadoPartida();
    cambiarInstancia(); // Actualizar la interfaz
}

function funcion_btn_repartir() {
    cartasRepartidas = 1;
    cartasHechasObjeto[seleccionarCartaRandomDisponible(0)]; //selecciono la primera carta del jugador
    cartasHechasObjeto[seleccionarCartaRandomDisponible(1)]; //selecciono la primera carta del CPU
    cartasRepartidas = 2;
    cartasHechasObjeto[seleccionarCartaRandomDisponible(0)];
    cartasHechasObjeto[seleccionarCartaRandomDisponible(1)];
    cartasRepartidas = 3;
    cartasHechasObjeto[seleccionarCartaRandomDisponible(0)];
    cartasHechasObjeto[seleccionarCartaRandomDisponible(1)];


    instanciaDeJuego = 2; // Cambiar a la instancia "Apostar"
    //restaurarEstadoPartida();
    cambiarInstancia(); //ejecutar la nueva instancia
}
function funcion_btn_instrucciones(){
    instanciaDeJuego = 6; //Cambiar a la instancia "instrucciones"
    //restaurarEstadoPartida();
    cambiarInstancia();
}

function funcion_btn_tirar(){
    
}

function funcion_btn_apuesta() {
    
}

function funcion_btn_apuesta_5(){
    apuestaJugador = 5;
    apuestaCPU = 5;

    instanciaDeJuego = 3; // Cambiar a la instancia "juego"
    cambiarInstancia();
}
function funcion_btn_apuesta_10(){
    apuestaJugador = 10;
    apuestaCPU = 10;

    instanciaDeJuego = 3; // Cambiar a la instancia "juego"
    cambiarInstancia();
}
function funcion_btn_apuesta_15(){
    apuestaJugador = 15;
    apuestaCPU = 15;

    instanciaDeJuego = 3; // Cambiar a la instancia "juego"
    cambiarInstancia();
}

function  funcion_activar_btn_tirar(){
    document.getElementsByClassName(".div_tirar").style.display="block";
}

function seleccionarCartaRandomDisponible(jugador_o_cpu){
    let numeroDeBusqueda = 0;
    do{
        numeroDeBusqueda = Math.floor(Math.random()* 39);
    
    }while(!cartasHechasObjeto[numeroDeBusqueda].disponibleRepartir)
        
        cartasHechasObjeto[numeroDeBusqueda].disponibleRepartir = false; //Carta en false para que no se duplique

        if(jugador_o_cpu === 0){
            cartasHechasObjeto[numeroDeBusqueda].jugador = true;
            cartasHechasObjeto[numeroDeBusqueda].ordenAsignado = cartasRepartidas;
            cartasHechasObjeto[numeroDeBusqueda].disponibleTirar = true; 
        }else if(jugador_o_cpu === 1){
            cartasHechasObjeto[numeroDeBusqueda].jugador = false;
            cartasHechasObjeto[numeroDeBusqueda].ordenAsignado = cartasRepartidas;
        }
    return numeroDeBusqueda;
}

function buscarParaDibujarCarta(BoolJugador_o_CPU, NumCartaADibujar){

    for(let i =0; i< 39; i++){
        if(cartasHechasObjeto[i].jugador == BoolJugador_o_CPU){
            if(cartasHechasObjeto[i].ordenAsignado == NumCartaADibujar){
                return cartasArray[i];
            }
        }
    }

}

// Inicializar la primera instancia del juego
cambiarInstancia();



/*
<img src="{$cartas[seleccionarCartaRandomDisponible]}" alt="carta 1 de Jugador">
<img src="{$cartas[seleccionarCartaRandomDisponible]}" alt="carta 2 de Jugador">
<img src="{$cartas[seleccionarCartaRandomDisponible]}" alt="carta 3 de Jugador">

<img src="{$cartas[seleccionarCartaRandomDisponible]}" alt="carta 1 de CPU">
<img src="{$cartas[seleccionarCartaRandomDisponible]}" alt="carta 2 de CPU">
<img src="{$cartas[seleccionarCartaRandomDisponible]}" alt="carta 3 de CPU">
*/