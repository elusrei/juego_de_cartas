///JUEGO DE CARTAS


const cartasArray = [
    // Cartas con valor 01
    "img/cartas/celeste_01.png",
    "img/cartas/verde_01.png",
    "img/cartas/rosa_01.png",
    "img/cartas/dorado_01.png",

    // Cartas con valor 02
    "img/cartas/celeste_02.png",
    "img/cartas/verde_02.png",
    "img/cartas/rosa_02.png",
    "img/cartas/dorado_02.png",

    // Cartas con valor 03
    "img/cartas/celeste_03.png",
    "img/cartas/verde_03.png",
    "img/cartas/rosa_03.png",
    "img/cartas/dorado_03.png",

    // Cartas con valor 04
    "img/cartas/celeste_04.png",
    "img/cartas/verde_04.png",
    "img/cartas/rosa_04.png",
    "img/cartas/dorado_04.png",

    // Cartas con valor 05
    "img/cartas/celeste_05.png",
    "img/cartas/verde_05.png",
    "img/cartas/rosa_05.png",
    "img/cartas/dorado_05.png",

    // Cartas con valor 06
    "img/cartas/celeste_06.png",
    "img/cartas/verde_06.png",
    "img/cartas/rosa_06.png",
    "img/cartas/dorado_06.png",

    // Cartas con valor 07
    "img/cartas/celeste_07.png",
    "img/cartas/verde_07.png",
    "img/cartas/rosa_07.png",
    "img/cartas/dorado_07.png",

    // Cartas con valor 10
    "img/cartas/celeste_10.png",
    "img/cartas/verde_10.png",
    "img/cartas/rosa_10.png",
    "img/cartas/dorado_10.png",

    // Cartas con valor 11
    "img/cartas/celeste_11.png",
    "img/cartas/verde_11.png",
    "img/cartas/rosa_11.png",
    "img/cartas/dorado_11.png",

    // Cartas con valor 12
    "img/cartas/celeste_12.png",
    "img/cartas/verde_12.png",
    "img/cartas/rosa_12.png",
    "img/cartas/dorado_12.png"
];

let cartasHechasObjeto = JSON.parse(sessionStorage.getItem("cartasHechasObjeto")) || [];
let jugadoresHechosObjeto = JSON.parse(localStorage.getItem("arrayDeJugadores")) || [];//inicio o agarro el array donde almaceno el ranking de jugadores
localStorage.setItem("arrayDeJugadores", JSON.stringify(jugadoresHechosObjeto)); //inicio o empato los datos de mi array de jugadores en el local storage



// Recorrer el array y generar los objetos cartas
for (let i = 0; i < cartasArray.length; i++) {
    // Extraer el valor numérico de la carta a partir del nombre del archivo
    let valorCarta = parseInt(cartasArray[i].match(/\d+/)[0]);
    /*Se utiliza el método match(/\d+/) para extraer el valor numérico de la carta directamente 
    desde el nombre del archivo (ej., "src/cartas/celeste_01.png" -> 01).*/
    
    // Crear el objeto para cada carta
    cartasHechasObjeto.push({
        imagen: cartasArray[i], //llamo y asigno el direcotrio del .jpg/.png
        valorCarta: valorCarta,
        valorPuntos: valorCarta,
        jugador: false,      // Inicialmente no la tiene el jugador
        disponibleRepartir: true,    // Por defecto disponibles todas
        disponibleTirar: false,        //todavia ninguna carta fue repartida y asignada
        ordenAsignado: null,    // Van de 1 a 3, para saber que carta selecciona el jugador
        seleccionada: false, // Inicialmente no seleccionada
        utilizada: false,     // Inicialmente no utilizada en el turno
        idCarta: i
    });

}
for (let i = 0; i < cartasHechasObjeto.length; i++) {
    // Si la carta tiene valor 10, 11 o 12, asignar 10 puntos
    if (cartasHechasObjeto[i].valorCarta >= 10 && cartasHechasObjeto[i].valorCarta <= 12) {
        cartasHechasObjeto[i].valorPuntos = 10;
    }
}




//Inicializo variables o rescato el dato del session storage para seguir la partida en donde se quedó

let instanciaDeJuego = sessionStorage.getItem("instanciaDeJuego") || 0; //Inf Sesion Storage  

let ronda = sessionStorage.getItem("ronda") || 0; //Contador de rondas jugadas //Informacion para el Session Storage
let rondasGanadas = sessionStorage.getItem("rondasGanadas") || 0; //Inf Sesion Storage  
let rondasPerdidas = sessionStorage.getItem("rondasPerdidas") || 0;   //Inf Sesion Storage  


