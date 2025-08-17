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
        li.onclick = () => buyUpgrade(index); // Add click event to buy the upgrade
        upgradeList.appendChild(li);
    });
}

function startAutoClicker() {
    if (!autoClickerActive) {
        autoClickerActive = true;
        autoClickerInterval = setInterval(() => {
            asteroids += 1; // Automatically collect asteroids
            updateDisplay();
        }, 1000); // Collect 1 asteroid every second
    }
}

function stopAutoClicker() {
    if (autoClickerActive) {
        clearInterval(autoClickerInterval);
        autoClickerActive = false;
    }
}

// Call this function to initialize the game
function initGame() {
    updateDisplay();
    generateUpgradeList();
}

// Initialize the game when the page loads
window.onload = initGame;

// Add event listener for the click button
document.getElementById("click-button").addEventListener("click", clickAsteroid);
