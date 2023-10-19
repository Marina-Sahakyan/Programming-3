let side = 10;
const sideX = 10;
const sideY = 10;

const socket = io();

socket.on("update matrix", drawful)

function setup() {
   createCanvas(matrix[0].length * side, matrix.length * side);
   background('#acacac');

}
   
   // createCanvas(501, 501);
   // background('white');
   // new Grass(1, 0)
   // new Grass(6, 7)
   // new GrassEater(5, 5)
   // new GrassEater(7, 6)
   // new Gishatich(7, 8)
   // new Gishatich(12, 15)
   // new Person(2, 1)
   // new Person(3, 2)
   // new Person(4, 3)

function drawful(matrix) {

   fill('white')
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
         if (matrix[y][x] == 0) {
            fill('white')
         }
         else if (matrix[y][x] == 1) {
            fill('green')
         }
         else if (matrix[y][x] == 2) {
            fill('yellow')
         }
         else if (matrix[y][x] == 3) {
            fill('red')
         }
         else if (matrix[y][x] == 4) {
            fill("black")
         }

         rect(x * 10, y * 10, 10, 10)

      }
   }
   
}
socket.on('update matrix', playGame)

// function setup(){
//     createCanvas(500,500);
//     background("grey");
//     frameRate(3);
// }
// function draw(){

//     fill("blue");
//     for(let y = 0;y<10;y++){


//            let x=random(100)
//             ellipse(x*50,y*50,10,10)

//     }
// }