let turno = sessionStorage.getItem("turno") || 0; //contador del turno //informacion para Session Storage
let turnosGanados = sessionStorage.getItem("turnosGanados") || 0;
let turnosPerdidos = sessionStorage.getItem("turnosPerdidos") || 0;

let numArrayGanadorDelTurno = sessionStorage.getItem("numArrayGanadorDelTurno") || 0;

let apuestaJugador = sessionStorage.getItem("apuestaJugador") || 0; //5-10-15   //Inf Sesion Storage    
let apuestaCPU = sessionStorage.getItem("apuestaCPU") || 0;    //5-10-15    //Inf Session Storage
let apuestaEnJuego = sessionStorage.getItem("apuestaEnJuego") || 0;

let puntosJugador = sessionStorage.getItem("puntosJugador") || 0;
let puntosCPU = sessionStorage.getItem("puntosCPU") || 0;

let cartasRepartidas = sessionStorage.getItem("cartasRepartidas") || 0; //Inf Sesion Storage  quiza, nose     

let cartasJugador = JSON.parse(sessionStorage.getItem("cartasJugador")) || []; //Para ir poniendo las cartas que le toca al jugador //Inf Sesion Storage  
let cartasCPU = JSON.parse(sessionStorage.getItem("cartasCPU")) || []; //Para ir poniendo las cartas que le toca al CPU //Inf Sesion Storage

let registrado = sessionStorage.getItem("registrado") || false;

let cartaSeleccionada = sessionStorage.getItem("cartaSeleccionada") || 0; //La carta que el jugador tiene seleccionada al momento de tocar el botón tirar



//mensajes a definir segun el resultado de las rondas y segun el resultado de los turnos, respectivamente
let ganadorDelTurno = ["Nadie", "CPU", "Jugadxr"];
let MensajeFinal = ["Empataron", "Ganaste", "Perdiste"];


// En esta columna suceden las instancias de juego
let columna_uno = document.querySelector('#columna_1');
let columna_dos = document.querySelector('#columna_2');
let columna_tres = document.querySelector('#columna_3');



