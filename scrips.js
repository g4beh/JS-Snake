const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

// Variables
let game_over = false;
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
highScoreElement.innerHTML = `High Score: ${highScore}`;

// genera coordenadas X e Y aleatorias para un alimento dentro de una cuadricula
const changeFoodPosition = () => {
//genera un numero aleatorio entre 0 y 29 utilizando Math.random()
    foodX = Math.floor(Math.random() * 30) + 1;
    //genera un número aleatorio para la coordenada Y del alimento. Sigue el mismo proceso que foodX para generar un número aleatorio entre 1 y 30, que se asigna a la variable foodY.
    foodY = Math.floor(Math.random() * 30) + 1;
}

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
        // Aquí se crea una instancia de Audio y se le pasa el archivo de sonido  y se pasa play para reproducir 
        const audio = new Audio("RAFAGA DE DISPAROS - EFECTO DE SONIDO.mp3"); audio. play() //el audio almacenado en el objeto audio y se play iniciar music
        if (  sonidos.innerHTML = src="el prostipirugolfo.mp3" ){ //condición verifica si el contenido HTML de un elemento con el id sonidos tiene un atributo src
            function aleatorio(inferior,superior){// Esta línea calcula el número de posibilidades dentro del rango especificado restando
                numPosibilidades = superior - inferior
                aleat = Math.random() * numPosibilidades // genera un número aleatorio entre 0 (inclusive) y numPosibilidades (no inclusivo) utilizando Math.random()
                aleat = Math.floor(aleat) //redondea el número aleatorio hacia abajo utilizando Math.floor() para obtener un número entero.
                return parseInt(inferior) + aleat//Esta línea devuelve el número aleatorio generado sumado al valor inferior (convertido en entero utilizando parseInt()). Esto garantiza que el número aleatorio caiga dentro del rango especificado por inferior y superior.
             }
             hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
             // lo aguarda en posarray 
             posarray = aleatorio(0,hexadecimal.length)
             valor_hexadecimal_aleatorio = hexadecimal[posarray]
        
             hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
        color_aleatorio = "#";
        for (i=0;i<6;i++){
           posarray = aleatorio(0,hexadecimal.length)
           color_aleatorio += hexadecimal[posarray]
        }
        function dame_color_aleatorio(){
            hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
            // "#" que representa el inicio de un color hexadecimal
            color_aleatorio = "#";
            //bucle for que se ejecuta 6 veces (para generar 6 digitos hexadecimales que representan el color RGB).
            for (i=0;i<6;i++){
                // 0 y la longitud del array hexadecimal utilizando la funcion aleatorio.
               posarray = aleatorio(0,hexadecimal.length)
               color_aleatorio += hexadecimal[posarray]
            }
            return color_aleatorio
         }
        }
        highScore =  score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`

        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }
    
    for(let i = snake_body.length - 1; i > 0; i--){
        snake_body[i] = snake_body[i - 1]
    }

    snake_body[0] = [snakeX, snakeY];

    snakeX += movement_x;
    snakeY += movement_y;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      game_over = true; 
    }

    for(let i = 0; i < snake_body.length; i++){
        hmtlMarkup += `<div class="head" style="grid-area: ${snake_body[i][1]} / ${snake_body[i][0]}"></div>`;
        if(i !== 0 && snake_body[0][1] === snake_body[i][1] && snake_body[0][0] === snake_body[i][0]){
            game_over = true;
        }

    }
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
 