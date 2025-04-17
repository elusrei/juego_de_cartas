//JUEGO DE DADOS


const carasDelDado = [
    "img/dado/dado_cara1.png",
    "img/dado/dado_cara1.png",
    "img/dado/dado_cara1.png",

    "img/dado/dado_cara2.png",
    "img/dado/dado_cara2.png",
    "img/dado/dado_cara2.png",

    "img/dado/dado_cara3.png",
    "img/dado/dado_cara3.png",
    "img/dado/dado_cara3.png",

    "img/dado/dado_cara4.png",
    "img/dado/dado_cara4.png",
    "img/dado/dado_cara4.png",

    "img/dado/dado_cara5.png",
    "img/dado/dado_cara5.png",
    "img/dado/dado_cara5.png",

    "img/dado/dado_cara6.png",
    "img/dado/dado_cara6.png",
    "img/dado/dado_cara6.png"
]



let dadoHechoObjeto = JSON.parse(sessionStorage.getItem("dadoHechoObjeto")) || [];
let jugadoresHechosObjetoDados = JSON.parse(localStorage.getItem("arrayDeJugadoresDados")) || [];//inicio o agarro el array donde almaceno el ranking de jugadores
localStorage.setItem("arrayDeJugadoresDados", JSON.stringify(jugadoresHechosObjetoDados)); //inicio o empato los datos de mi array de jugadores en el local storage


// Recorrer el array y generar los objetos PARA CADA VALOR POSIBLE DEL DADO
for (let i = 0; i < carasDelDado.length; i++) {
    // Extraer el valor numérico deL dado a partir del nombre del archivo
    let valorDado = parseInt(carasDelDado[i].match(/\d+/)[0]);
    /*Se utiliza el método match(/\d+/) para extraer el valor numérico de la carta directamente 
    desde el nombre del archivo (ej., "src/cartas/celeste_01.png" -> 01).*/
    
    // Crear el objeto para cada dado
    dadoHechoObjeto.push({
        imagen: carasDelDado[i], //llamo y asigno el direcotrio del .jpg/.png
        valorDado: valorDado,
        valorPuntosDado: valorDado,
        jugador: false,      // Inicialmente no la tiene el jugador
        disponibleRepartir: true,    // Por defecto disponibles todos
        disponibleTirar: false,        //todavia ningun dado fue repartido y asignado
        ordenAsignado: null,    // Van de 1 a 3, para saber que dado selecciona el jugador
        seleccionada: false, // Inicialmente no seleccionada
        utilizada: false,     // Inicialmente no utilizada en el turnoDado
        idCarta: i
    });

}


//Inicializo variables o rescato el dato del session storage para seguir la partida en donde se quedó

let instanciaDeJuegoDado = sessionStorage.getItem("instanciaDeJuegoDado") || 0; 

let rondaDado = sessionStorage.getItem("rondaDado") || 0; //Contador de rondas jugadas //Informacion para el Session Storage
let rondasGanadasDado = sessionStorage.getItem("rondasGanadasDado") || 0;
let rondasPerdidasDado = sessionStorage.getItem("rondasPerdidasDado") || 0;


let turnoDado = sessionStorage.getItem("turnoDado") || 0; //contador del turnoDado //informacion para Session Storage
let turnosGanadosDado = sessionStorage.getItem("turnosGanadosDado") || 0;
let turnosPerdidosDado = sessionStorage.getItem("turnosPerdidosDado") || 0;

let numArrayGanadorDelTurnoDado = sessionStorage.getItem("numArrayGanadorDelTurnoDado") || 0;

let apuestaJugadorDado = sessionStorage.getItem("apuestaJugadorDado") || 0; //5-10-15       
let apuestaCPUDado = sessionStorage.getItem("apuestaCPUDado") || 0;    //5-10-15    
let apuestaEnJuegoDado = sessionStorage.getItem("apuestaEnJuegoDado") || 0;

let puntosJugadorDado = Number(sessionStorage.getItem("puntosJugadorDado")) || 0;
let puntosCPUDado = sessionStorage.getItem("puntosCPUDado") || 0;

let dadosRepartidos = sessionStorage.getItem("dadosRepartidos") || 0;

let dadosJugador = JSON.parse(sessionStorage.getItem("dadosJugador")) || []; //Para ir poniendo las cartas que le toca al jugador 
let dadosCPU = JSON.parse(sessionStorage.getItem("dadosCPU")) || []; //Para ir poniendo las cartas que le toca al CPU 