// Función para actualizar la interfaz según la instancia del juego
function cambiarInstancia() {

    actualizarSession();
    actualizarEstadoDeJuego();

    //JUEGO
    switch (instanciaDeJuego) {
        case 0: // Para jugar

            columna_uno.innerHTML = `
        
        `;
            columna_dos.innerHTML = `
            <button id="btn-jugar">Jugar</button>
            <button id="btn-instrucciones">Instrucciones</button>`;
            columna_tres.innerHTML = `
        
        `;

            document.querySelector('#btn-jugar').addEventListener('click', funcion_btn_jugar);
            document.querySelector('#btn-instrucciones').addEventListener('click', funcion_btn_instrucciones);
            break;

        case 1: // Para repartir

            momentoRepartir();

            columna_uno.innerHTML = `
            <div class="cuadrosDeInfo">
                <h4>CONTADOR</h4>
                <p>
                Puntos conseguidos: <strong class="datos">${puntosJugador}</strong><br>
                Ronda número: <strong class="datos">${ronda}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadas}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidas}</strong><br>
                Turnos jugados: <strong class="datos">${turno}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanados}</strong>
                </p>    
            </div>
            <img src="img/cartas/atras_mazo.png" alt="Mazo de Cartas" id="mazo">
            <div class="cuadrosDeInfo" id="informacionDelMomento">
                <h4>INFORMACIÓN</h4>
                <p>
                    Pulsa el botón "Repartir".<br>
                    Se repartirán las cartas y deberás elegir una apuesta.
                </p>  
            </div>
            `;
            columna_dos.innerHTML = `<button id="btn-repartir">Repartir</button>
            `;
            columna_tres.innerHTML = `
                <div class ="tabla_de_puntos">Puntos CPU: ${puntosCPU}</div>
                <p>Pts. en juego: <strong>${apuestaEnJuego = apuestaJugador + apuestaCPU}</strong></p> 
                <div class ="tabla_de_puntos">Puntos Jugador: ${puntosJugador}</div>
                `;

            document.querySelector('#btn-repartir').addEventListener('click', funcion_btn_repartir);

            break;

        case 2: // Elegir apuesta viendo tus tres cartas

            columna_uno.innerHTML = `
            <div class="cuadrosDeInfo">
                <h4>CONTADOR</h4>
               <p>
                Puntos conseguidos: <strong class="datos">${puntosJugador}</strong><br>
                Ronda número: <strong class="datos">${ronda}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadas}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidas}</strong><br>
                Turnos jugados: <strong class="datos">${turno}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanados}</strong>
                </p>    
            </div>
            </div>
            <img src="img/cartas/atras_mazo.png" alt="Mazo de Cartas" id="mazo">
            <div class="cuadrosDeInfo" id="informacionDelMomento">
                <h4>INFORMACIÓN</h4>
                <p>
                    Elije un monto a apostar.<br>
                    El CPU replicará tu apuesta.<br>
                    Al finalizar el turno, en la tercer ronda, se definirá quién se queda con esos puntos.                    
                </p>  
            </div>
            `;
            columna_dos.innerHTML = `
                <p class = "avisos">Estas son tus cartas: </p>
                <div>            
                <img src="${cartasJugador[0]}" alt ="Carta 1 del Jugador"></img>
                <img src="${cartasJugador[1]}" alt ="Carta 2 del Jugador"></img>
                <img src="${cartasJugador[2]}" alt ="Carta 3 del Jugador"></img>

                </div>
                <div id="apostar">
                    <h3>Selecciona un monto a apostar: </h3>
                    <div>
                        <button id="btn-apuesta-5">5</button>
                        <button id="btn-apuesta-10">10</button>
                        <button id="btn-apuesta-15">15</button>
                    </div>
                </div>
                <div>
                    <button id="btn-apostar">Apostar</button>
                </div>
                `
            columna_tres.innerHTML = `
                <div class ="tabla_de_puntos">Puntos CPU: ${puntosCPU}</div>
                <p>Pts. en juego: <strong>${apuestaEnJuego = apuestaJugador + apuestaCPU}</strong></p> 
                <div class ="tabla_de_puntos">Puntos Jugador: ${puntosJugador}</div>
                `;



            document.querySelector('#btn-apuesta-5').addEventListener('click', funcion_btn_apuesta_5);
            document.querySelector('#btn-apuesta-10').addEventListener('click', funcion_btn_apuesta_10);
            document.querySelector('#btn-apuesta-15').addEventListener('click', funcion_btn_apuesta_15);
            document.querySelector('#btn-apostar').addEventListener('click', funcion_btn_apostar);


            break;


        case 3: // Seleccionar carta a tirar
        
            columna_uno.innerHTML = `
            <div class="cuadrosDeInfo">
                <h4>CONTADOR</h4>
                <p>
                Puntos conseguidos: <strong class="datos">${puntosJugador}</strong><br>
                Ronda número: <strong class="datos">${ronda}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadas}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidas}</strong><br>
                Turnos jugados: <strong class="datos">${turno}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanados}</strong>
                </p>    
            </div>   
            </div>
            <img src="img/cartas/atras_mazo.png" alt="Mazo de Cartas" id="mazo">
            <div class="cuadrosDeInfo" id="informacionDelMomento">
                <h4>INFORMACIÓN</h4>
                <p>
                    Selecciona una carta y pulsa "tirar"<br>
                    Por defecto se tirará la última carta seleccionada.
                </p>  
            </div>
            `;

            columna_dos.innerHTML = `
            <p class="avisos">CPU</p>
            <div>
                <img src="img/cartas/atras_carta.png" alt="carta 1 de CPU">
                <img src="img/cartas/atras_carta.png" alt="carta 2 de CPU">
                <img src="img/cartas/atras_carta.png" alt="carta 3 de CPU"> 
             
            </div>
            <div id="espacio_mesa"></div>
            
            <p class="avisos">Tú</p>
            <div>
            <button class = "btn-carta" id = "carta_uno_jugador"> <img src="${cartasJugador[0]}" alt ="Carta 1 del Jugador"></img></button>
            <button class = "btn-carta" id = "carta_dos_jugador"> <img src="${cartasJugador[1]}" alt ="Carta 2 del Jugador"></img></button>
            <button class = "btn-carta" id = "carta_tres_jugador"> <img src="${cartasJugador[2]}" alt ="Carta 3 del Jugador"></img></button>
            </div>

            <div id ='div_tirar'>
            <button class="btn-tirar">Tirar</button>
            </div>
            `;
            columna_tres.innerHTML = `
                <div class ="tabla_de_puntos">Puntos CPU: ${puntosCPU}</div>
                <p>Pts. en juego: <strong>${apuestaEnJuego = apuestaJugador + apuestaCPU}</strong></p> 
                <div class ="tabla_de_puntos">Puntos Jugador: ${puntosJugador}</div>
                `;

            document.querySelector('.btn-tirar').addEventListener('click', () => {
                funcion_btn_tirar(cartaSeleccionada);
            });

            document.querySelector('#carta_uno_jugador').addEventListener('click', () => {
                seleccionDeCarta(1);
            });

            document.querySelector('#carta_dos_jugador').addEventListener('click', () => {
                seleccionDeCarta(2);
            });

            document.querySelector('#carta_tres_jugador').addEventListener('click', () => {
                seleccionDeCarta(3);
            });

            break;


        case 4: // Cierre de turno

            funcion_definir_turno();
            turno++;

            columna_uno.innerHTML = `
            <div class="cuadrosDeInfo">
                <h4>CONTADOR</h4>
                <p>
                Puntos conseguidos: <strong class="datos">${puntosJugador}</strong><br>
                Ronda número: <strong class="datos">${ronda}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadas}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidas}</strong><br>
                Turnos jugados: <strong class="datos">${turno}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanados}</strong>
                </p>    
            </div>   
            </div>
            <img src="img/cartas/atras_mazo.png" alt="Mazo de Cartas" id="mazo">
            <div class="cuadrosDeInfo" id="informacionDelMomento">
                <h4>INFORMACIÓN</h4>
                <p>
                    3ra ronda alcanzada, el turno ha finalizado.<br>
                    Si tú o el CPU alcanzaron los 50pts, la partida finaliza, sino, se reparte de nuevo y comienza un nuevo turno
                </p>  
            </div>
            `;
            columna_dos.innerHTML = `<p>Fin del turno ${turno}</p>
            <p>Ganadxr del turno: ${ganadorDelTurno[numArrayGanadorDelTurno]}</p>
            <p>Puntos para el ganadxr del turno: ${apuestaEnJuego}</p>
            <button id="btn-siguiente-turno">Siguiente turno</button>
            `;
            document.querySelector('#btn-siguiente-turno').addEventListener('click', funcion_btn_siguiente_turno);

            columna_tres.innerHTML = `
            <div class ="tabla_de_puntos">Puntos CPU: ${puntosCPU}</div>
            <p>Pts. en juego: <strong>${apuestaEnJuego = apuestaJugador + apuestaCPU}</strong></p> 
            <div class ="tabla_de_puntos">Puntos Jugador: ${puntosJugador}</div>
            `;

            break;


        case 6: //instrucciones del juego de cartas

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

            break;


        case 7: //Enfrentamiento de dos cartas

            cartaPeleadoraCPU = buscarParaPelearCarta(false, ronda); //carta del cpu
            cartaPeleadoraJugador = buscarParaPelearCarta(true, cartaSeleccionada);
            columna_uno.innerHTML = `
        <div class="cuadrosDeInfo">
            <h4>CONTADOR</h4>
            <p>
            Puntos conseguidos: <strong class="datos"> ${puntosJugador}</strong><br>
            Ronda número: <strong class="datos">${ronda}</strong><br>
            Rondas ganadas: <strong class="datos">${rondasGanadas}</strong><br>
            Rondas perdidas: <strong class="datos">${rondasPerdidas}</strong><br>
            Turnos jugados: <strong class="datos">${turno}</strong><br>
            Turnos ganados: <strong class="datos">${turnosGanados}</strong>
            </p>    
        </div>
        <img src="img/cartas/atras_mazo.png" alt="Mazo de Cartas" id="mazo">
        <div class="cuadrosDeInfo" id="informacionDelMomento">
            <h4>INFORMACIÓN</h4>
            <p>
                Las cartas del 1 al 7 valen su numero en puntos.<br>
                Las cartas 10, 11 y 12 valen 10pts cada una.<br>
                Gana la carta de puntaje mas alto. Pueden empatar.
            </p>  
        </div>
        `;

            columna_dos.innerHTML = `
        <p class="avisos">CPU</p>
        <div>
            <img src="img/cartas/atras_carta.png" alt="carta 1 de CPU">
            <img src="img/cartas/atras_carta.png" alt="carta 2 de CPU">
            <img src="img/cartas/atras_carta.png" alt="carta 3 de CPU"> 
         
        </div>
        <div id="espacio_mesa">
            <div>
                <p class="avisos">Carta del oponente: </p><img src="${cartasCPU[ronda - 1]}" alt="Carta jugada por CPU">
            </div>
        <p id="vs-style">VS</p>
            <div>
                <p class="avisos">Tu carta: </p><img src="${cartasJugador[cartaSeleccionada - 1]}" alt ="Carta jugada por Jugadxr"></img>
            </div>
            
        </div>
        <p id="mensaje-combate"></p>
        <p class="avisos">Tú</p>
        <div>   
        <img src="${cartasJugador[0]}" alt ="Carta 1 del Jugador"></img>
        <img src="${cartasJugador[1]}" alt ="Carta 2 del Jugador"></img>
        <img src="${cartasJugador[2]}" alt ="Carta 3 del Jugador"></img>
        </div>
        <div>
            <button class="btn-siguiente-ronda">Siguiente ronda</button>
        </div>
        `
            compararCartas(cartaPeleadoraJugador, cartaPeleadoraCPU);

            let mensajeResultadoCombate = document.querySelector('#mensaje-combate');
            mensajeResultadoCombate.innerHTML = `
            ${funcion_mensaje_combate(cartaPeleadoraJugador, cartaPeleadoraCPU)}
            `;

            document.querySelector('.btn-siguiente-ronda').addEventListener('click', funcion_btn_siguiente_ronda);
            break;


        case 8://Repartija de puntos
            funcion_definir_partida();
            //numArrayGanadorDeLaPartida = 
            columna_uno.innerHTML = `
               <div class="cuadrosDeInfo">
                   <h4>CONTADOR</h4>
                   <p>
                Puntos conseguidos: <strong class="datos">${puntosJugador}</strong><br>
                Ronda número: <strong class="datos">${ronda}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadas}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidas}</strong><br>
                Turnos jugados: <strong class="datos">${turno}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanados}</strong>
                </p>      
               </div>
               <img src="img/cartas/atras_mazo.png" alt="Mazo de Cartas" id="mazo">
               <div class="cuadrosDeInfo" id="informacionDelMomento">
                   <h4>INFORMACIÓN</h4>
                   <p>
                       La Partida ha finalizado. Aqui puedes visualizar el resultado.
                   </p>  
               </div>
               `;

            columna_dos.innerHTML = `
                
                <p id="msjFinal">${MensajeFinal[numArrayGanadorDeLaPartida]}</p><br>
                <div><ul id="listaFinal">
                    <li><p>Tu puntaje: ${puntosJugador}</p></li>
                    <li><p>Puntaje CPU: ${puntosCPU}</p></li>
                    <li>Turnos Jugados: ${turno}</li>
                </ul></div>
                `;

            //Si el jugador terminó el turno con +50 pts y todavia no registró su victoria. Puede poner su nombre en el top
            if (puntosJugador >= 50 && registrado == "false") {
                console.log("Llegué al top");

                //Llamo el array de ranking de jugadores dellocalstorage, 
                //le pusheo uno nuevo pidiendole el nombre al usuario mediante un prompt
                //para los demas atributos uso las variables que uso para manetener el estado de la partida del jugador
                //Luego vuelvo a setear el array de jugadores del localStorage con el array actualizado con el nuevo jugador
                //(por default queda ultimo en el ranking hasta que entré al html tabla_de_posiciones)
                jugadoresHechosObjeto = JSON.parse(localStorage.getItem("arrayDeJugadores"));
                console.log("Llamé al array del Local");

                jugadoresHechosObjeto.push({
                    numero_de_jugador: jugadoresHechosObjeto.length,
                    nombre_de_jugador: prompt("Ganaste!. Sumá tu nombre al top: "),
                    pts_de_jugador: puntosJugador,
                    turnosjugados: turno,

                    //EXTRAS
                    top_de_jugador: setearTopDeJugador(),
                    mejor_mano_del_jugador: [] //siempre que reparte me fijo cuandos pts vale su mano

                });

                localStorage.setItem("arrayDeJugadores", JSON.stringify(jugadoresHechosObjeto));
                registrado = true;
            }
            columna_tres.innerHTML = `
                    <button id="reiniciar_partida">Inicio</button>
                `;
            document.querySelector('#reiniciar_partida').addEventListener('click', funcion_btn_inicio);

            break;

        default:
            break;
    }
}

