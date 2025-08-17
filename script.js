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