let registradoDado = sessionStorage.getItem("registradoDado") || false;

let dadoSeleccionado = sessionStorage.getItem("dadoSeleccionado") || 0; //La carta que el jugador tiene seleccionada al momento de tocar el botón tirar



//mensajes a definir segun el resultado de las rondas y segun el resultado de los turnos, respectivamente
let ganadorDelTurnoDado = ["Nadie", "CPU", "Jugadxr"];
let MensajeFinalDado = ["Empataron", "Ganaste", "Perdiste"];



// En esta columna suceden las instancias de juego
let columna_uno = document.querySelector('#columna_1');
let columna_dos = document.querySelector('#columna_2');
let columna_tres = document.querySelector('#columna_3');


// Función para actualizar la interfaz según la instancia del juego
function cambiarInstanciaDado() {

    actualizarSessionDado();
    actualizarEstadoDeJuegoDado();

    //JUEGO
    switch (instanciaDeJuegoDado) {
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
                Puntos conseguidos: <strong class="datos">${puntosJugadorDado}</strong><br>
                Ronda número: <strong class="datos">${rondaDado}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadasDado}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidasDado}</strong><br>
                Turnos jugados: <strong class="datos">${turnoDado}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanadosDado}</strong>
                </p>    
            </div>
            <img src="img/dado/dado_cara1.png" alt="Mazo de Cartas" id="mazo">
            <div class="cuadrosDeInfo" id="informacionDelMomento">
                <h4>INFORMACIÓN</h4>
                <p>
                    Pulsa el botón "Repartir".<br>
                    Se repartirán los dados y deberás elegir una apuesta. <br>
                    Los dados van del 1 al 6. Se puede repetir un mismo numero de dado solo hasta 3 veces.
                </p>  
            </div>
            `;
            columna_dos.innerHTML = '<button id="btn-repartir">Repartir</button>';
            columna_tres.innerHTML = `
                <div class ="tabla_de_puntos">Puntos CPU: ${puntosCPUDado}</div>
                <p>Pts. en juego: <strong>${apuestaEnJuegoDado = apuestaJugadorDado + apuestaCPUDado}</strong></p> 
                <div class ="tabla_de_puntos">Puntos Jugador: ${puntosJugadorDado}</div>
                `;
            document.querySelector('#btn-repartir').addEventListener('click', funcion_btn_repartir);

            break;

        case 2: // Elegir apuesta viendo tus tres cartas
            columna_uno.innerHTML = `
            <div class="cuadrosDeInfo">
                <h4>CONTADOR</h4>
               <p>
                Puntos conseguidos: <strong class="datos">${puntosJugadorDado}</strong><br>
                Ronda número: <strong class="datos">${rondaDado}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadasDado}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidasDado}</strong><br>
                Turnos jugados: <strong class="datos">${turnoDado}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanadosDado}</strong>
                </p>    
            </div>
            </div>
            <img src="img/dado/dado_cara1.png" alt="Mazo de Cartas" id="mazo">
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
                <p class = "avisos">Estos son tus dados: </p>
                <div>            
                <img src="${dadosJugador[0]}" alt ="Dado 1 del Jugador"></img>
                <img src="${dadosJugador[1]}" alt ="Dado 2 del Jugador"></img>
                <img src="${dadosJugador[2]}" alt ="Dado 3 del Jugador"></img>

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
                <div class ="tabla_de_puntos">Puntos CPU: ${puntosCPUDado}</div>
                <p>Pts. en juego: <strong>${apuestaEnJuegoDado = apuestaJugadorDado + apuestaCPUDado}</strong></p> 
                <div class ="tabla_de_puntos">Puntos Jugador: ${puntosJugadorDado}</div>
                `;
            console.log(dadosJugador);


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
                Puntos conseguidos: <strong class="datos">${puntosJugadorDado}</strong><br>
                Ronda número: <strong class="datos">${rondaDado}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadasDado}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidasDado}</strong><br>
                Turnos jugados: <strong class="datos">${turnoDado}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanadosDado}</strong>
                </p>    
            </div>   
            </div>
            <img src="img/dado/dado_cara1.png" alt="Mazo de Cartas" id="mazo">
            <div class="cuadrosDeInfo" id="informacionDelMomento">
                <h4>INFORMACIÓN</h4>
                <p>
                    Selecciona un Dado y pulsa "tirar"<br>
                    Por defecto se tirará el último dado seleccionado.
                </p>  
            </div>
            `;

            columna_dos.innerHTML = `
            <p class="avisos">CPU</p>
            <div>
                <img src="img/dado/dado_cara1.png" alt="dado 1 de CPU">
                <img src="img/dado/dado_cara1.png" alt="dado 2 de CPU">
                <img src="img/dado/dado_cara1.png" alt="dado 3 de CPU"> 
             
            </div>
            <div id="espacio_mesa"></div>
            
            <p class="avisos">Tú</p>
            <div>
            <button class = "btn-carta" id = "dado_uno_jugador"> <img src="${dadosJugador[0]}" alt ="Dado 1 del Jugador"></img></button>
            <button class = "btn-carta" id = "dado_dos_jugador"> <img src="${dadosJugador[1]}" alt ="Dado 2 del Jugador"></img></button>
            <button class = "btn-carta" id = "dado_tres_jugador"> <img src="${dadosJugador[2]}" alt ="Dado 3 del Jugador"></img></button>
            </div>

            <div id ='div_tirar'>
            <button class="btn-tirar">Tirar</button>
            </div>
            `;
            columna_tres.innerHTML = `
                <div class ="tabla_de_puntos">Puntos CPU: ${puntosCPUDado}</div>
                <p>Pts. en juego: <strong>${apuestaEnJuegoDado = apuestaJugadorDado + apuestaCPUDado}</strong></p> 
                <div class ="tabla_de_puntos">Puntos Jugador: ${puntosJugadorDado}</div>
                `;

            document.querySelector('.btn-tirar').addEventListener('click', () => {
                funcion_btn_tirar(dadoSeleccionado);
            });

            document.querySelector('#dado_uno_jugador').addEventListener('click', () => {
                seleccionDeDado(1);
            });

            document.querySelector('#dado_dos_jugador').addEventListener('click', () => {
                seleccionDeDado(2);
            });

            document.querySelector('#dado_tres_jugador').addEventListener('click', () => {
                seleccionDeDado(3);
            });




            break;

        case 4: // Cierre de turnoDado
            ////if (rondas ganadas>rondas perdidas){numArrayGanadorDelTurnoDado = 2}
            funcion_definir_turno();
            turnoDado++;
            columna_uno.innerHTML = `
            <div class="cuadrosDeInfo">
                <h4>CONTADOR</h4>
                <p>
                Puntos conseguidos: <strong class="datos">${puntosJugadorDado}</strong><br>
                Ronda número: <strong class="datos">${rondaDado}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadasDado}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidasDado}</strong><br>
                Turnos jugados: <strong class="datos">${turnoDado}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanadosDado}</strong>
                </p>    
            </div>   
            </div>
            <img src="img/dado/dado_cara1.png" alt="Mazo de Cartas" id="mazo">
            <div class="cuadrosDeInfo" id="informacionDelMomento">
                <h4>INFORMACIÓN</h4>
                <p>
                    3ra ronda alcanzada, el turno ha finalizado.<br>
                    Si tú o el CPU alcanzaron los 50pts, la partida finaliza, sino, se reparte de nuevo y comienza un nuevo turno.
                </p>  
            </div>
            `;
            columna_dos.innerHTML = `<p>Fin del turno ${turnoDado}</p>
            <p>Ganadxr del turno: ${ganadorDelTurnoDado[numArrayGanadorDelTurnoDado]}</p>
            <p>Puntos para el ganadxr del turno: ${apuestaEnJuegoDado}</p>
            <button id="btn-siguiente-turnoDado">Siguiente turno</button>
            `;
            document.querySelector('#btn-siguiente-turnoDado').addEventListener('click', funcion_btn_siguiente_turno);
            columna_tres.innerHTML = `
            <div class ="tabla_de_puntos">Puntos CPU: ${puntosCPUDado}</div>
            <p>Pts. en juego: <strong>${apuestaEnJuegoDado = apuestaJugadorDado + apuestaCPUDado}</strong></p> 
            <div class ="tabla_de_puntos">Puntos Jugador: ${puntosJugadorDado}</div>
            `;

            break;

        case 5: // Pedir nombre para el top
            columna_dos.innerHTML = '<p>Que? </p>';

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
            //comparar dos cartas y sumar al contador

            //compararCartas(dadoHechoObjeto[4].valorPuntosDado,dadoHechoObjeto[dadosCPU[rondaDado]].valorPuntosDado);
            cartaPeleadoraCPU = buscarParaPelearCarta(false, rondaDado); //carta del cpu
            cartaPeleadoraJugador = buscarParaPelearCarta(true, dadoSeleccionado);

            columna_uno.innerHTML = `
        <div class="cuadrosDeInfo">
            <h4>CONTADOR</h4>
            <p>
            Puntos conseguidos: <strong class="datos"> ${puntosJugadorDado}</strong><br>
            Ronda número: <strong class="datos">${rondaDado}</strong><br>
            Rondas ganadas: <strong class="datos">${rondasGanadasDado}</strong><br>
            Rondas perdidas: <strong class="datos">${rondasPerdidasDado}</strong><br>
            Turnos jugados: <strong class="datos">${turnoDado}</strong><br>
            Turnos ganados: <strong class="datos">${turnosGanadosDado}</strong>
            </p>    
        </div>
        <img src="img/dado/dado_cara1.png" alt="Mazo de Cartas" id="mazo">
        <div class="cuadrosDeInfo" id="informacionDelMomento">
            <h4>INFORMACIÓN</h4>
            <p>
                Los dados van del 1 al 6, pelean con su valor en número.<br>
                Cada número de dado se puede repetir hasta 3 veces por repartida..<br>
                Gana el Dado de puntaje mas alto. Pueden empatar.
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
                <p class="avisos">Carta del oponente: </p><img src="${dadosCPU[rondaDado - 1]}" alt="Carta jugada por CPU">
            </div>
        <p id="vs-style">VS</p>
            <div>
                <p class="avisos">Tu carta: </p><img src="${dadosJugador[dadoSeleccionado - 1]}" alt ="Carta jugada por Jugadxr"></img>
            </div>
            
        </div>
        <p id="mensaje-combate"></p>
        <p class="avisos">Tú</p>
        <div>   
        <img src="${dadosJugador[0]}" alt ="Dado 1 del Jugador"></img>
        <img src="${dadosJugador[1]}" alt ="Dado 2 del Jugador"></img>
        <img src="${dadosJugador[2]}" alt ="Dado 3 del Jugador"></img>
        </div>
        <div>
            <button class="btn-siguiente-rondaDado">Siguiente ronda</button>
        </div>
        `

            compararCartas(cartaPeleadoraJugador, cartaPeleadoraCPU);


            let mensajeResultadoCombate = document.querySelector('#mensaje-combate');
            mensajeResultadoCombate.innerHTML = `
            ${funcion_mensaje_combate(cartaPeleadoraJugador, cartaPeleadoraCPU)}
            `;


            document.querySelector('.btn-siguiente-rondaDado').addEventListener('click', funcion_btn_siguiente_ronda);


            break;
        
        case 8://Repartija de puntos
            funcion_definir_partida();
            //numArrayGanadorDeLaPartida = 
            columna_uno.innerHTML = `
               <div class="cuadrosDeInfo">
                   <h4>CONTADOR</h4>
                   <p>
                Puntos conseguidos: <strong class="datos">${puntosJugadorDado}</strong><br>
                Ronda número: <strong class="datos">${rondaDado}</strong><br>
                Rondas ganadas: <strong class="datos">${rondasGanadasDado}</strong><br>
                Rondas perdidas: <strong class="datos">${rondasPerdidasDado}</strong><br>
                Turnos jugados: <strong class="datos">${turnoDado}</strong><br>
                Turnos ganados: <strong class="datos">${turnosGanadosDado}</strong>
                </p>      
               </div>
               <img src="img/dado/dado_cara1.png" alt="Mazo de Cartas" id="mazo">
               <div class="cuadrosDeInfo" id="informacionDelMomento">
                   <h4>INFORMACIÓN</h4>
                   <p>
                       La Partida ha finalizado. Aqui puedes visualizar el resultado.
                   </p>  
               </div>
               `;


            columna_dos.innerHTML = `
                
                <p id="msjFinal">${MensajeFinalDado[numArrayGanadorDeLaPartida]}</p><br>
                <div><ul id="listaFinal">
                    <li><p>Tu puntaje: ${puntosJugadorDado}</p></li>
                    <li><p>Puntaje CPU: ${puntosCPUDado}</p></li>
                    <li>Turnos Jugados: ${turnoDado}</li>
                </ul></div>
                `;

            console.log("Casi legué al top dados");
            console.log("puntosJugadorDado: ", puntosJugadorDado);
            console.log("registradoDado: ", registradoDado);

            //Si el jugador terminó el turno con +50 pts y todavia no registró su victoria. Puede poner su nombre en el top
            if (puntosJugadorDado >= 50 && registradoDado == "false") {
                console.log("entre?")
                let nombreJugador = prompt("¡Ganaste! Ingresa tu nombre para el ranking:");

                if (!nombreJugador || nombreJugador.trim() === "") {
                    nombreJugador = "Jugador Anónimo"; // Nombre por defecto si no ingresa nada
                }
                console.log("Llegué al top dados");

                //Llamo el array de ranking de jugadores dellocalstorage, 
                //le pusheo uno nuevo pidiendole el nombre al usuario mediante un prompt
                //para los demas atributos uso las variables que uso para manetener el estado de la partida del jugador
                //Luego vuelvo a setear el array de jugadores del localStorage con el array actualizado con el nuevo jugador
                //(por default queda ultimo en el ranking hasta que entré al html tabla_de_posiciones)
                jugadoresHechosObjetoDados = JSON.parse(localStorage.getItem("arrayDeJugadoresDados")) || [];
                console.log("Llamé al array del Local");

                jugadoresHechosObjetoDados.push({
                    numero_de_jugador: jugadoresHechosObjetoDados.length,
                    nombre_de_jugador: nombreJugador,
                    pts_de_jugador: puntosJugadorDado,
                    turnosjugados: turnoDado,

                    //EXTRAS
                    top_de_jugador: setearTopDeJugador(),
                    mejor_mano_del_jugador: [] //siempre que reparte me fijo cuandos pts vale su mano

                });

                localStorage.setItem("arrayDeJugadoresDados", JSON.stringify(jugadoresHechosObjetoDados));
                registradoDado = true;
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
    instanciaDeJuegoDado = 1; // Cambiar a la instancia "Repartir"
    cambiarInstanciaDado(); // Actualizar la interfaz
}

