var images = [
    './img/Bee.jpeg', './img/Edo Tensei.jpeg', './img/Gai sensei.jpeg', 
    './img/Hashirama.png', './img/Hinata.png', './img/Iruka.png',
    './img/Itachi.png', './img/Jiraiya.png', './img/Kakashi.png',
    './img/Kisame.png', './img/Konan.png', './img/Kurama.png',
    './img/Madara.png', './img/Minato Namikaze.png', './img/Naruto God.png',
    './img/Pain.jpeg', './img/Rock Lee.jpeg', './img/Sakura.png', 
    './img/Sarutobi.jpeg', './img/Sasuke.png', './img/Shikamaru.jpeg',
    './img/Susanoo.png', './img/Tobi.jpeg', './img/Tobirama.png',
    './img/Tsunade.jpeg', './img/Tsunade.jpeg', './img/Zetsu.png'
];
var imagesTrap = [
    './img/Tsukoyomi.png', './img/Senju.png', './img/Makengyou.png'
]
var heightImage;
var size;
var imagesRandom = []
var numberImages;
var numberTraps;
var arrayIds = [];
var arrayIdsTrap = [];
var imagesIds = new Object();
var imagePrint;
var imagesPrint = [];
var clicks = 0;

/**
 * Rellena el formulario con los datos obtenidos en el getDatosUsuario()
 */
function rellenarFormulario(){
    document.getElementById('mainCharacter').src = character;
    document.getElementById('user').value = `@ ${userName}`;

    // Definiendo la cantidad de tiros segun la dificultad y el numero de cartas

    const shoots = {
        3: {
            1: 14,
            2: 12,
            3: 10,
        },
        4: {
            1: 16,
            2: 14,
            3: 12,
        },
        5: {
            1: 26,
            2: 24,
            3: 22,
        },
    };

    document.getElementById('shoots').value = shoots[cards][dificulty]
}

/**
 * Halla un valor aleatorio
 * @param {number} max 
 * @returns Valor aleatorio
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Esta funcion asigna a cada imagen un dos ids para poder revelar
 */

function insertarImgsRandom(){
    let items = document.getElementsByClassName('containerItem')

    while (arrayIds.length < numberImages * 2){
        let index = getRandomInt(items.length);
        if(!arrayIds.includes(index)){
            arrayIds.push(index)
        }
    }

    for (let i = 0; i < arrayIds.length; i++) {
        const key = imagesRandom[i];
        const value = arrayIds[i]
        if(Object.keys(imagesIds).length == numberImages){
            let index = i - numberImages
            const key = imagesRandom[index];
            imagesIds[key].push(value.toString());
        } else {
            imagesIds[key] = [value.toString()]
        }
    }
    console.log(imagesIds);
}

/**
 * Creamos el panel del juego segun el numero de cartas elegidas
 */
function crearPanel(){
    document.getElementById('game').style.gridTemplateColumns = "repeat("+cards+", 1fr)";
    document.getElementById('game').style.gridTemplateRows = "repeat("+cards+", 1fr)";

    let items = [];
    for (let index = 0; index < (parseInt(cards)*parseInt(cards)); index++) {
        items += `<div class="containerItem animate__animated " id="${index}"></div>`
    }
    document.getElementById('game').innerHTML = items;

    let itemsNew = document.getElementsByClassName('containerItem');

    if (cards == 5){
        numberTraps = 3;
        numberImages = 11;
        size = '75px';
        heightImage = '65px';
    } else if (cards == 4){
        numberTraps = 2;
        numberImages = 7;
        size = '100px';
        heightImage = '90px';
    } else if (cards == 3){
        numberTraps = 2;
        numberImages = 4;
        size = '125px';
        heightImage = '115px';
    }
    for (let index = 0; index < itemsNew.length; index++) {
        itemsNew[index].style.minHeight = `${size}`;
        itemsNew[index].style.minWidth = `${size}`;
    }

    // Se escogen las imágenes aleatorias para el juego
    while(imagesRandom.length < numberImages){
        let index = images[getRandomInt(images.length)];
        if (!imagesRandom.includes(index)){
            imagesRandom.push(index);
        }
    }
    insertarImgsRandom();
}

function hasDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
            return true; // If a duplicate is found, return true
            }
        }
    }
    return false; // If no duplicates are found, return false
}

/**
 * Empezamos a escoger la carta y animamos
 * @param {Event} event Click en la carta
 */
function chooseCard(event){
    // Si ya no hay más tiros, no puedes seguir jugando
    let shoots = document.getElementById('shoots');
    if(shoots.value <= 0){
        console.log('juego terminado');
        const items = document.getElementsByClassName('containerItem');
        for (let item of items) {
            item.removeEventListener('click', chooseCard);
        }
        return false
    }

    // Si tienes tiradas, sigues jugando
    let item = event.target;
    shoots.value = parseInt(shoots.value) - 1;

    // Voltear carta boca arriba y mostrar imagen
    item.classList.add('animate__flipOutY');
    setTimeout(()=>{
        item.classList.remove('animate__flipInY');
        item.classList.remove('animate__flipOutY');

        // Printea una imagen de acuerdo al id clickeado
        let imagePrint = ''
        
        for (let key in imagesIds){
            if (imagesIds[key].includes(item.id)){
                imagePrint = key;
            }
        }
        
        item.classList.add('animate__flipInY');
        item.innerHTML = `<img src="${imagePrint}" alt="card" height="${heightImage}">`;
        setTimeout(()=>{
            item.classList.remove('animate__flipInY');
            item.classList.add('animate__flipOutY');
        }, 2000);
    }, 1000)
    imagesPrint.push(imagePrint);
    console.log(imagesPrint);
    
    let duplicates = hasDuplicates(imagesPrint)

    if (duplicates){
        console.log('Conseguido');
        return false
    }
    // Voltear carta boca abajo y borrar imagen
    setTimeout(()=>{
        item.classList.remove('animate__flipOutY');
        item.classList.add('animate__flipInY');
        item.innerHTML = ''
        clicks += 1
        console.log('clicks = ', clicks);
        if (clicks == 2) imagesPrint = [];
        console.log(imagesPrint);
    }, 4000)
    
}

/**
 * Inicia los eventos del juego
*/
function iniciandoEventosDelJuego(){
    const items = document.getElementsByClassName('containerItem');

    for(let item of items){
        item.addEventListener('click', chooseCard);
    }
}

getDatosUsuario();

if(!comprobacionDatosUsuario()) location = 'index.html';

rellenarFormulario();

crearPanel();

iniciandoEventosDelJuego();