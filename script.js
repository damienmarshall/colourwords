const colors = [
    { name: 'Red', irish: 'Dearg', hex: '#E74C3C' },
    { name: 'Blue', irish: 'Gorm', hex: '#3498DB' },
    { name: 'Green', irish: 'Glas', hex: '#27AE60' },
    { name: 'Yellow', irish: 'Buí', hex: '#F1C40F' },
    { name: 'Orange', irish: 'Oráiste', hex: '#E67E22' },
    { name: 'Purple', irish: 'Corcra', hex: '#9B59B6' },
    { name: 'Pink', irish: 'Bándearg', hex: '#FD79A8' },
    { name: 'Black', irish: 'Dubh', hex: '#2D3436' },
    { name: 'White', irish: 'Bán', hex: '#FFFFFF' },
    { name: 'Brown', irish: 'Donn', hex: '#8B4513' },
    { name: 'Grey', irish: 'Liath', hex: '#BDC3C7' }
];

let score = 0;
let currentTargetColor = null;

const irishWordDisplay = document.getElementById('irish-word');
const gameContainer = document.querySelector('.game-container');
const optionsContainer = document.getElementById('options');
const scoreValue = document.getElementById('score-value');
const feedbackText = document.getElementById('feedback-text');

function initGame() {
    pickNewColor();
}

function pickNewColor() {
    // Reset feedback
    feedbackText.textContent = '';
    feedbackText.className = '';

    // Pick a random target color
    const randomIndex = Math.floor(Math.random() * colors.length);
    currentTargetColor = colors[randomIndex];

    // Display the Irish word
    irishWordDisplay.textContent = currentTargetColor.irish;

    // Create options (1 correct, 2 wrong)
    const options = [currentTargetColor];

    while (options.length < 3) {
        const randomWrong = colors[Math.floor(Math.random() * colors.length)];
        if (!options.find(o => o.name === randomWrong.name)) {
            options.push(randomWrong);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // Render buttons
    renderOptions(options);
}

function renderOptions(options) {
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('div');
        btn.className = 'color-option';
        btn.style.backgroundColor = option.hex;
        btn.onclick = () => handleChoice(option);
        optionsContainer.appendChild(btn);
    });
}

function handleChoice(selectedColor) {
    if (selectedColor.name === currentTargetColor.name) {
        handleCorrect();
    } else {
        handleWrong();
    }
}

function handleCorrect() {
    score++;
    scoreValue.textContent = score;
    feedbackText.textContent = 'Iontach!';

    // Vary the angle for extra personality!
    const randomAngle = (Math.random() - 0.5) * 40; // -20 to 20 degrees
    feedbackText.style.setProperty('--burst-angle', `${randomAngle}deg`);

    feedbackText.className = 'feedback-correct';

    // Spawn rewarding confetti!
    spawnConfetti();

    // Disable clicks during transition
    optionsContainer.style.pointerEvents = 'none';

    setTimeout(() => {
        optionsContainer.style.pointerEvents = 'all';
        pickNewColor();
    }, 1000);
}

function spawnConfetti() {
    const particleCount = 60;
    const colors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8'];

    // Get the position of the feedback word
    const rect = feedbackText.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5 + 'px';

        confetti.style.backgroundColor = color;
        confetti.style.width = size;
        confetti.style.height = size;

        // Start position (at the "Iontach" word)
        confetti.style.left = centerX + 'px';
        confetti.style.top = centerY + 'px';
        confetti.style.position = 'fixed';

        // Animation destination
        const destX = (Math.random() - 0.5) * 600;
        const destY = (Math.random() - 0.5) * 600;
        const rotation = Math.random() * 720;

        confetti.style.setProperty('--dest-x', `${destX}px`);
        confetti.style.setProperty('--dest-y', `${destY}px`);
        confetti.style.setProperty('--rotation', `${rotation}deg`);

        document.body.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 1200);
    }
}


function handleWrong() {
    feedbackText.textContent = 'Bain triail eile as!';
    feedbackText.className = 'feedback-wrong';

    // Shake the whole container
    gameContainer.classList.add('shake-container');
    setTimeout(() => {
        gameContainer.classList.remove('shake-container');
    }, 500);
}

// Start the game
initGame();