function funcion_btn_repartir() {
    dadosRepartidos = 1;
    dadoHechoObjeto[seleccionarDadoRandom(0)]; //selecciono la primera carta del jugador
    dadoHechoObjeto[seleccionarDadoRandom(1)]; //selecciono la primera carta del CPU
    dadosRepartidos = 2;
    dadoHechoObjeto[seleccionarDadoRandom(0)];
    dadoHechoObjeto[seleccionarDadoRandom(1)];
    dadosRepartidos = 3;
    dadoHechoObjeto[seleccionarDadoRandom(0)];
    dadoHechoObjeto[seleccionarDadoRandom(1)];

    //definirSiMejorMano();

    repartir = true;
    rondaDado = 1;
    instanciaDeJuegoDado = 2; // Cambiar a la instancia "Apostar"

    cambiarInstanciaDado(); //ejecutar la nueva instancia
}

function funcion_btn_instrucciones() {
    instanciaDeJuegoDado = 6; //Cambiar a la instancia "instrucciones"

    cambiarInstanciaDado();
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
        } while (dadoHechoObjeto[numeroDeBusqueda].ordenAsignado !== carta || dadoHechoObjeto[numeroDeBusqueda].jugador !== true)



        if (dadoHechoObjeto[numeroDeBusqueda].disponibleTirar === true) {
            console.log(dadoHechoObjeto[numeroDeBusqueda]);
            dadoHechoObjeto[numeroDeBusqueda].disponibleTirar = false;

            instanciaDeJuegoDado = 7;

            cambiarInstanciaDado();
        } else {
            alert(" La carta seleccionada ya ha sido utilizada. O ha sido mal seleccionada. ");
            console.log(dadoHechoObjeto[numeroDeBusqueda]);
        }
    } else {
        alert("Seleccione una carta antes de tirar");
    }

}