// Funciones para cada botón
function funcion_btn_jugar() {
    instanciaDeJuego = 1; // Cambiar a la instancia "Repartir"
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

    definirSiMejorMano();

    repartir = true;
    ronda = 1;
    instanciaDeJuego = 2; // Cambiar a la instancia "Apostar"

    cambiarInstancia(); //ejecutar la nueva instancia
}

function funcion_btn_instrucciones() {
    instanciaDeJuego = 6; //Cambiar a la instancia "instrucciones"

    cambiarInstancia();
}

function funcion_btn_tirar(carta) {
    if (carta == 1 || carta == 2 || carta == 3) {
        let numeroDeBusqueda = 0;
        //un do/while buscando cual es la carta seleccionada (ordenAsignado = 1 2 o 3)
        let busqueda = 0; //contador para ver si se cargaron mal los datos y la carta aun no está disponible

        do {

            numeroDeBusqueda = busqueda;
            busqueda++;
            if (busqueda > 39) {
                console.log("No se encontró la carta, error de carga, cierre el navegador???");
                break;
            }
        } while (cartasHechasObjeto[numeroDeBusqueda].ordenAsignado !== carta || cartasHechasObjeto[numeroDeBusqueda].jugador !== true)



        if (cartasHechasObjeto[numeroDeBusqueda].disponibleTirar === true) {
            console.log(cartasHechasObjeto[numeroDeBusqueda]);
            cartasHechasObjeto[numeroDeBusqueda].disponibleTirar = false;

            instanciaDeJuego = 7;

            cambiarInstancia();
        } else {
            alert(" La carta seleccionada ya ha sido utilizada. O ha sido mal seleccionada. ");
            console.log(cartasHechasObjeto[numeroDeBusqueda]);
        }
    } else {
        alert("Seleccione una carta antes de tirar");
    }

}

