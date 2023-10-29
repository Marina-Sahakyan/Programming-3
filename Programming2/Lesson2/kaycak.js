const LivingCreature =require('./livingCreature')
let random = require("./random")
module.exports = class Kaycak extends LivingCreature {
    constructor(x, y) {
        super()
        this.x = x
        this.y = y
        this.energy = 15
        this.directions = [];
        matrix[y][x] = 5
        kaycakArr.push(this)
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch)
    }

    start() {

        if(this.chooseCell(2).length > 0) {
            this.eat()
        }
    }


    eat() {
        this.energy += 10
        let foods = this.chooseCell(2)
        if (foods.length > 0) {
            let randIndex = Math.round(Math.random() * (foods.length - 1))
            let x = foods[randIndex][0]
            let y = foods[randIndex][1]
            matrix[y][x] = 5
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                }

            }
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1);
                }  
            }
            for (let i = 0; i < gishatichArr.length; i++) {
                if (gishatichArr[i].x == x && gishatichArr[i].y == y) {
                    gishatichArr.splice(i, 1);
                }
                
            }
            for (let i = 0; i < personArr.length; i++) {
                if (personArr[i].x == x && personArr[i].y == y) {
                    personArr.splice(i, 1);
                }
                
            }

        }
    }
}