function funcion_btn_siguiente_ronda() {
    if (rondaDado % 3 == 0) {//Rondas ya finalizadas((Pasamos a instancia de repartir puntos y seguir/ganar/perder))
        instanciaDeJuegoDado = 4;

        cambiarInstanciaDado();
    } else {//avanzamos de rondaDado, seguimos en instancia de juego 3 ((instancia de seleccionar y tirar cartas))
        rondaDado++;
        instanciaDeJuegoDado = 3;

        cambiarInstanciaDado();
    }
}

function funcion_btn_apuesta_5() {
    apuestaJugadorDado = 5;
}
function funcion_btn_apuesta_10() {
    apuestaJugadorDado = 10;
}
function funcion_btn_apuesta_15() {
    apuestaJugadorDado = 15;

}

function funcion_btn_apostar() {
    if (apuestaJugadorDado > 1) {
        apuestaCPUDado = apuestaJugadorDado;
        instanciaDeJuegoDado = 3; // Cambiar a la instancia "juego"
        cambiarInstanciaDado();

    } else alert("Seleccione un monto a apostar");
}

function funcion_btn_siguiente_turno() {


    if (rondasGanadasDado >= 2) {

        puntosJugadorDado += apuestaEnJuegoDado;

        instanciaDeJuegoDado = 1;

        if (puntosCPUDado >= 50 || puntosJugadorDado >= 50) instanciaDeJuegoDado = 8;


        //&& puntosJugadorDado>=50

    } else if (rondasPerdidasDado >= 2) {

        puntosCPUDado += apuestaEnJuegoDado;

        instanciaDeJuegoDado = 1;

        if (puntosCPUDado >= 50 || puntosJugadorDado >= 50) instanciaDeJuegoDado = 8;


        //&& puntosCPUDado>=50

    } else {

        puntosCPUDado += apuestaEnJuegoDado / 2;
        puntosJugadorDado += apuestaEnJuegoDado / 2;

        instanciaDeJuegoDado = 1;

        if (puntosCPUDado >= 50 || puntosJugadorDado >= 50) instanciaDeJuegoDado = 8;


    }
    mezclarMazo();
    cambiarInstanciaDado();
}

