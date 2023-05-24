/*-------------------------------- CONSTANTES -------------------------------------------*/
// Ruta de los archivos de sonido
const shot_audio_path = "./Assets/RAFAGA DE DISPAROS - EFECTO DE SONIDO.mp3";
const game_audio_path = "./Assets/el prostipirugolfo.mp3";
const apear_snake_audio_path = "./Assets/negative_beeps-6008.mp3"
// Obtiene el primer elemento de html con la clase ".play-board"
const playBoard = document.querySelector(".play-board");
// Obtiene el primer elemento de html con la clase ".score"
const scoreElement = document.querySelector(".score");
// Obtiene el primer elemento de html con la clase ".high-score"
const highScoreElement = document.querySelector(".high-score");
// Aquí se crea una instancia de Audio y se le pasa el archivo de sonido
const audio_shot = new Audio(shot_audio_path); 
const audio_start = new Audio(apear_snake_audio_path)
/*-------------------------------- VARIABLES -------------------------------------------*/

// variable que controla el estado de game over
let game_over = false;
// posiciones de la comida
let food_position_x, food_position_y;
// Punto de aparicion del snake
let snake_position_x = 5, snake_position_y = 10;
// Las posiciones del cuerpo de la serpiente se guardan en una lista
let snake_body = [];
// Variables que controlan hacia donde se mueve el snake, inicia en cero porque inicialmente no se mueve
let movement_x = 0, movement_y = 0;
// El id del intervalo
let interval_id;
// El tiempor de retraso que sera usado en clearInterval para retrasar la funcion en milisegundos
let delay_interval = 100;
// El puntaje, comienza en cero pero puede cambiarse
let score = 0; 
// El pontaje mas alto obtenido, se guarda de manera local, no tiene expiracion
let high_score = localStorage.getItem("high-score") || 0;
// Establece la cadena de texto contenida en este elemeto
highScoreElement.innerHTML = `High Score: ${high_score}`;


/*-------------------------------- FUNCIONES -------------------------------------------*/
// Genera coordenadas X e Y aleatorias para un alimento dentro de una cuadricula
const changeFoodPosition = function() {
// Genera un numero aleatorio entre 0 y 29 utilizando Math.random()
    food_position_x = Math.floor(Math.random() * 30) + 1;
    // Genera un número aleatorio para la coordenada Y del alimento. Sigue el mismo proceso que food_position_x para generar un número aleatorio entre 1 y 30, que se asigna a la variable food_position_y.
    food_position_y = Math.floor(Math.random() * 30) + 1;
}

// Esta funcion maneja lo que deberia pasar cuando se acaba el juego
const handleGameOver = function() {
    //Esta línea utiliza la función clearInterval() para detener el intervalo de tiempo que se haya establecido previamente. 
    //El parámetro interval_id hace referencia a un identificador único que se utiliza para identificar el intervalo de tiempo que se desea detener. 
    clearInterval(interval_id);
    // alert("Game Over");: Esta línea muestra una ventana emergente (alerta) con el mensaje "Game Over". La función alert() se utiliza para mostrar un mensaje en una ventana de diálogo simple en el navegador.
    alert("Game Over");
    //  recargar la página actual. Al llamar a location.reload()la página se volverá a cargar y reiniciará el juego.
    location.reload(); 
}

// la función changeSnakeDirection cambia la dirección de movimiento en función de la tecla presionada. Modifica las variables movement_x y movement_y para reflejar la nueva dirección de movimiento, asegurándose de que no se produzcan cambios de
const changeSnakeDirection = function(event){
    //  Esta condición verifica si la tecla presionada es la flecha hacia arriba (ArrowUp)
    
    // Si la velocidad en el eje Y no es igual a 1 
    // Si ambas condiciones son verdaderas, se ejecuta el bloque de código dentro de esta condición.
    if (event.key === "ArrowUp" && movement_y != 1) {
        //establece la velocidad en el eje X a 0, lo que significa que no hay movimiento horizontal.
        movement_x = 0;
        //establece la velocidad en el eje Y a -1, lo que significa que el movimiento es hacia arriba.
        movement_y = -1;
        //Esta condición verifica si la tecla presionada es la flecha hacia abajo ,y si la velocidad en el eje X no es igual a -1
    } else if (event.key === "ArrowDown" && movement_y != -1) {
        //establece la velocidad en el eje X a 1, lo que significa que el movimiento es hacia la derecha.
        movement_x = 0;
        //establece la velocidad en el eje X a 1, lo que significa que el movimiento es hacia la derecha.
        movement_y = 1;
    } else if (event.key === "ArrowLeft" && movement_x != 1) {
        movement_x = -1;
        movement_y = 0;
    } else if (event.key === "ArrowRight" && movement_x != -1) {
        movement_x = 1;
        movement_y = 0;
    } 
}

// Esta funcion chequea si se ha consumido una manzana y que deberia pasar cuando pasa eso
const ifAppleEaten = function() {
    if(snake_position_x === food_position_x && snake_position_y === food_position_y){
        //el audio almacenado en el objeto audio y se play iniciar music
        audio_shot.play()
        //Introduce una nueva posicion en el snake para hacerla mas grande, en este caso se añade la posicion de la comida 
        snake_body.push([food_position_x, food_position_y]);
        // score++ Se incrementa la puntuacion del jugador en 1
        score ++;
        // Si el puntaje es mayor a el mayor puntaje guardado se le asigna ese nuevo puntaje, de lo contrario se deja igual
        high_score =  score >= high_score ? score : high_score;
        // Aqui se actualiza el valor del elemeto
        localStorage.setItem(highScoreElement, high_score);
        // Aqui se va modificando el elemento score, actualizando el texto cada que se consume una fruta
        scoreElement.innerHTML = `Score: ${score}`;
        // Si se modifica la variable high-score tambien debe actulizarse el elemento highScore
        highScoreElement.innerHTML = `High Score: ${high_score}`;
        // Debe cambiarse la posicion de la nueva manzana
        changeFoodPosition();
    }
}

// verifica si el juego ha terminado antes de inicializarlo
const initGame = function() {
    //Si la variable game_over es verdadera, la función handleGameOver() se llama y se detiene el proceso de inicialización del juego.
    if(game_over) handleGameOver();

    // es una division HTML que se refiere a la comida y donde estara posicionada utilizando grid area
    // la division de play-board debe contener el atributo display en grid para que funcione
    let hmtlMarkup = `<div class="food" style="grid-area: ${food_position_y} / ${food_position_x}"></div>`;
    // snake_body.push([food_position_x, food_position_y]);: Se agrega un nuevo elemento a la matriz 

    ifAppleEaten()
    
    for(let i = snake_body.length - 1; i > 0; i--){
        snake_body[i] = snake_body[i - 1]
    }

    // está fuera de los límites del tablero
    snake_body[0] = [snake_position_x, snake_position_y];

    snake_position_x += movement_x;
    snake_position_y += movement_y;

    //  límites del tablero  , la variable "gameOver" se establece en verdadero (true).
    if (snake_position_x <= 0 || snake_position_x > 30 || snake_position_y <= 0 || snake_position_y > 30) {
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
interval_id = setInterval(initGame, delay_interval);
document.addEventListener("keydown", changeSnakeDirection);


 