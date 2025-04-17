const carasDelDado = [
    "src/dado/dado_cara1",
    "src/dado/dado_cara2",
    "src/dado/dado_cara3",
    "src/dado/dado_cara4",
    "src/dado/dado_cara5",
    "src/dado/dado_cara6"
]
let instanciaDeJuego = 0;
let juegoDeDados = document.querySelector('#juego_de_dados');
switch (instanciaDeJuego) {
    case 0: // Para jugar
        juegoDeDados.innerHTML = `
        <button id="btn-jugar">Jugar</button>
        <button id="btn-instrucciones">Instrucciones</button>`;
        document.querySelector('#btn-jugar').addEventListener('click', funcion_btn_jugar);
        document.querySelector('#btn-instrucciones').addEventListener('click', funcion_btn_instrucciones);
        break;
}