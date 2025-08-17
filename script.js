let asteroidCount = 0;
let autoClickers = 0;
let offlineEarnings = 0;
let autoClickerCost = 50;
let upgradeCost = 10;
let autoClickerInterval;

const asteroidElement = document.getElementById('asteroid');
const countElement = document.getElementById('count');
const upgradeButton = document.getElementById('upgradeButton');
const autoClickerButton = document.getElementById('autoClickerButton');
const autoClickerCountElement = document.getElementById('autoClickerCount');
const offlineEarningsElement = document.getElementById('offlineEarnings');

// Load saved data from localStorage
function loadGame() {
    const savedAsteroids = localStorage.getItem('asteroidCount');
    const savedAutoClickers = localStorage.getItem('autoClickers');
    const savedOfflineEarnings = localStorage.getItem('offlineEarnings');

    if (savedAsteroids) {
        asteroidCount = parseInt(savedAsteroids);
    }
    if (savedAutoClickers) {
        autoClickers = parseInt(savedAutoClickers);
    }
    if (savedOfflineEarnings) {
        offlineEarnings = parseInt(savedOfflineEarnings);
    }

    updateDisplay();
}

// Save game data to localStorage
function saveGame() {
    localStorage.setItem('asteroidCount', asteroidCount);
    localStorage.setItem('autoClickers', autoClickers);
    localStorage.setItem('offlineEarnings', offlineEarnings);
}

// Update the display
function updateDisplay() {
    countElement.innerText = `Asteroids: ${asteroidCount}`;
    autoClickerCountElement.innerText = `Auto-Clickers: ${autoClickers}`;
    offlineEarningsElement.innerText = `Offline Earnings: ${offlineEarnings}`;
}

// Click on the asteroid
asteroidElement.addEventListener('click', () => {
    asteroidCount++;
    updateDisplay();
    saveGame();
});

// Upgrade button
upgradeButton.addEventListener('click', () => {
    if (asteroidCount >= upgradeCost) {
        asteroidCount -= upgradeCost;
        upgradeCost *= 2; // Increase cost for next upgrade
        updateDisplay();
        saveGame();
    }
});

// Auto-clicker button
autoClickerButton.addEventListener('click', () => {
    if (asteroidCount >= autoClickerCost) {
        asteroidCount -= autoClickerCost;
        autoClickers++;
        autoClickerCost *= 2; // Increase cost for next auto-clicker
        updateDisplay();
        saveGame();
        startAutoClicker();
    }
});

// Start auto-clicker
function startAutoClicker() {
    if (!autoClickerInterval) {
        autoClickerInterval = setInterval(() => {
            asteroidCount += autoClickers;
            offlineEarnings += autoClickers; // Add to offline earnings
            updateDisplay();
            saveGame();
        }, 1000);
    }
}

// Load game on startup
loadGame();