function funcion_btn_inicio() {
    registradoDado = false;
    momentoRepartir();
    turnoDado = 0;
    puntosCPUDado = 0;
    puntosJugadorDado = 0;
    instanciaDeJuegoDado = 0;
    turnosGanadosDado = 0;
    turnosPerdidosDado = 0;
    cambiarInstanciaDado();

}
///////////////////////////


//Funciones para la jugabilidad de la partida

function mezclarMazo() {
    //ponerlas todas disponibles

    apuestaJugadorDado = 0; //5-10-15       
    apuestaCPUDado = 0;    //5-10-15    
    dadoSeleccionado = 0;
    dadosRepartidos = 0;
    rondaDado = 0;

    dadosJugador = [];//para ir poniendo las cartas que le toca al jugador   
    dadosCPU = [];//para ir poniendo las cartas que le toca al CPU           

    apuestaJugadorDado = 0; //5-10-15       
    apuestaCPUDado = 0;    //5-10-15    
    apuestaEnJuegoDado = 0;


    rondaDado = 0; //Contador de rondas jugadas //Informacion para el Session Storage


    rondasGanadasDado = 0;
    rondasPerdidasDado = 0;

    numArrayGanadorDelTurnoDado = 0;

    dadoSeleccionado = 0; //La carta que el jugador tiene seleccionada al momento de tocar el botón tirar
    repartir = false;
    momentoRepartir();
}

