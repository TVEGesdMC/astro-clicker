let points = 0;
let clickPower = 1;
const pointsDisplay = document.getElementById('points');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');

clickButton.addEventListener('click', () => {
    points += clickPower;
    pointsDisplay.textContent = points;
});

upgradeButton.addEventListener('click', () => {
    if (points >= 10) {
        points -= 10;
        clickPower++;
        pointsDisplay.textContent = points;
        upgradeButton.textContent = `Upgrade Click Power (Cost: ${10 * (clickPower)})`;
    } else {
        alert("Not enough points!");
    }
