const gameBoard = document.querySelector('.game-board');
const moveCountEl = document.getElementById('move-count');
const restartBtn = document.getElementById('restart-btn');
const winMessage = document.getElementById('win-message');

// 1. Card Data
const cardsArray = ['html', 'css', 'js', 'react', 'node', 'mongo', 'git', 'github'];
let gameCards = [...cardsArray, ...cardsArray];

// 2. Shuffle Cards
function shuffleCards() {
  gameCards.sort(() => 0.5 - Math.random());
}

// 3. Create Card Elements
function createCards() {
  gameBoard.innerHTML = '';
  shuffleCards();
  gameCards.forEach(name => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    card.innerHTML = `
      <div class="front"></div>
      <div class="back">
        <img src="images/${name}.svg" alt="${name}">
      </div>
    `;

    gameBoard.appendChild(card);
  });
}

// 4. Game Logic
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

function updateMoveCount() {
  moves++;
  moveCountEl.textContent = moves;
}

function checkMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs++;

    if (matchedPairs === cardsArray.length) {
      winMessage.style.display = 'block';
    }

    resetTurn();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// 5. Flip Logic
function setupCardEvents() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

      card.classList.add('flip');

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        updateMoveCount();
        checkMatch();
      }
    });
  });
}

// 6. Restart Button
restartBtn.addEventListener('click', () => {
  moves = 0;
  matchedPairs = 0;
  moveCountEl.textContent = 0;
  winMessage.style.display = 'none';
  createCards();
  setTimeout(setupCardEvents, 200);
});

// Init
createCards();
setTimeout(setupCardEvents, 200);