function seleccionDeDado(carta) {
    //si la carta esta disponible, se selecciona
    dadoSeleccionado = carta;

}

function seleccionarDadoRandom(jugador_o_cpu) {
    let numeroDeBusqueda = 0;
    do {
        numeroDeBusqueda = Math.floor(Math.random() * 18);

    } while (!dadoHechoObjeto[numeroDeBusqueda].disponibleRepartir)

    dadoHechoObjeto[numeroDeBusqueda].disponibleRepartir = false; //dado nunca en false para que no se duplique

    if (jugador_o_cpu === 0) {//0 = jugador
        dadoHechoObjeto[numeroDeBusqueda].jugador = true;
        dadoHechoObjeto[numeroDeBusqueda].ordenAsignado = dadosRepartidos;
        dadoHechoObjeto[numeroDeBusqueda].disponibleTirar = true;
        dadosJugador.push(carasDelDado[numeroDeBusqueda]);
    } else if (jugador_o_cpu === 1) { //1 = CPU

        dadoHechoObjeto[numeroDeBusqueda].jugador = false;
        dadoHechoObjeto[numeroDeBusqueda].ordenAsignado = dadosRepartidos;
        dadosCPU.push(carasDelDado[numeroDeBusqueda]);
    }
    return numeroDeBusqueda;
}

