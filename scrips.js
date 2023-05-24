/*-------------------------------- CONSTANTES -------------------------------------------*/
// Ruta de los archivos de sonido
const shot_audio_path = "./Assets/RAFAGA DE DISPAROS - EFECTO DE SONIDO.mp3"
const game_audio = "./Assets/el prostipirugolfo.mp3"
// Obtiene el primer elemento de html con la clase ".play-board"
const playBoard = document.querySelector(".play-board");
// Obtiene el primer elemento de html con la clase ".score"
const scoreElement = document.querySelector(".score");
// Obtiene el primer elemento de html con la clase ".high-score"
const highScoreElement = document.querySelector(".high-score");
// Aquí se crea una instancia de Audio y se le pasa el archivo de sonido
const audio = new Audio(shot_audio_path); 
/*-------------------------------- VARIABLES -------------------------------------------*/

// variable que controla el estado de game over
let game_over = false;
// posiciones de la comida
let foodX, foodY;
// Punto de aparicion del snake
let snakeX = 5, snakeY = 10;
// Las posiciones del cuerpo de la serpiente se guardan en una lista
let snake_body = [];
// Variables que controlan hacia donde se mueve el snake, inicia en cero porque inicialmente no se mueve
let movement_x = 0, movement_y = 0;
// El id del intervalo
let setIntervalId;
// El puntaje, comienza en cero pero puede cambiarse
let score = 0; 
// El pontaje mas alto obtenido, se guarda de manera local, no tiene expiracion
let highScore = localStorage.getItem("high-score") || 0;
// Establece la cadena de texto contenida en este elemeto, aqui se actualiza el puntaje
highScoreElement.innerHTML = `High Score: ${highScore}`;


/*-------------------------------- FUNCIONES -------------------------------------------*/
// Genera coordenadas X e Y aleatorias para un alimento dentro de una cuadricula
const changeFoodPosition = () => {
// Genera un numero aleatorio entre 0 y 29 utilizando Math.random()
    foodX = Math.floor(Math.random() * 30) + 1;
    // Genera un número aleatorio para la coordenada Y del alimento. Sigue el mismo proceso que foodX para generar un número aleatorio entre 1 y 30, que se asigna a la variable foodY.
    foodY = Math.floor(Math.random() * 30) + 1;
}

// 
const handleGameOver = () => {
    //Esta línea utiliza la función clearInterval() para detener el intervalo de tiempo que se haya establecido previamente. 
    //El parámetro setIntervalId hace referencia a un identificador único que se utiliza para identificar el intervalo de tiempo que se desea detener. 
    clearInterval (setIntervalId);
    // alert("Game Over");: Esta línea muestra una ventana emergente (alerta) con el mensaje "Game Over". La función alert() se utiliza para mostrar un mensaje en una ventana de diálogo simple en el navegador.
    alert("Game Over");
    location.reload(); //  recargar la página actual. Al llamar a location.reload()la página se volverá a cargar y reiniciará el juego.
}
// la función changeDirection cambia la dirección de movimiento en función de la tecla presionada. Modifica las variables movement_x y movement_y para reflejar la nueva dirección de movimiento, asegurándose de que no se produzcan cambios de
const changeDirection = (event) => {
    // console.log(e);
    //  Esta condición verifica si la tecla presionada es la flecha hacia arriba (ArrowUp)
    // si la velocidad en el eje Y no es igual a 1 
    //Si ambas condiciones son verdaderas, se ejecuta el bloque de código dentro de esta condición.
    if (event.key === "ArrowUp" && movement_y != 1) {
        
        movement_x = 0;//establece la velocidad en el eje X a 0, lo que significa que no hay movimiento horizontal.
        movement_y = -1;//establece la velocidad en el eje Y a -1, lo que significa que el movimiento es hacia arriba.
    
        //Esta condición verifica si la tecla presionada es la flecha hacia abajo ,y si la velocidad en el eje X no es igual a -1
     } else if (event.key === "ArrowDown" && movement_y != -1) {
        movement_x = 0;//establece la velocidad en el eje X a 1, lo que significa que el movimiento es hacia la derecha.
        movement_y = 1;//establece la velocidad en el eje X a 1, lo que significa que el movimiento es hacia la derecha.
     } else if (event.key === "ArrowLeft" && movement_x != 1) {
        movement_x = -1;
        movement_y = 0;
     } else if (event.key === "ArrowRight" && movement_x != -1) {
        movement_x = 1;
        movement_y = 0;
     } 
     
    //  initGame();
}
// verifica si el juego ha terminado antes de inicializarlo
const initGame = () => {
    //Si la variable game_over es verdadera, la función handleGameOver() se llama y se detiene el proceso de inicialización del juego.
    if(game_over) return handleGameOver ();//una declaración if ,se utiliza para salir inmediatamente de la función initGame y detener cualquier otro proceso de inici 

    let hmtlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
// snake_body.push([foodX, foodY]);: Se agrega un nuevo elemento a la matriz 
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snake_body.push([foodX, foodY]);
        // score++Se incrementa la puntuacion del jugador en 1
        score ++;
        //el audio almacenado en el objeto audio y se play iniciar music
        audio.play() 
        
        highScore =  score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`

        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }
    
    for(let i = snake_body.length - 1; i > 0; i--){
        snake_body[i] = snake_body[i - 1]
    }

    // está fuera de los límites del tablero
    snake_body[0] = [snakeX, snakeY];

    snakeX += movement_x;
    snakeY += movement_y;

    //  límites del tablero  , la variable "gameOver" se establece en verdadero (true).
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      game_over = true; 
    }

    //un bucle "for" para crear y mostrar cada segmento cuerpo serpiente
    for(let i = 0; i < snake_body.length; i++){
        hmtlMarkup += `<div class="head" style="grid-area: ${snake_body[i][1]} / ${snake_body[i][0]}"></div>`;
        if(i !== 0 && snake_body[0][1] === snake_body[i][1] && snake_body[0][0] === snake_body[i][0]){
            game_over = true;
        }

    }
    // "playBoard" con la cadena de plantilla (template string) "hmtlMarkup", que contiene los elementos HTML que representan la cabeza y el cuerpo de la serpiente.
    playBoard.innerHTML = hmtlMarkup;
}


changeFoodPosition(); 
// initGame();
setIntervalId = setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection);


/*const sonidos = document.getElementById( "sonido"); [
    document.addEventListener("arrowUp", function(evento) {
    if (evento.KeyCode == 32){
    sonidos.innerHTML = <audio src="RAFAGA DE DISPAROS - EFECTO DE SONIDO.mp3" autoplay></audio>;
    }
    })
    ]
*/
 