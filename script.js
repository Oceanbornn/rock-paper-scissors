const buttons = document.querySelectorAll('.js-move');
const resultEl = document.querySelector('.js-result');
const movesEl = document.querySelector('.js-moves');
const scoreEl = document.querySelector('.js-score');
const resetBtn = document.querySelector('.js-reset');

const moveImages = {
  rock: 'rock-emoji.png',
  paper: 'paper-emoji.png',
  scissors: 'scissors-emoji.png'
};

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScore();

buttons.forEach(button => {
  button.addEventListener('click', () => {
    playGame(button.dataset.move);
  });
});

resetBtn.addEventListener('click', () => {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScore();
  resultEl.textContent = '';
  movesEl.textContent = '';
  resultEl.className = 'result';
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  const result = getResult(playerMove, computerMove);

  score[result]++;
  localStorage.setItem('score', JSON.stringify(score));

  showResult(result, playerMove, computerMove);
  updateScore();
}

function getResult(player, computer) {
  if (player === computer) return 'ties';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'wins';

  return 'losses';
}

function showResult(result, player, computer) {
  resultEl.className = `result show ${result === 'wins' ? 'win' : result === 'losses' ? 'lose' : 'tie'}`;
  resultEl.textContent =
    result === 'wins' ? 'You win!' :
    result === 'losses' ? 'You lose!' :
    'Tie!';

  movesEl.innerHTML = `
    You <img src="${moveImages[player]}" class="move-icon">
    Computer <img src="${moveImages[computer]}" class="move-icon">
  `;
}

function updateScore() {
  scoreEl.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  return moves[Math.floor(Math.random() * moves.length)];
}