function buscarParaDibujarCarta(BoolJugador_o_CPU, NumCartaADibujar) {

    for (let i = 0; i < 39; i++) {
        if (dadoHechoObjeto[i].jugador == BoolJugador_o_CPU) {
            if (dadoHechoObjeto[i].ordenAsignado == NumCartaADibujar) {
                return carasDelDado[i];
            }
        }
    }

}
function buscarParaPelearCarta(BoolJugador_o_CPU, NumCartaADibujar) {

    for (let i = 0; i < 39; i++) {
        if (dadoHechoObjeto[i].jugador == BoolJugador_o_CPU) {
            if (dadoHechoObjeto[i].ordenAsignado == NumCartaADibujar) {
                return dadoHechoObjeto[i].valorPuntosDado;

            }
        }
    }
}

function compararCartas(cartaJugadorCombate, cartaCPUcombate) {

    if (cartaJugadorCombate > cartaCPUcombate) {

        rondasGanadasDado += 1;
        if (rondasGanadasDado >= 2) {
            turnosGanadosDado += 1;
        }

    } else if (cartaJugadorCombate === cartaCPUcombate) {


    } else {

        rondasPerdidasDado += 1
        if (rondasPerdidasDado >= 2) {
            turnosPerdidosDado += 1;
        }

    };

}


//Cierre de turno, posible reinicio de turno o final de partida
function funcion_definir_turno() {
    if (rondasGanadasDado > rondasPerdidasDado) numArrayGanadorDelTurnoDado = 2;
    else if (rondasPerdidasDado > rondasGanadasDado) numArrayGanadorDelTurnoDado = 1;
    else numArrayGanadorDelTurnoDado = 0;
}

function funcion_definir_partida() {
    if (puntosJugadorDado >= 50 && puntosJugadorDado > puntosCPUDado) {
        numArrayGanadorDeLaPartida = 1;
    } else if (puntosCPUDado >= 50 && puntosCPUDado > puntosJugadorDado) {
        numArrayGanadorDeLaPartida = 2;
    } else {
        numArrayGanadorDeLaPartida = 0;
    }
}

function funcion_mensaje_combate(cartaJugadorCombate, cartaCPUcombate) {
    if (cartaJugadorCombate > cartaCPUcombate) {
        return `Ganaste la ronda ${rondaDado}.`;
    } else if (cartaJugadorCombate === cartaCPUcombate) {

        return `Empataron la ronda ${rondaDado}.`;
    } else {

        return `Perdiste la ronda ${rondaDado}.`;
    }
}

function momentoRepartir() {
    for (let i = 0; i < carasDelDado.length; i++) {
        dadoHechoObjeto[i].jugador = false;
        dadoHechoObjeto[i].disponibleRepartir = true;
        dadoHechoObjeto[i].disponibleTirar = false;
        dadoHechoObjeto[i].ordenAsignado = null;
        dadoHechoObjeto[i].seleccionada = false;
        dadoHechoObjeto[i].utilizada = false;
    }

}

function definirSiMejorMano() {
    let carta1, carta2, carta3 = 0;
    let valorManoActual = 0;//carta jugador 1 2 y 3 = 35pts ((primero sumo su mano actual))

    //for para extrar los valores de las 3 cartas del jugador
    for (let i = 0; i < 39; i++) {
        if (dadoHechoObjeto[i].jugador == true) {
            if (dadoHechoObjeto[i].ordenAsignado == 1) {
                carta1 = dadoHechoObjeto[i].valorPuntosDado;
            }
            if (dadoHechoObjeto[i].ordenAsignado == 2) {
                carta2 = dadoHechoObjeto[i].valorPuntosDado;
            }
            if (dadoHechoObjeto[i].ordenAsignado == 3) {
                carta3 = dadoHechoObjeto[i].valorPuntosDado;
            }

        }
    }

    valorManoActual = carta1 + carta2 + carta3;
}


//Actualizaciones se session y Local Storage

