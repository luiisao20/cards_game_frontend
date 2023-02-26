/**
 * JS del registro del usuario, guardar en el session storage y el historico en el local storage
 * @author LuisBravo <bravo.luis.1995@gmail.com>
 * {@link https://github.com/luiisao20/CSS_HTML_JS}
 */

var userName;
var dificulty;
var cards;
var character;

/**
 * Guardando los datos en el sessionStorage
 * @param {HTMLElement} name 
 * @param {HTMLElement} dificulty 
 * @param {HTMLElement} cards
 */

function datosUsuario(userName, dificulty, cards){
    sessionStorage.setItem('UserName', userName.value);
    sessionStorage.setItem('Dificulty', dificulty.value);
    sessionStorage.setItem('CardsNumber', cards.value);
}

function saveCharacter(character){
    sessionStorage.setItem('Character', character.querySelector('img').src);
}

/**
 * Creando un historial de usuarios con fecha
 * @param {HTMLElement} name 
 */
function historicoUsuario(userName){
    let historicoStorage = localStorage.getItem('historico')
    let historico;
    if (historicoStorage == null){
        historico = []
    } else {
        historico = JSON.parse(historicoStorage)
    }
    let registroUsuario = {
        user: userName.value,
        fecha: Date.now()
    }
    historico.push(registroUsuario);
    localStorage.setItem('historico', JSON.stringify(historico));
}

/**
 * Comprueba si se llenó el formulario
 * @returns retorna un falso para regresar al index.html
 */
function comprobacionDatosUsuario(){
    if(userName == null){
        sessionStorage.setItem('error', 'No se ha rellenado correctamente el formulario, baboso.')
        return false;
    }
    return true;
}

/**
 * Retoma los datos guardados en el session storage
 */
function getDatosUsuario(){
    userName = sessionStorage.getItem('UserName');
    dificulty = sessionStorage.getItem('Dificulty');
    cards = sessionStorage.getItem('CardsNumber');
    character = sessionStorage.getItem('Character')
}