function funcion_btn_siguiente_ronda() {
    if (ronda % 3 == 0) {//Rondas ya finalizadas((Pasamos a instancia de repartir puntos y seguir/ganar/perder))
        instanciaDeJuego = 4;

        cambiarInstancia();
    } else {//avanzamos de ronda, seguimos en instancia de juego 3 ((instancia de seleccionar y tirar cartas))
        ronda++;
        instanciaDeJuego = 3;

        cambiarInstancia();
    }
}

function funcion_btn_apuesta_5() {
    apuestaJugador = 5;
}
function funcion_btn_apuesta_10() {
    apuestaJugador = 10;
}
function funcion_btn_apuesta_15() {
    apuestaJugador = 15;

}

function funcion_btn_apostar() {
    if (apuestaJugador > 1) {
        apuestaCPU = apuestaJugador;
        instanciaDeJuego = 3; // Cambiar a la instancia "juego"
        cambiarInstancia();

    } else alert("Seleccione un monto a apostar");
}

function funcion_btn_siguiente_turno() {


    if (rondasGanadas >= 2) {

        puntosJugador += apuestaEnJuego;

        instanciaDeJuego = 1;

        if (puntosCPU >= 50 || puntosJugador >= 50) instanciaDeJuego = 8;


    } else if (rondasPerdidas >= 2) {

        puntosCPU += apuestaEnJuego;

        instanciaDeJuego = 1;

        if (puntosCPU >= 50 || puntosJugador >= 50) instanciaDeJuego = 8;


    } else {

        puntosCPU += apuestaEnJuego / 2;
        puntosJugador += apuestaEnJuego / 2;

        instanciaDeJuego = 1;

        if (puntosCPU >= 50 || puntosJugador >= 50) instanciaDeJuego = 8;


    }
    mezclarMazo();
    cambiarInstancia();
}