function actualizarEstadoDeJuegoDado() {

    instanciaDeJuegoDado = Number(sessionStorage.getItem("instanciaDeJuegoDado")); // Inf Sesion Storage !RELEVANTE


    apuestaJugadorDado = Number(sessionStorage.getItem("apuestaJugadorDado"));
    apuestaCPUDado = Number(sessionStorage.getItem("apuestaCPUDado"));
    apuestaEnJuegoDado = Number(sessionStorage.getItem("apuestaEnJuegoDado"));

    puntosJugadorDado = Number(sessionStorage.getItem("puntosJugadorDado"));
    puntosCPUDado = Number(sessionStorage.getItem("puntosCPUDado"));

    rondaDado = Number(sessionStorage.getItem("rondaDado")); // Contador de rondas jugadas
    rondasGanadasDado = Number(sessionStorage.getItem("rondasGanadasDado")); // Rondas ganadas
    rondasPerdidasDado = Number(sessionStorage.getItem("rondasPerdidasDado")); // Rondas perdidas

    turnoDado = Number(sessionStorage.getItem("turnoDado")); // Contador del turnoDado
    turnosGanadosDado = Number(sessionStorage.getItem("turnosGanadosDado"));
    turnosPerdidosDado = Number(sessionStorage.getItem("turnosPerdidosDado"));

    numArrayGanadorDelTurnoDado = Number(sessionStorage.getItem("numArrayGanadorDelTurnoDado"));

    dadoSeleccionado = Number(sessionStorage.getItem("dadoSeleccionado"));

    dadosRepartidos = Number(sessionStorage.getItem("dadosRepartidos")); // Inf Sesion Storage quiza, no sé

    dadosJugador = JSON.parse(sessionStorage.getItem("dadosJugador")); //Para ir poniendo las cartas que le toca al jugador   
    dadosCPU = JSON.parse(sessionStorage.getItem("dadosCPU")); //Para ir poniendo las cartas que le toca al CPU 

    dadoSeleccionado = sessionStorage.getItem("dadoSeleccionado"); //La carta que el jugador tiene seleccionada al momento de tocar el botón tirar

    dadosJugador = JSON.parse(sessionStorage.getItem("dadosJugador"));
    dadosCPU = JSON.parse(sessionStorage.getItem("dadosCPU"));
    dadoHechoObjeto = JSON.parse(sessionStorage.getItem("dadoHechoObjeto"));

    registradoDado = sessionStorage.getItem("registradoDado");

}

function actualizarSessionDado() {
    sessionStorage.setItem("instanciaDeJuegoDado", instanciaDeJuegoDado); 

    sessionStorage.setItem("apuestaJugadorDado", apuestaJugadorDado);
    sessionStorage.setItem("apuestaCPUDado", apuestaCPUDado);
    sessionStorage.setItem("apuestaEnJuegoDado", apuestaEnJuegoDado);

    sessionStorage.setItem("puntosJugadorDado", puntosJugadorDado);
    sessionStorage.setItem("puntosCPUDado", puntosCPUDado);

    sessionStorage.setItem("rondaDado", rondaDado); //Contador de rondas jugadas
    sessionStorage.setItem("rondasGanadasDado", rondasGanadasDado); //Rondas ganadas
    sessionStorage.setItem("rondasPerdidasDado", rondasPerdidasDado); //Rondas perdidas

    sessionStorage.setItem("turnoDado", turnoDado); //Contador del turnoDado
    sessionStorage.setItem("turnosGanadosDado", turnosGanadosDado);
    sessionStorage.setItem("turnosPerdidosDado", turnosPerdidosDado);

    sessionStorage.setItem("numArrayGanadorDelTurnoDado", numArrayGanadorDelTurnoDado);

    sessionStorage.setItem("dadosRepartidos", dadosRepartidos); 

    sessionStorage.setItem("dadoSeleccionado", dadoSeleccionado);

    sessionStorage.setItem("dadosJugador", JSON.stringify(dadosJugador));
    sessionStorage.setItem("dadosCPU", JSON.stringify(dadosCPU));

    sessionStorage.setItem("registradoDado", registradoDado);

    sessionStorage.setItem("dadoHechoObjeto", JSON.stringify(dadoHechoObjeto));
}


function setearTopDeJugador() {
    //aca llamaria al local storage y con un sort en el atributo pts_de_jugador las ordeno de mayor a menor

}


// Inicializar la primera instancia del juego

cambiarInstanciaDado();
