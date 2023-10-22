var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);
let random = require("./random")
app.use(express.static("."));

app.get("/", function (req, res) {
   res.redirect("index.html");
});

server.listen(3000, function () {
   console.log("Example is running on port 3000");
});



var Grass = require('./grass')
var GrassEater = require('./grassEater')
var Gishatich = require('./gishatich')
var Person = require('./person')




sideX = 100;
sideY = 100;

grassArr = []
grassEaterArr = []
gishatichArr = []
personArr = []
matrix = []


function createMatrix() {

   for (let i = 0; i < sideX; i++) {
      matrix.push([])
      for (let j = 0; j < sideY; j++) {
         matrix[i].push(0)
      }
   }

   function character(char, qantity) {
      for (let i = 0; i < qantity; i++) {
         var x = random(sideX);
         var y = random(sideY)
         matrix[x][y] = char;

      }
   }


   character(1, 100);
   character(2, 50);
   character(3, 1);
   character(4, 1);

   for (var y = 0; y < matrix.length; ++y) {
      for (var x = 0; x < matrix[y].length; ++x) {

         if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);

         }
         else if (matrix[y][x] == 2) {
            var gre = new GrassEater(x, y, 2);
            grassEaterArr.push(gre);
         }
         else if (matrix[y][x] == 3) {
            var gish = new Gishatich(x, y, 3);
            gishatichArr.push(gish);
         }
         else if (matrix[y][x] == 4) {
            var per = new Person(x, y, 4);
            personArr.push(per);
         }

      }
   }
}

createMatrix()

// function createGame() {
//    for (var y = 0; y < matrix.length; ++y) {
//       for (var x = 0; x < matrix[y].length; ++x) {
//          if (matrix[y][x] == 1) {
//             var gr = new Grass(x, y, 1);
//             grassArr.push(gr);
//          }
//          else if (matrix[y][x] == 2) {
//             var gre = new GrassEater(x, y, 2)
//             grassEaterArr.push(gre)
//          }
//          else if (matrix[y][x] == 3) {
//             var gish = new Gishatich(x, y, 3)
//             gishatichArr.push(gish)
//          }
//          else if (matrix[y][x] == 4) {
//             var per = new Person(x, y, 4)
//             personArr.push(per)
//          }
//       }
//    }
// }


function playGame() {
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
   io.emit('update matrix', matrix)
}



  
   setInterval(() => {
      playGame()
   }, 200);

io.on("connection", function (socket) {
   socket.emit('update matrix', matrix)
  
 
})