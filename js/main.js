const canvas = document.getElementById('canvas');
const game_over = document.querySelector('#game_over');
const buttons = document.querySelector('#buttons');


const pen = canvas.getContext("2d");

pen.fillStyle = "yellow";
const cw = canvas.width;
const ch = canvas.height;
const cs = 20;

let food = null;
let count = 0;
let time = 80;
let intervalId;


function playGame(){


    class Snake {

        constructor() {
            this.length = 5;
            this.direction = "right";
            this.cells = [];
        }

        createSnake() {

            for (let i = 0; i < this.length; i++) {

                this.cells.push({
                    x: i,
                    y: 0
                })

            }
        }

        drawSnake() {

            for (let i = 0; i < this.cells.length; i++) {

                const cell = this.cells[i];

                if (i === this.cells.length - 1) {

                    pen.fillStyle = "red";
                }
                else {
                    pen.fillStyle = "yellow";
                }

                // making snake using cordinates
                let x = cell.x;
                let y = cell.y;

                pen.fillRect(x * cs, y * cs, cs - 2, cs - 2);
            }
        }

        updateSnake() {


            let headX = this.cells[this.cells.length - 1].x;
            let headY = this.cells[this.cells.length - 1].y;

            let nextX;
            let nextY;


            for (let i = 0; i < this.cells.length - 1; i++) {

                let cell = this.cells[i];
                if (cell.x === headX && cell.y === headY) {
                    gameOver();
                    game_over.classList.remove("none");
                    return;
                }
            }

            if (headX === food.x && headY === food.y) {

                food = randomFood();
                count++;
                // updateTime();
            }
            else {
                this.cells.shift();
            }

            if (this.direction === "right") {

                nextX = headX + 1;
                nextY = headY;

                if (nextX * cs > cw - cs) {
                    gameOver();
                    game_over.classList.remove("none");
                }

            }

            else if (this.direction === "down") {

                nextX = headX;
                nextY = headY + 1;

                if (nextY * cs > ch - cs) {

                    gameOver();
                    game_over.classList.remove("none");
                }
            }

            else if (this.direction === "up") {

                nextX = headX;
                nextY = headY - 1;

                if (nextY * cs < 0) {

                    gameOver();
                    game_over.classList.remove("none");
                }
            }
            else if (this.direction === "left") {

                nextX = headX - 1;
                nextY = headY;

                if (nextX * cs < 0) {

                    gameOver();
                    game_over.classList.remove("none");
                }
            }

            this.cells.push({

                x: nextX,
                y: nextY

            }) 
        }
    }



    let snake = new Snake;


    function init() {

        // initialize the snake on start
        snake.createSnake();
        food = randomFood();

        function keypressed(e) {

            if (e.key == "ArrowDown") {

                snake.direction = "down";
            }
            else if (e.key == "ArrowUp") {

                snake.direction = "up";
            }
            else if (e.key == "ArrowLeft") {

                snake.direction = "left";
            }
            else {

                snake.direction = "right";
            }
        }

        document.addEventListener('keydown', keypressed);
    }



    function draw() {

        pen.clearRect(0, 0, 1200, 900);// clear the canvas before drawing on the canvas


        pen.fillStyle = 'white';

        pen.font = "30px sans-serif";
        pen.fillText(`Score : ${count}`, 30, 30);

        pen.fillRect(food.x * cs, food.y * cs, cs - 2, cs - 2);

        snake.drawSnake();


    }

    function update() {

        snake.updateSnake();
        // clearInterval(intervalId);
        // intervalId = setInterval(gameLoop, time);
    }

    function randomFood() {

        // const foodX = Math.floor(Math.random() * 10) * 127;
        // const foodY = Math.floor(Math.random() * 10) * 94;


        let foodX = Math.floor(Math.random() * (cw - cs) / cs);
        let foodY = Math.floor(Math.random() * (ch - cs) / cs);



        const foodCordinate = {

            x: foodX,
            y: foodY

        }

        return foodCordinate;

    }

    init();

    function gameLoop() {
        draw();
        update();
    }
    
    // function updateTime(){
        
    //     if (count>5 && count%5){
            
    //         time = time-5;
    //         console.log(time);
    //         return time;
    //     }
        
    // }
    
    // clearInterval(intervalId);

    intervalId = setInterval(gameLoop, time);

    function gameOver() {

        clearInterval(intervalId);

    }

}


playGame();
buttons.addEventListener('click',start);
console.log(time);

function start(e){

    let targetBtn = e.target.closest("button");

    if (targetBtn.innerText.toLowerCase() === "yes") {
        game_over.classList.add("none");
        count = 0;
        playGame();
    }
    else {
        window.close();
    }

}