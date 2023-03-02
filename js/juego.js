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
var imagesRandom;
var imagesTrapRandom;
var numberImages;
var numberTraps;
var arrayIds;
var arrayIdsTrap;
var imagesIds;
var imagePrint;
var imagesPrint = [];
var clicks = 0;
var duplicates;
var idsCorrect = [];
var score;
var shootsValue;
var imagesTrapsIds;
var keyObj;
var trapOption;
var imagesTrapArray = [];

/**
 * Rellena el formulario con los datos obtenidos en el getDatosUsuario()
 */
function rellenarFormulario(){
    document.getElementById('mainCharacter').src = character;
    document.getElementById('user').value = `@ ${userName}`;

    // Definiendo la cantidad de tiros segun la dificultad y el numero de cartas
    const shoots = {
        3: {
            1: 18,
            2: 16,
            3: 14,
        },
        4: {
            1: 20,
            2: 18,
            3: 16,
        },
        5: {
            1: 30,
            2: 28,
            3: 26,
        },
    };

    shootsValue = shoots[cards][dificulty]

    document.getElementById('shoots').value = shootsValue
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
 * Esta función retorna las imágenes con Ids predeterminados
 * @param {Array} array Lista de Ids a ser asignados
 * @param {Array} images Lista de imágenes a ser asignadas Ids
 * @param {number} number Numero de imágenes
 * @returns Retorna un objeto, las claves son las rutas a las imágenes
 * y cada ruta tiene un Id (si se trata de cartas trampa) o dos Ids 
 * (si se trata de imágenes de juego)
 */
function getIdswithImages(array, images, number) {
    let imgIds = new Object();

    for (let i = 0; i < array.length; i++) {
        const key = images[i];
        const value = array[i]
        if(Object.keys(imgIds).length == number){
            let index = i - number
            const key = images[index];
            imgIds[key].push(value.toString());
        } else {
            imgIds[key] = [value.toString()]
        }
    }
    return imgIds
}

/**
 * Esta funcion asigna a cada imagen dos ids para poder revelar
 */
function insertarImgsRandom(){
    let items = document.getElementsByClassName('containerItem')
    arrayIds = [];
    arrayIdsTrap = [];
    imagesIds = new Object();
    imagesTrapsIds = new Object();

    while (arrayIds.length < numberImages * 2){
        let index = getRandomInt(items.length);
        if(!arrayIds.includes(index)){
            arrayIds.push(index)
        }
    }

    while (arrayIdsTrap.length < numberTraps){
        let index = getRandomInt(items.length);
        if(!arrayIds.includes(index)){
            if(!arrayIdsTrap.includes(index)) arrayIdsTrap.push(index)
        }
    }
    imagesIds = getIdswithImages(arrayIds, imagesRandom, numberImages);
    imagesTrapsIds = getIdswithImages(arrayIdsTrap, imagesTrapRandom, numberTraps);

    console.log(imagesIds);
    console.log(imagesTrapsIds);
}

/**
 * Creamos el panel del juego segun el numero de cartas elegidas
 */
function crearPanel(){
    document.getElementById('game').style.gridTemplateColumns = "repeat("+cards+", 1fr)";
    document.getElementById('game').style.gridTemplateRows = "repeat("+cards+", 1fr)";

    let items = [];
    for (let index = 0; index < (parseInt(cards)*parseInt(cards)); index++) {
        items += `<div class="containerItem " id="${index}"></div>`
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
        numberTraps = 1;
        numberImages = 4;
        size = '125px';
        heightImage = '115px';
    }
    for (let index = 0; index < itemsNew.length; index++) {
        itemsNew[index].style.minHeight = `${size}`;
        itemsNew[index].style.minWidth = `${size}`;
    }

    // Se escogen las imágenes aleatorias para el juego
    imagesRandom = [];
    while(imagesRandom.length < numberImages){
        let index = images[getRandomInt(images.length)];
        if (!imagesRandom.includes(index)){
            imagesRandom.push(index);
        }
    }
    imagesTrapRandom = [];
    while(imagesTrapRandom.length < numberTraps){
        let index = imagesTrap[getRandomInt(imagesTrap.length)];
        if (!imagesTrapRandom.includes(index)){
            imagesTrapRandom.push(index);
        }
    }
    insertarImgsRandom();
}

/**
 * Encuentra si hay duplicados en el array de imágenes printeadas
 * @param {Array} array de imagenes printeadas
 * @returns true si hay duplicados y false si no los hay
 */
function hasDuplicates(array) {
    if (array.length > 1){
        for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
                if (array[i] === array[j]) {
                return true;
                }
            }
        }
    }
    return false;
}

function trapFunction(button){
    button.addEventListener('click', e=>{
        clicks = 0;
        const items = document.getElementsByClassName('containerItem');
        
        for(let item of items){
            item.addEventListener('click', chooseCard);
        }
        animateCSS('advertising', 'animate__fadeOutDown').then(()=>{
            let panelGame = document.getElementById('panelGame');
            panelGame.style.transition = 'opacity 0.5s ease';
            advertising.style.opacity = '0';
            panelGame.style.opacity = '1';

            if (trapOption == 1){
                console.log('Tsukoyomi!!!');
            } else if (trapOption == 2){
                console.log('Senju!!!');
            } else if (trapOption == 3){
                console.log('Makengyou!!!');
            }
        })
    })
}

