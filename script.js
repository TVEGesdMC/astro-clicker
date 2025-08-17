let asteroids = 0;
let offlineEarnings = 0;
let autoClickerActive = false;
let autoClickerInterval;
let upgrades = [
    { name: "Asteroid Miner", cost: 50, multiplier: 1 },
    { name: "Space Drill", cost: 200, multiplier: 5 },
    { name: "Asteroid Factory", cost: 1000, multiplier: 20 }
];

function updateDisplay() {
    document.getElementById("earnings").innerText = `Asteroids: ${asteroids}`;
    document.getElementById("offline-earnings").innerText = `Offline Earnings: ${offlineEarnings}`;
}

function clickAsteroid() {
    asteroids += 1;
    updateDisplay();
}

function buyUpgrade(index) {
    if (asteroids >= upgrades[index].cost) {
        asteroids -= upgrades[index].cost;
        offlineEarnings += upgrades[index].multiplier; // Add to offline earnings
        updateDisplay();
        generateUpgradeList(); // Refresh the upgrade list
    }
}

function generateUpgradeList() {
    const upgradeList = document.getElementById("upgrade-list");
    upgradeList.innerHTML = ""; // Clear existing upgrades
    upgrades.forEach((upgrade, index) => {
        const li = document.createElement("li");
        li.innerText = `${upgrade.name} - Cost: ${upgrade.cost} Asteroids`;
        li.onclick = () => buyUpgrade(index);
        upgradeList.appendChild(li);
    });
}

function saveGame() {
    const gameData = {
        asteroids,
        offlineEarnings,
        autoClickerActive
    };
    localStorage.setItem("astroClickerData", JSON.stringify(gameData));
}

function loadGame() {
    const savedData = localStorage.getItem("astroClickerData");
    if (savedData) {
        const gameData = JSON.parse(savedData);
        asteroids = gameData.asteroids || 0;
        offlineEarnings = gameData.offlineEarnings || 0;
        autoClickerActive = gameData.autoClickerActive || false;
        updateDisplay();
    }
}

function startAutoClicker() {
    if (!autoClickerActive) {
        autoClickerActive = true;
        autoClickerInterval = setInterval(() => {
            asteroids += offlineEarnings; // Earn asteroids based on offline earnings
            updateDisplay();
        }, 1000);
    }
}

document.getElementById("asteroid").onclick = clickAsteroid;
document.getElementById("save-button").onclick = saveGame;

window.onload = () => {
    loadGame();




