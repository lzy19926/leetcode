

class Man {
    constructor(name, maxDickLength) {
        this.name = name
        this.currentDickLength = maxDickLength * 0.3
        this.maxDickLength = maxDickLength
        this.energy = 100
    }
    love() {
        return new Error("Not Available")
    }

    sex(woman) {

        const _womanFeelCb = (feel, err) => {
            if (err) {
                console.error("Fxxk you", err)
                this.energy = -1
            }

            switch (feel) {
                case "perfect": this.energy += 1;
                    break;
                case "good":
                    break;
                case "normal": this.energy -= 1;
                    break;
                default:
            }
        }

        const _sexCycle = () => {
            const feelPoint = this.getCurrentDickLength(woman) * this.energy / 100

            woman.sexSync(feelPoint, _womanFeelCb)

            this.energy--
        }

        setInterval(_sexCycle.bind(this), 1000)
    }

    getCurrentDickLength(woman) {
        this.currentDickLength = woman.beauty / 100 * maxDickLength
        return this.currentDickLength
    }
}

new Man("铁心", 8)