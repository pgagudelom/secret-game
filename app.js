
/**
 * Definimos variables a usar
 */
let numeroSecreto = 0; //Asignamos numero aletarrio
let intentos = 0; //Asignamos variable intentos contador
let listaNumerosSorteados = [];
let numeroMaximo = 10;

/**
 * Está función asigna el texto que se mostrará en el tag que se le indique
 * 
 */
function asignarTextoElemento(elemento, texto) {
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;
    return;
}


/**
 * Este metodo verifica si el numero que dice el usuario concuerda con el numero secreto del juego
 * 
 */
function verificarIntento() {

    //Parseamos el numero digitado por el usuario a un valor numerico
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    //Validamos que el numero secreto sea identico al numero que ingresó el usuario
    if (numeroDeUsuario === numeroSecreto) {

        //Asignamos texto
        asignarTextoElemento('p', `Felicidades! 🥳 Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {

        //Damos pistas al usuario si el numero es mayor o menor al numero secreto.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor ➖');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor ➕');
        }

        //Incrementamos contador
        intentos++;

        //Limpiamos campos
        limpiarCaja();
    }

    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}


function generarNumeroAleatorio(cantidadNumeros) {
    let numeroGenerado = Math.floor(Math.random() * cantidadNumeros + 1);

    //Si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        //Buscamos si el numero ya esta en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroAleatorio(numeroMaximo);
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}

function condicionesIniciales() {

    asignarTextoElemento('h1', 'Secret number Game');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);

    numeroSecreto = generarNumeroAleatorio(numeroMaximo);
    intentos = 1;
}

function reiniciarJuego() {

    //Limpiamos campos
    limpiarCaja();

    //Inicializamos el juego
    condicionesIniciales();

    //Deshabilitamos boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');

}

condicionesIniciales();