function funcion_btn_inicio() {
    registrado = false;
    momentoRepartir();
    turno = 0;
    puntosCPU = 0;
    puntosJugador = 0;
    instanciaDeJuego = 0;
    turnosGanados = 0;
    turnosPerdidos = 0;
    cambiarInstancia();

}
///////////////////////////


//Funciones para la jugabilidad de la partida

function mezclarMazo() {
    //ponerlas todas disponibles

    apuestaJugador = 0; //5-10-15   //Inf Sesion Storage    
    apuestaCPU = 0;    //5-10-15    //Inf Session Storage
    cartaSeleccionada = 0;
    cartasRepartidas = 0;
    ronda = 0;

    cartasJugador = [];//para ir poniendo las cartas que le toca al jugador //Inf Sesion Storage  
    cartasCPU = [];//para ir poniendo las cartas que le toca al CPU         //Inf Sesion Storage  

    apuestaJugador = 0; //5-10-15   //Inf Sesion Storage    
    apuestaCPU = 0;    //5-10-15    //Inf Session Storage
    apuestaEnJuego = 0;


    ronda = 0; //Contador de rondas jugadas //Informacion para el Session Storage


    rondasGanadas = 0;
    rondasPerdidas = 0;

    numArrayGanadorDelTurno = 0;

    cartaSeleccionada = 0; //La carta que el jugador tiene seleccionada al momento de tocar el botón tirar
    repartir = false;
    momentoRepartir();
}

function seleccionDeCarta(carta) {
    cartaSeleccionada = carta;
}

