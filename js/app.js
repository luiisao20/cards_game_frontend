/**
 * JS para la página de inicio, validación de datos y Drag&Drop
 * @author LuisBravo <bravo.luis.1995@gmail.com>
 * {@link https://github.com/luiisao20/CSS_HTML_JS}
 */

var userName;
var dificulty;
var cards;
var formEntrada;
var error;
var characterImg;
var characterItems;
var characterContainer;

/**
 * Muestra el mensaje de error en caso de que algun campo no se llene
 */
function showError(){
    error.classList.remove('animate__backOutUp');
    error.classList.add('animate__backInDown');
    document.addEventListener('click', e=>{
        error.classList.remove('animate__backInDown');
        error.classList.add('animate__backOutUp');
    })
}

/**
 * Comprobando los datos del usuario
 * @param {Event} event Evento del formulario
 */

function comprobarForm(event){
    if (!userName.value.match(/^[a-zA-Z0-9]+$/)){
        console.log('Usario incorrecto');
        userName.focus();
        event.preventDefault();
        error.innerText = 'Usuario incorrecto compa xd.';
        showError();
        return false
    } else if (dificulty.value == '0'){
        console.log('Dificultad nula');
        event.preventDefault();
        dificulty.focus();
        error.innerText = 'Escoge la dificultad del juego oe.';
        showError();
        return false
    } else if (cards.value == '0'){
        console.log('Cartas nulas');
        event.preventDefault();
        cards.focus();
        error.innerText = 'Habla bien, y las cartas?';
        showError();
        return false
    } else if(characterContainer.innerText == 'Arrastra aquí tu personaje elegido'){
        console.log('Personaje nulo');
        event.preventDefault();
        error.innerText = 'Oe escoge el personaje pelado';
        showError();
        return false
    }
    error.innerText = '';
    datosUsuario(userName, dificulty, cards);
    historicoUsuario(userName);
    return true;
}

/**
 * Moviendo los personajes
 * @param {Event} event Evento del dragstart
 */
function moviendoChr(event){
    characterImg = event.target;
    console.log(characterImg.src);
}

/**
 * Colocando el character dentro del contenedeor, sobrescribiendo el div
 * @param {Event} event Drop
 */
function colocarCharacter(event){
    console.log('Colocando');
    characterContainer.style.padding = '0';
    characterContainer.style.marginTop = '10px';
    characterContainer.innerHTML =
    `<img src="${characterImg.src}" alt="mainCharacter" height="140px">`
    console.log(characterContainer.querySelector('img').src);
    saveCharacter(characterContainer);
}

/**
 * Cargar los datos del documento
 */
function domCargado(){
    userName = document.getElementById('userName');
    dificulty = document.getElementById('dificulty');
    cards = document.getElementById('cards');
    formEntrada = document.getElementById('formentrada');
    error = document.getElementById('error');
    characterContainer = document.getElementById('characterContainer');

    if (sessionStorage.getItem('error')){
        error.innerText = 'Baboso jsjs';
        sessionStorage.removeItem('error');
    }
    
    document.addEventListener('submit', comprobarForm);

    // Drag & Drop
    characterItems = document.getElementsByClassName('characterItem');

    for (let character of characterItems){
        character.addEventListener('dragstart', moviendoChr);
    }

    characterContainer.addEventListener('dragover', e=>{e.preventDefault();})
    characterContainer.addEventListener('drop', colocarCharacter)
}

document.addEventListener('DOMContentLoaded', domCargado);