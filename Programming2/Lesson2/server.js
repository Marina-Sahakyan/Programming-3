var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);
let random = require("./random");
let fs =require('fs');
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
var Kaycak = require('./kaycak')
var Bomb = require('./bomb')




sideX = 100;
sideY = 100;

grassArr = []
grassEaterArr = []
gishatichArr = []
personArr = []
kaycakArr = []
bombArr = []
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


   character(1, 50);
   character(2, 50);
   character(3, 50);
   character(4, 20);
   character(5, 50)
   character(6, 4)

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
         else if (matrix[y][x] == 5) {
            var kayc = new Kaycak(x, y, 5);
            personArr.push(kayc)
         }
        else if(matrix[y][x]== 6){
           var b= new Bomb(x ,y, 6);
           bombArr.push(b)
        }
      }
   }
}

createMatrix()

io.on('connection', (socket) => {
   socket.emit('draw matrix', matrix)
   socket.on('Total statistics', (data) => {
     fs.writeFileSync('data.json', JSON.stringify(data))
     socket.emit('display statistics', data)
   })
 
 })

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
   for (let i in kaycakArr) {
      kaycakArr[i].start()
   }
   for(let i in bombArr){
      bombArr[i].start()
   }
   io.emit('update matrix', matrix)
}




setInterval(() => {
   playGame()
}, 200);

io.on("connection", function (socket) {
   socket.emit('update matrix', matrix)


})