function seleccionarCartaRandomDisponible(jugador_o_cpu) {
    let numeroDeBusqueda = 0;
    do {
        numeroDeBusqueda = Math.floor(Math.random() * 40);

    } while (!cartasHechasObjeto[numeroDeBusqueda].disponibleRepartir)

    cartasHechasObjeto[numeroDeBusqueda].disponibleRepartir = false; //Carta en false para que no se duplique

    if (jugador_o_cpu === 0) {//0 = jugador
        cartasHechasObjeto[numeroDeBusqueda].jugador = true;
        cartasHechasObjeto[numeroDeBusqueda].ordenAsignado = cartasRepartidas;
        cartasHechasObjeto[numeroDeBusqueda].disponibleTirar = true;
        cartasJugador.push(cartasArray[numeroDeBusqueda]);
    } else if (jugador_o_cpu === 1) { //1 = CPU

        cartasHechasObjeto[numeroDeBusqueda].jugador = false;
        cartasHechasObjeto[numeroDeBusqueda].ordenAsignado = cartasRepartidas;
        cartasCPU.push(cartasArray[numeroDeBusqueda]);
    }
    return numeroDeBusqueda;
}

function buscarParaDibujarCarta(BoolJugador_o_CPU, NumCartaADibujar) {

    for (let i = 0; i < 39; i++) {
        if (cartasHechasObjeto[i].jugador == BoolJugador_o_CPU) {
            if (cartasHechasObjeto[i].ordenAsignado == NumCartaADibujar) {
                return cartasArray[i];
            }
        }
    }

}

function buscarParaPelearCarta(BoolJugador_o_CPU, NumCartaADibujar) {

    for (let i = 0; i < 39; i++) {
        if (cartasHechasObjeto[i].jugador == BoolJugador_o_CPU) {
            if (cartasHechasObjeto[i].ordenAsignado == NumCartaADibujar) {
                return cartasHechasObjeto[i].valorPuntos;

            }
        }
    }
}

function compararCartas(cartaJugadorCombate, cartaCPUcombate) {

    if (cartaJugadorCombate > cartaCPUcombate) {

        rondasGanadas += 1;
        if (rondasGanadas >= 2) {
            turnosGanados += 1;
        }

    } else if (cartaJugadorCombate === cartaCPUcombate) {


    } else {

        rondasPerdidas += 1
        if (rondasPerdidas >= 2) {
            turnosPerdidos += 1;
        }

    };

}


//Cierre de turno, posible reinicio de turno o final de partida
function funcion_definir_turno() {
    if (rondasGanadas > rondasPerdidas) numArrayGanadorDelTurno = 2;
    else if (rondasPerdidas > rondasGanadas) numArrayGanadorDelTurno = 1;
    else numArrayGanadorDelTurno = 0;
}

function funcion_definir_partida() {
    if (puntosJugador >= 50 && puntosJugador > puntosCPU) {
        numArrayGanadorDeLaPartida = 1;
    } else if (puntosCPU >= 50 && puntosCPU > puntosJugador) {
        numArrayGanadorDeLaPartida = 2;
    } else {
        numArrayGanadorDeLaPartida = 0;
    }
}

function funcion_mensaje_combate(cartaJugadorCombate, cartaCPUcombate) {
    if (cartaJugadorCombate > cartaCPUcombate) {
        return `Ganaste la ronda ${ronda}.`;
    } else if (cartaJugadorCombate === cartaCPUcombate) {

        return `Empataron la ronda ${ronda}.`;
    } else {

        return `Perdiste la ronda ${ronda}.`;
    }
}

function momentoRepartir() {
    for (let i = 0; i < cartasArray.length; i++) {
        cartasHechasObjeto[i].jugador = false;
        cartasHechasObjeto[i].disponibleRepartir = true;
        cartasHechasObjeto[i].disponibleTirar = false;
        cartasHechasObjeto[i].ordenAsignado = null;
        cartasHechasObjeto[i].seleccionada = false;
        cartasHechasObjeto[i].utilizada = false;
    }

}

function definirSiMejorMano() {
    let carta1, carta2, carta3 = 0;
    let valorManoActual = 0;//carta jugador 1 2 y 3 = 35pts ((primero sumo su mano actual))

    //for para extrar los valores de las 3 cartas del jugador
    for (let i = 0; i < 39; i++) {
        if (cartasHechasObjeto[i].jugador == true) {
            if (cartasHechasObjeto[i].ordenAsignado == 1) {
                carta1 = cartasHechasObjeto[i].valorPuntos;
            }
            if (cartasHechasObjeto[i].ordenAsignado == 2) {
                carta2 = cartasHechasObjeto[i].valorPuntos;
            }
            if (cartasHechasObjeto[i].ordenAsignado == 3) {
                carta3 = cartasHechasObjeto[i].valorPuntos;
            }

        }
    }

    valorManoActual = carta1 + carta2 + carta3;

}


