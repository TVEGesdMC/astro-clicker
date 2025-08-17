let astroPoints = 0;
let clickValue = 1;
let miningDrones = 0;
let advancedDrones = 0;
let spaceStations = 0;

const astroPointsElement = document.getElementById('astroPoints');

function clickForPoints() {
    astroPoints += clickValue;
    updateDisplay();
}

function upgradeClickSpeed() {
    if (astroPoints >= 100) {
        astroPoints -= 100;
        clickValue += 1;
        updateDisplay();
    }
}

function buyMiningDrone() {
    if (astroPoints >= 500) {
        astroPoints -= 500;
        miningDrones += 1;
        updateDisplay();
    }
}

function buyAdvancedDrone() {
    if (astroPoints >= 5000) {
        astroPoints -= 5000;
        advancedDrones += 1;
        updateDisplay();
    }
}

function buySpaceStation() {
    if (astroPoints >= 50000) {
        astroPoints -= 50000;
        spaceStations += 1;
        updateDisplay();
    }
}

function updateDisplay() {
    astroPointsElement.textContent = astroPoints;
}

setInterval(() => {
    astroPoints += miningDrones * 1;
    astroPoints += advancedDrones * 10;
    astroPoints += spaceStations * 100;
    updateDisplay();
}, 1000);
