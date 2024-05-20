const DEFAULT_SPEED = 5.5;
const MEAN_DISTANCE = 913.2;

class Mount {
    constructor(delay, moveBonus, gallopBonus, carryLoad) {
        this.mountDelay = delay;
        this.moveBonus = moveBonus;
        this.gallopBonus = gallopBonus;
        this.carryLoad = carryLoad;
    }

    travelTime() {
        // The estimated value shall be only an estimation
        const speed0 = DEFAULT_SPEED + DEFAULT_SPEED * this.moveBonus;
        const speed1 = DEFAULT_SPEED + DEFAULT_SPEED * this.gallopBonus;
        const timeFinal = (MEAN_DISTANCE - this.mountDelay * speed0) / speed1 + this.mountDelay;
        return timeFinal / 60; // converting to minutes
    }

    cityTravelTime(map, startCity, destinationCity) {
        const tileTime = this.travelTime();
        if (map[startCity]["NeighbouringCities"].hasOwnProperty(destinationCity)) {
            return tileTime * map[startCity]["NeighbouringCities"][destinationCity];
        } else {
            let minDistance = 1000;
            const neighbouringCities = map[startCity]["NeighbouringCities"];
            let distanceFromStart = 0;
            for (const index in neighbouringCities) {
                const temp = neighbouringCities[index];
                if (map[index]["NeighbouringCities"].hasOwnProperty(destinationCity) &&
                    minDistance > map[index]["NeighbouringCities"][destinationCity] + temp) {
                    minDistance = map[index]["NeighbouringCities"][destinationCity];
                    distanceFromStart = map[startCity]["NeighbouringCities"][index];
                }
            }
            minDistance += distanceFromStart;
            return tileTime * minDistance;
        }
    }

    getCarryLoad() {
        return this.carryLoad;
    }
}
export {Mount};