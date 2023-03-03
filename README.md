# cards_game_frontend

## Introducción

Este programa se presenta como solución al problema planteado de crear un juego de cartas entre héroes y villanos. El juego consiste de voltear cartas y si coniciden dejarlas boca arriba; caso contrario, se voltean boca abajo.

El proyecto usa varios códigos en JS para realizar las acciones interactivas con el usuario. En el index.html usa métodos para captar si hay errores en el formulario llenado por el usuario, si el nombre contiene algún caracter especial en el nombre de usuario, y si algún campo no se ha escogido. La API drag and drop es usada para que el usuario escoja el personaje de su elección. Para mostrar el mensaje de error se usa una librería externa llamada ````animate__animated```` que se descargó desde la página animate.style y se instaló con node.js.

En el juego.html se usan varias animaciones con la misma librería ````animate__animated```` para voltear al carta boca arriba y boca abajo, se usa un método de promesas para añadir la animación. Las imágenes del juego se añaden de manera aleatoria de las almacenadas en la carpeta ````img````, y están divididas en dos partes, las imágenes de juego como las de trampa. Cada imagen de trampa tiene su propia funcionalidad.

Un requerimiento del proyecto es tener instalado node.js ya que usaremos el comando ````npm install```` para añadir la librería de las animaciones.

## Instalación
- Tener instalado node.js previamente.
- En la terminal ejecutar el comando ````npm install````.
- Esperar a que se termine de instalar las dependencias y listo.

## Uso

### ¿Cómo jugar? 
- Rellenar el formulario de entrada correctamente sin dejar un campo en blanco.
- Arrastrar un personaje al cuadro de diálogo ````Arrastre aquí tu personaje elegido````.
- Dar click en "Jugar".
- Dar clicks a las cartas boca abajo, esperar a que muestren las imágenes y luego ir buscando una por una sus pares.
- No intentar voltar más de dos cartas a la vez, aunque el programa impide que esto ocurra, por cuestiones de la función `````setTimeout()```` es recomendable no hacerlo.
- Esperar a que las imágenes se volteen boca abajo para proseguir con el siguiente par.
- Si atinas a los pares, debes esperar a que ambas cartas queden en posición boca arriba para proseguir con el juego.
- En caso de caer en una trampa dar click en el botón del cuadro de diálogo que describe la trampa y prosigue con el juego.
- En caso de ganar o perder dar click en el botón del cuadro de diálogo para jugar de nuevo, esta acción recargará la página con los mismos datos de usuario.