//Actualizaciones se session y Local Storage

function actualizarEstadoDeJuego() {

    instanciaDeJuego = Number(sessionStorage.getItem("instanciaDeJuego")); // Inf Sesion Storage !RELEVANTE


    apuestaJugador = Number(sessionStorage.getItem("apuestaJugador"));
    apuestaCPU = Number(sessionStorage.getItem("apuestaCPU"));
    apuestaEnJuego = Number(sessionStorage.getItem("apuestaEnJuego"));

    puntosJugador = Number(sessionStorage.getItem("puntosJugador"));
    puntosCPU = Number(sessionStorage.getItem("puntosCPU"));

    ronda = Number(sessionStorage.getItem("ronda")); // Contador de rondas jugadas
    rondasGanadas = Number(sessionStorage.getItem("rondasGanadas")); // Rondas ganadas
    rondasPerdidas = Number(sessionStorage.getItem("rondasPerdidas")); // Rondas perdidas

    turno = Number(sessionStorage.getItem("turno")); // Contador del turno
    turnosGanados = Number(sessionStorage.getItem("turnosGanados"));
    turnosPerdidos = Number(sessionStorage.getItem("turnosPerdidos"));

    numArrayGanadorDelTurno = Number(sessionStorage.getItem("numArrayGanadorDelTurno"));

    cartaSeleccionada = Number(sessionStorage.getItem("cartaSeleccionada"));

    cartasRepartidas = Number(sessionStorage.getItem("cartasRepartidas")); // Inf Sesion Storage quiza, no sé

    cartasJugador = JSON.parse(sessionStorage.getItem("cartasJugador")); //Para ir poniendo las cartas que le toca al jugador //Inf Sesion Storage  
    cartasCPU = JSON.parse(sessionStorage.getItem("cartasCPU")); //Para ir poniendo las cartas que le toca al CPU //Inf Sesion Storage

    cartaSeleccionada = sessionStorage.getItem("cartaSeleccionada"); //La carta que el jugador tiene seleccionada al momento de tocar el botón tirar

    cartasJugador = JSON.parse(sessionStorage.getItem("cartasJugador"));
    cartasCPU = JSON.parse(sessionStorage.getItem("cartasCPU"));
    cartasHechasObjeto = JSON.parse(sessionStorage.getItem("cartasHechasObjeto"));

    registrado = sessionStorage.getItem("registrado");


}

function actualizarSession() {
    sessionStorage.setItem("instanciaDeJuego", instanciaDeJuego); //Inf Sesion Storage  !RELEVANTE

    sessionStorage.setItem("apuestaJugador", apuestaJugador);
    sessionStorage.setItem("apuestaCPU", apuestaCPU);
    sessionStorage.setItem("apuestaEnJuego", apuestaEnJuego);

    sessionStorage.setItem("puntosJugador", puntosJugador);
    sessionStorage.setItem("puntosCPU", puntosCPU);

    sessionStorage.setItem("ronda", ronda); //Contador de rondas jugadas
    sessionStorage.setItem("rondasGanadas", rondasGanadas); //Rondas ganadas
    sessionStorage.setItem("rondasPerdidas", rondasPerdidas); //Rondas perdidas

    sessionStorage.setItem("turno", turno); //Contador del turno
    sessionStorage.setItem("turnosGanados", turnosGanados);
    sessionStorage.setItem("turnosPerdidos", turnosPerdidos);

    sessionStorage.setItem("numArrayGanadorDelTurno", numArrayGanadorDelTurno);

    sessionStorage.setItem("cartasRepartidas", cartasRepartidas); //Inf Sesion Storage quiza, nose

    sessionStorage.setItem("cartaSeleccionada", cartaSeleccionada);

    sessionStorage.setItem("cartasJugador", JSON.stringify(cartasJugador));
    sessionStorage.setItem("cartasCPU", JSON.stringify(cartasCPU));

    sessionStorage.setItem("registrado", registrado);

    sessionStorage.setItem("cartasHechasObjeto", JSON.stringify(cartasHechasObjeto));
}


function setearTopDeJugador() {
    //aca llamaria al local storage y con un sort en el atributo pts_de_jugador las ordeno de mayor a menor

}


// Inicializar la primera instancia del juego

cambiarInstancia();
