const humanScoreSpan = document.getElementById('human-score');
const computerScoreSpan = document.getElementById('computer-score');
const resultText = document.getElementById('round-result');
const finalResult = document.querySelector('.final-result');
const finalMessage = document.getElementById('final-message');
const restartBtn = document.getElementById('restart');
const choices = document.querySelectorAll('.hand-btn');

let humanScore = 0;
let computerScore = 0;
let round = 0;

const reactionContainer = document.createElement('div');
reactionContainer.id = 'reaction-gif';
reactionContainer.style.marginTop = '20px';
reactionContainer.style.height = '120px';
reactionContainer.style.display = 'flex';
reactionContainer.style.justifyContent = 'center';
document.querySelector('.game-container').appendChild(reactionContainer);

choices.forEach(button => {
  button.addEventListener('click', () => {
    const humanChoice = button.getAttribute('data-choice');
    const computerChoice = getComputerChoice();
    const roundResult = playRound(humanChoice, computerChoice);

    resultText.textContent = `You chose ${humanChoice}, computer chose ${computerChoice}. ${roundResult.message}`;

    showReaction(humanChoice, computerChoice, roundResult.result);

    if (roundResult.result === 'win') humanScore++;
    if (roundResult.result === 'lose') computerScore++;

    humanScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;

    round++;

    if (round === 5) {
      setTimeout(endGame, 2000); // small delay before ending
    }
  });
});

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(human, computer) {
  if (human === computer) return { result: 'draw', message: "It's a draw!" };

  if (
    (human === 'rock' && computer === 'scissors') ||
    (human === 'paper' && computer === 'rock') ||
    (human === 'scissors' && computer === 'paper')
  ) {
    return { result: 'win', message: 'You win this round!' };
  } else {
    return { result: 'lose', message: 'You lose this round!' };
  }
}

function showReaction(human, computer, result) {
  reactionContainer.innerHTML = '';

  if (result === 'draw') return;

  const handReaction = {
    rock: 'https://media.tenor.com/4XJkCmQHBbAAAAAM/the-rock.gif',
    paper: 'https://media1.tenor.com/m/5qHvGMx9eJMAAAAC/throwing-papers-im-done.gif',
    scissors: 'https://media.tenor.com/OAKsRGYprtAAAAAM/scissors-opening-and-closing.gif'
  };

  const popup = document.createElement('img');
  popup.src = handReaction[human];
  popup.alt = `${human} Reaction`;
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%) scale(1)';
  popup.style.zIndex = '1000';
  popup.style.height = '200px';
  popup.style.transition = 'transform 0.3s ease, opacity 0.5s ease';
  popup.style.opacity = '1';

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.transform = 'translate(-50%, -50%) scale(1.2)';
    popup.style.opacity = '0';
  }, 1000);

  setTimeout(() => {
    popup.remove();
  }, 1600);
}

function endGame() {
  choices.forEach(btn => btn.disabled = true);

  finalResult.classList.remove('hidden');
  if (humanScore > computerScore) {
    finalMessage.textContent = '🎉 You won the game!';
  } else if (humanScore < computerScore) {
    finalMessage.textContent = '😢 You lost the game.';
  } else {
    finalMessage.textContent = "😐 It's a draw!";
  }
}

restartBtn.addEventListener('click', () => {
  humanScore = 0;
  computerScore = 0;
  round = 0;

  humanScoreSpan.textContent = 0;
  computerScoreSpan.textContent = 0;
  resultText.textContent = "Choose your move to start!";
  finalResult.classList.add('hidden');
  reactionContainer.innerHTML = '';
  choices.forEach(btn => btn.disabled = false);
});
