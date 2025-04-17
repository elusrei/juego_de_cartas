let nombreRanking1 = "nadie";
let puntosRanking1 = 0;
let turnosRanking1 = 0;

let nombreRanking2 = "nadie";
let puntosRanking2 = 0;
let turnosRanking2 = 0;

let nombreRanking3 = "nadie";
let puntosRanking3 = 0;
let turnosRanking3 = 0;

let jugadoresRanking = [];

if(0 == JSON.parse(localStorage.getItem("arrayDeJugadores"))){
jugadoresRanking = [{
    nombre_de_jugador: nombreRanking1,
    pts_de_jugador: puntosRanking1,
    turnosjugados: turnosRanking1
}];
}else{
    jugadoresRanking = JSON.parse(localStorage.getItem("arrayDeJugadores"));
}



jugadoresRanking.sort((a, b) => b.pts_de_jugador - a.pts_de_jugador);


//top 1
nombreRanking1 = jugadoresRanking[0].nombre_de_jugador;
puntosRanking1 = jugadoresRanking[0].pts_de_jugador;
turnosRanking1 = jugadoresRanking[0].turnosjugados;

//top 2

if (jugadoresRanking.length > 1) {
    nombreRanking2 = jugadoresRanking[1].nombre_de_jugador || nombreRanking2;
    puntosRanking2 = jugadoresRanking[1].pts_de_jugador || puntosRanking2;
    turnosRanking2 = jugadoresRanking[1].turnosjugados || turnosRanking2;
}
//top 3
if (jugadoresRanking.length > 2) {
    nombreRanking3 = jugadoresRanking[2].nombre_de_jugador || nombreRanking3;
    puntosRanking3 = jugadoresRanking[2].pts_de_jugador || puntosRanking3;
    turnosRanking3 = jugadoresRanking[2].turnosjugados || turnosRanking3;
}

let top1Cartas = document.querySelector("#top_1_cartas");

top1Cartas.innerHTML = `Jugadxr: <strong class="datos">${nombreRanking1}</strong > hizo: <strong  class="datos">${puntosRanking1}pts.</strong > En <strong  class="datos">${turnosRanking1} turno/s.</strong >
`;


let top2Cartas = document.querySelector("#top_2_cartas");

top2Cartas.innerHTML = `Jugadxr: <strong class="datos">${nombreRanking2}</strong > hizo: <strong class="datos">${puntosRanking2}pts.</strong> En <strong class="datos">${turnosRanking2} turno/s.</strong>
`;


let top3Cartas = document.querySelector("#top_3_cartas");

top3Cartas.innerHTML = `Jugadxr: <strong class="datos">${nombreRanking3}</strong> hizo: <strong class="datos">${puntosRanking3}pts.</strong> En <strong class="datos">${turnosRanking3} turno/s.</strong>
`;

/////////////////////
///////////DADOS////
///////////////////
let nombreRanking1Dado = "nadie";
let puntosRanking1Dado = 0;
let turnosRanking1Dado = 0;

let nombreRanking2Dado = "nadie";
let puntosRanking2Dado = 0;
let turnosRanking2Dado = 0;

let nombreRanking3Dado = "nadie";
let puntosRanking3Dado = 0;
let turnosRanking3Dado = 0;

let jugadoresRankingDado = [];

jugadoresRankingDado = JSON.parse(localStorage.getItem("arrayDeJugadoresDados")) || [{
    nombre_de_jugador: nombreRanking1Dado,
    pts_de_jugador: puntosRanking1Dado,
    turnosjugados: turnosRanking1Dado
}];

jugadoresRankingDado.sort((a, b) => b.pts_de_jugador - a.pts_de_jugador);
//top 1
nombreRanking1Dado = jugadoresRankingDado[0].nombre_de_jugador;
puntosRanking1Dado = jugadoresRankingDado[0].pts_de_jugador;
turnosRanking1Dado = jugadoresRankingDado[0].turnosjugados;

//top 2
if (jugadoresRankingDado.length > 1) {
    nombreRanking2Dado = jugadoresRankingDado[1].nombre_de_jugador || nombreRanking2Dado;
    puntosRanking2Dado = jugadoresRankingDado[1].pts_de_jugador || puntosRanking2Dado;
    turnosRanking2Dado = jugadoresRankingDado[1].turnosjugados || turnosRanking2Dado;
}

//top 3
if (jugadoresRankingDado.length > 2) {
    nombreRanking3Dado = jugadoresRankingDado[2].nombre_de_jugador || nombreRanking3Dado;
    puntosRanking3Dado = jugadoresRankingDado[2].pts_de_jugador || puntosRanking3Dado;
    turnosRanking3Dado = jugadoresRankingDado[2].turnosjugados || turnosRanking3Dado;
}

let top1Dados = document.querySelector("#top_1_dados");

top1Dados.innerHTML = `Jugadxr: <strong class="datos">${nombreRanking1Dado}</strong > hizo: <strong  class="datos">${puntosRanking1}pts.</strong > En <strong  class="datos">${turnosRanking1} turno/s.</strong >
`;


let top2Dados = document.querySelector("#top_2_dados");

top2Dados.innerHTML = `Jugadxr: <strong class="datos">${nombreRanking2Dado}</strong > hizo: <strong class="datos">${puntosRanking2}pts.</strong> En <strong class="datos">${turnosRanking2} turno/s.</strong>
`;


let top3Dados = document.querySelector("#top_3_dados");

top3Dados.innerHTML = `Jugadxr: <strong class="datos">${nombreRanking3Dado}</strong> hizo: <strong class="datos">${puntosRanking3}pts.</strong> En <strong class="datos">${turnosRanking3} turno/s.</strong>
`;