/**
 * Muestra el aviso de que el juego ha terminado y reinicia todo
*/
function showPlayagain(textAdv, trap){
    advertising = document.getElementById('advertising');
    document.getElementById('tittle').innerText = textAdv;
    
    // Animacion de entrada
    animateCSS('advertising', 'animate__fadeInDown').then(()=>{
        advertising.style.opacity = '1';
        let panelGame = document.getElementById('panelGame');
        panelGame.style.transition = 'opacity 0.5s ease';
        panelGame.style.opacity = '0.2';
    })
    if (trap) {
        document.getElementById('playAgain').innerText = 'OK'
        trapFunction(document.getElementById('playAgain'))
    }else{
        // Oculta el panel de juego
        button = document.getElementById('playAgain');
        button.innerText = 'Play again?'
        // Evento para dar click en el boton y reiniciar el juego
        button.addEventListener('click', event=>{
            animateCSS('advertising', 'animate__fadeOutDown').then(()=>{
                panelGame.style.transition = 'opacity 0.5s ease';
                advertising.style.opacity = '0';
                panelGame.style.opacity = '1';
                location.reload();
            })
        })    
    }
}

function showTrap(imageTrapPrint) {
    console.log('Valiste verga xd');
    clicks = 0;
    imagesTrapArray = [];
    if (imageTrapPrint == './img/Tsukoyomi.png'){
        trapOption = 1;
        showPlayagain('Has sido devorado por el Tsukoyomi!', true)
    } else if (imageTrapPrint == './img/Senju.png'){
        trapOption = 2;
        showPlayagain('Has sido salvado por el sello!', true)
    } else if (imageTrapPrint == './img/Makengyou.png'){
        trapOption = 3;
        showPlayagain('Caíste en un genjutsu por el Makenyou Saringan!', true)
    }
}

/**
 * Esta función ingresa animación a un elemento y la elimina enseguida
 * @param {HTMLElement} element 
 * @param {String} animation Animación sacada de animate.style
 * @param {String} prefix Prefijo para la clase de animación
 * @returns retorna la respuesta de la promesa
 */
function animateCSS(element, animation, prefix = 'animate__'){
    return new Promise((resolve, reject) => {
        const animationName = `${animation}`;
        const node = document.getElementById(element);
        node.classList.add(`${prefix}animated`, animationName);
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }
        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });
}

/**
 * Empezamos a escoger la carta y animamos
 * @param {Event} event Click en la carta
 */
function chooseCard(event){
    // Si ya no hay más tiros, no puedes seguir jugando
    let shoots = document.getElementById('shoots');
    score = document.getElementById('score');
    console.log('hola', clicks);
    if (clicks == 0 || clicks == 1 && !hasDuplicates(arrayIds)){
        imagesPrint = [];
        idsCorrect = [];
        clicks++
        // Si tienes tiradas, sigues jugando
        let item = event.target;
        shoots.value = parseInt(shoots.value) - 1;
        idsCorrect.push(item.id)
        console.log(idsCorrect);
        duplicates = false;
        let imagePrint = '';
        let imageTrapPrint = '';
        // Voltear carta boca arriba y mostrar imagen
        animateCSS(item.id, 'animate__flipOutY').then(()=>{
            for (keyObj in imagesIds){
                if (imagesIds[keyObj].includes(item.id)){
                    imagePrint = keyObj;
                    item.innerHTML = `<img src="${imagePrint}" alt="card" height="${heightImage}">`;
                }
            }
            imagesPrint.push(imagePrint)
            for (keyObj in imagesTrapsIds){
                if (imagesTrapsIds[keyObj].includes(item.id)){
                    imageTrapPrint = keyObj;
                    item.innerHTML = `<img src="${imageTrapPrint}" alt="card" height="${heightImage}">`;
                    imagesTrapArray.push(imageTrapPrint)
                }
            }
            if (imagesTrapArray.includes(imageTrapPrint)){
                animateCSS(item.id, 'animate__flipInY').then(() =>{
                    clicks--
                    imagesTrapArray = [];
                    const items = document.getElementsByClassName('containerItem')

                    for (let item of items) {
                        item.removeEventListener('click', chooseCard)
                    }
                    showTrap(imageTrapPrint)
                })
                return false
            }
            console.log(imagesPrint);
            console.log('clicks = ', clicks);
            // setTimeout(hideCard[3000, item])
            hideCard(item)
        });
    }
}

/**
 * Esta función voltea boca abajo la carta y según la puntuación y los 
 * tiros restantes alerta de que el juego ha terminado o no
 * @param {HTMLElement} item elemento que está siendo volteado
 */
function hideCard(item){
    animateCSS(item.id, 'animate__flipInY').then(()=>{
        duplicates = hasDuplicates(imagesPrint);
        if (duplicates){
            clicks--
            score = document.getElementById('score')
            score.value = parseInt(score.value) + 1;
            if (score.value == numberImages * 2){
                
                const items = document.getElementsByClassName('containerItem')

                for (let item of items) {
                    item.removeEventListener('click', chooseCard)
                }
                showPlayagain('Has ganado!', false);
            }
            return false;
        }
        if(shoots.value < 1 || score.value == numberImages * 2){
            clicks--
            console.log('juego terminado');
            
            const items = document.getElementsByClassName('containerItem')

            for (let item of items) {
                item.removeEventListener('click', chooseCard)
            }
            if(shoots.value < 1) textAdv = 'Has perdido!';
            else textAdv = 'Has ganado!'
            showPlayagain(textAdv, false);
            return false
        }
        animateCSS(item.id, 'animate__flipOutY').then(()=>{
            animateCSS(item.id, 'animate__flipInY');
            item.innerHTML = '';
            console.log('jelou');
            clicks--
        })
    })
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