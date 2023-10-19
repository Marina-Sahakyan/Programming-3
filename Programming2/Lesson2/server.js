var express = require("express");
var app = express();

app.use(express.static("."));

app.get("/", function(req, res){
   res.redirect("index.html");
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

let random= require("./random")

matrix = []
grassArr = [];
grassEaterArr = [];
gishatichArr = [];
personArr = [];

let Grass = require("./grass.js");
let GrassEater = require("./grassEater.js");
let Gishatich = require("./gishatich.js");
let Person = require("./person.js");

function generateMatrix(size, grassCount, grassEaterCount) {
   for (let y = 0; y < size; y++) {
      matrix[y] = []
      for (let x = 0; x < size; x++) {
         matrix[y].push(0)
      }
   }

   for (let i = 0; i < grassCount; i++) {
      let x = Math.round(Math.random() * (size - 1))
      let y = Math.round(Math.random() * (size - 1))
      if (matrix[y][x] == 0) {
         new Grass(x, y)
      }
      else {
         i--
      }
   }
   for (let i = 0; i < grassEaterCount; i++) {
      let x = Math.round(Math.random() * (size - 1))
      let y = Math.round(Math.random() * (size - 1))
      if (matrix[y][x] == 0) {
         new GrassEater(x, y)
      }
      else {
         i--

      }
   }


}
generateMatrix(50, 10, 4)

let z;
for (let y = 0; y < 50; y++) {
   matrix[y] = []
   for (let x = 0; x < 50; x++) {
      z = Math.round(Math.random() * 0)
      matrix[y].push(z);

   }
}

function createGame(){
   for (var y = 0; y < matrix.length; ++y) {
      for (var x = 0; x < matrix[y].length; ++x) {
          if (matrix[y][x] == 1) {
              var gr = new Grass(x, y, 1);
              grassArr.push(gr);
          }
          else if (matrix[y][x] == 2) {
              var gre = new GrassEater(x, y, 2)
              grassEaterArr.push(gre)
          }
          else if (matrix[y][x] == 3) {
              var gish = new Gishatich(x, y, 3)
              gishatichArr.push(gish)
          }
          else if (matrix[y][x] == 4) {
              var per = new Person(x, y, 4)
              personArr.push(per)
          }    
      }
  }
}

function playGame(){
   for (let i in grassArr) {
      grassArr[i].mul()
   }
   for (let i in grassEaterArr) {
      grassEaterArr[i].start()
   }
   for (let i in gishatichArr) {
      gishatichArr[i].start()
   }
   for (let i in personArr) {
      personArr[i].start()
   }
   io.emit('update matrix',matrix)
}

let intervalID;

function startGame(){
   clearInterval(intervalID)
   setInterval(() => {
      playGame()
   },1000);
}
io.on("connection",function (socket){
   socket.emit('update matrix',matrix)
   createGame()
   startGame()
})