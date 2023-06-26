class Snake{

    constructor(){
        this.length = 5;
        this.direction = "right";
        this.cells = [];
    }

    createSnake(){

        pen.fillRect(init_x,init_y,cs,cs)
    }

    drawSnake(){

        for(let i=0; i<this.length; i++){

            this.cells.push({

                x : i,
                y : 0
            })

        }

    }

    update(){



    }


}


const canvas = document.getElementById('canvas');
    const pen = canvas.getContext("2d");

    pen.fillStyle = "yellow";

    const cs = 20;

    let snake = new Snake;

    const init_x = 10;
    const init_y = 10;


    function init(){

        // initialize the snake on start
        // pen.fillRect(init_x,init_y,20,20); //(x-axis, y-axis, width, height); 
        snake.createSnake();

    }

    function draw(){


        // pen.clearRect(0,0,1200,600); // clear the canvas before drawing on the canvas
        // pen.fillRect(init_x,init_y,20,20); 

        snake.drawSnake()

    }

    // function update(){

    //     init_x = init_x + 10;


    // }

    // function gameLoop(){

    //     draw();
    //     update();
    // }



    // setInterval(gameLoop,1000);

