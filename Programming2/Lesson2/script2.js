let side = 10;
const sideX = 50;
const sideY = 50;
var initialMatrix = []
const socket = io();
var dzmer = false;
var caxik = false;
var xot = false;
var terev = false;
var luys= false;

var p =document.createElement('p')
document.body.appendChild(p)

var clickCount = 0;
function snow() {
   dzmer = true;
   setTimeout(()=>{
      dzmer = false
   }, 100)

}
var button = document.getElementById("winter");
button.addEventListener("click", snow);

function flowers() {
   caxik = true;
   setTimeout(()=>{
      caxik = false
   }, 100)
}
var button = document.getElementById("spring");
button.addEventListener("click", flowers);

function kanach() {
   xot = true;
   setTimeout(()=>{
      xot = false
   }, 100)
}
var button = document.getElementById("summer");
button.addEventListener("click", kanach);

function leaves() {
   terev = true
   setTimeout(()=>{
     terev = false
   }, 100)
}
var button = document.getElementById("autumn");
button.addEventListener("click", leaves);

function light() {
   luys = true
   setTimeout(()=>{
     luys = false
   }, 100)
}
var button = document.getElementById("lightning");
button.addEventListener("click", light);


// socket.on("update matrix", drawful)

function setup() {
   createCanvas(sideX * side, sideY * side);
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
   initialMatrix = matrix

   fill('white')
   for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
         if (matrix[y][x] == 0) {
            fill('white')
         }
         else if (matrix[y][x] == 1) {
            if (xot == true) {
               fill('green')
          
            }
            if (dzmer == true) {
               fill("#BFD8F5")
         
            }
            else if (caxik == true) {
               fill("pink")
            }
            else if (terev == true) {
               fill("orange")
            }
         }

         else if (matrix[y][x] == 2) {
            fill('yellow')
         }
         else if (matrix[y][x] == 3) {
            fill('red')
         }
         else if (matrix[y][x] == 4) {
            fill("#E4B460")
         }
         else if (matrix[y][x] == 5) {
            if(luys==true){
               fill("blue")
            }
            else if (matrix[y][x] == 6) {
               fill("black")
            }
         }

         rect(x * 10, y * 10, 10, 10)

      }
   }




var data = {}

function countAllChar() {
    var allGrassCount = 0;
    var allGrassEaterCount = 0;
    var allGishatichCount=0;
    var allPersonCount=0;

    for (var y = 0; y < initialMatrix.length; y++) {
        for (var x = 0; x < initialMatrix[y].length; x++) {
            if (initialMatrix[y][x] == 1) {
                allGrassCount++;
                data.allGrass = allGrassCount
            }
            if (initialMatrix[y][x] == 2) {
                allGrassEaterCount++;
                data.allGrassEater = allGrassEaterCount
            }
            if (initialMatrix[y][x] == 3) {
               allGishatichCount++;
               data.allGishatich = allGishatichCount
           }
           if (initialMatrix[y][x] == 4) {
            allPersonCount++;
            data.allPerson = allPersonCount
        }
        }
    }

    return data

   }

socket.emit('Total statistics', countAllChar())

  socket.on('display statistics', (data) => {
        statistics = data

        var updatedText = '';
        for (var key in statistics) {
            updatedText += '\n' + key + ' ' + statistics[key];
        }
        p.innerText = updatedText;


    })
   }
socket.on("update matrix", (matrix) => {
   drawful(matrix)
})
socket.on("update matrix", (matrix) => {
   initialMatrix = matrix
})
// socket.on('update matrix', playGame)

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
