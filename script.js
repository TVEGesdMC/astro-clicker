let astroPoints = 0;
let clickValue = 1;
let miningDrones = 0;
let advancedDrones = 0;
let spaceStations = 0;
let lastSaveTime = Date.now();
let achievements = [];

const astroPointsElement = document.getElementById('astroPoints');
const achievementMessage = document.getElementById('achievementMessage');

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
    saveGame();
}

function saveGame() {
    localStorage.setItem('astroPoints', astroPoints);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('miningDrones', miningDrones);
    localStorage.setItem('advancedDrones', advancedDrones);
    localStorage.setItem('spaceStations', spaceStations);
    localStorage.setItem('lastSaveTime', Date.now());
}

function loadGame() {
    if (localStorage.getItem('astroPoints')) {
        astroPoints = parseInt(localStorage.getItem('astroPoints'));
        clickValue = parseInt(localStorage.getItem('clickValue'));
        miningDrones = parseInt(localStorage.getItem('miningDrones'));
        advancedDrones = parseInt(localStorage.getItem('advancedDrones'));
        spaceStations = parseInt(localStorage.getItem('spaceStations'));
        lastSaveTime = parseInt(localStorage.getItem('lastSaveTime'));

        const timeElapsed = (Date.now() - lastSaveTime) / 1000;
        astroPoints += timeElapsed * (miningDrones * 1 + advancedDrones * 10 + spaceStations * 100);
    } else {
        achievements.push('Welcome to Astroclicker!');
        displayAchievement();
    }
    updateDisplay();
}

function displayAchievement() {
    achievementMessage.textContent = achievements.join('\n');
    setTimeout(() => {
        achievementMessage.textContent = '';
    }, 5000);
}

setInterval(() => {
    astroPoints += miningDrones * 1 + advancedDrones * 10 + spaceStations * 100;
    updateDisplay();
}, 1000);

loadGame();
