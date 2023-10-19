const LivingCreature =require('./livingCreature')

module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super()
        this.x = x
        this.y = y
        this.multiplay = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]];
        matrix[y][x] = 1
        grassArr.push(this)
    }
    mul() {
        this.multiplay++
        if (this.multiplay >= 1) {
            let emptyCells = this.chooseCell(0)


            if (emptyCells.length > 0) {
                let randIndex = Math.round(Math.random() * (emptyCells.length - 1))


                let x = emptyCells[randIndex][0]
                let y = emptyCells[randIndex][1]

                matrix[y][x] = 1
                let gr = new Grass(x, y)
            }


            this.multiplay = 0

        }
    }
}
