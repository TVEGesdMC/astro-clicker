let asteroids = 0;
let offlineEarnings = 0;
let autoClickerActive = false;
let autoClickerInterval;
let upgrades = [
    { name: "Asteroid Miner", cost: 50, multiplier: 1 },
    { name: "Asteroid Factory", cost: 200, multiplier: 5 },
    { name: "Asteroid Planet", cost: 1000, multiplier: 20 }
];

function updateDisplay() {
    document.getElementById('earnings').innerText = `Asteroids: ${asteroids}`;
    document.getElementById('offline-earnings').innerText = `Offline Earnings: ${offlineEarnings}`;
}

function generateUpgradeList() {
    const upgradeList = document.getElementById('upgrade-list');
    upgradeList.innerHTML = '';
    upgrades.forEach((upgrade, index) => {
        const li = document.createElement('li');
        li.innerText = `${upgrade.name} - Cost: ${upgrade.cost} (x${upgrade.multiplier})`;
        li.onclick = () => buyUpgrade(index);
        upgradeList.appendChild(li);
    });
}

function buyUpgrade(index) {
    if (asteroids >= upgrades[index].cost) {
        asteroids -= upgrades[index].cost;
        offlineEarnings += upgrades[index].multiplier;
        updateDisplay();
        generateUpgradeList();
    }
}

document.getElementById('asteroid').onclick = () => {
    asteroids++;
    updateDisplay();
};

document.getElementById('save-button').onclick = saveGame;

function saveGame() {
    const gameData = {
        asteroids,
        offlineEarnings,
        autoClickerActive
    };
    localStorage.setItem('astroclicker', JSON.stringify(gameData));
}

function loadGame() {
    const savedData = localStorage.getItem('astroclicker');
    if (savedData) {
        const gameData = JSON.parse(savedData);
        asteroids = gameData.asteroids;
        offlineEarnings = gameData.offlineEarnings;
        autoClickerActive = gameData.autoClickerActive;
        updateDisplay();
    }
}

function startAutoClicker() {
    if (!autoClickerActive) {
        autoClickerActive = true;
        autoClickerInterval = setInterval(() => {
            asteroids += 1; // Adjust the increment based on your game design
            updateDisplay();
        }, 1000);
    }
}

window.onload = () => {
    loadGame();
    generateUpgradeList();
    if (autoClickerActive) {
        startAutoClicker();
    }
};
