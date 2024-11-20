const maxAttempts = 10;
let attempts = maxAttempts;
let randomNumber = Math.floor(Math.random() * 100) + 1;
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

function updateLeaderboard() {
  const leaderboardList = document.getElementById("leaderboardList");
  leaderboardList.innerHTML = leaderboard
    .map((entry) => `<li>${entry.name}: ${entry.attempts} attempts</li>`)
    .join("");
}

function saveToLeaderboard(name, attemptsLeft) {
  leaderboard.push({ name, attempts: maxAttempts - attemptsLeft });
  leaderboard.sort((a, b) => a.attempts - b.attempts); // Sort by attempts
  leaderboard = leaderboard.slice(0, 10); // Keep only top 10
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  updateLeaderboard();
}

function resetGame() {
  attempts = maxAttempts;
  randomNumber = Math.floor(Math.random() * 100) + 1;
  document.getElementById("attempts").innerText = attempts;
  document.getElementById("feedback").innerText = "";
  document.getElementById("guess").value = "";
}

document.getElementById("submitGuess").addEventListener("click", () => {
  const guess = parseInt(document.getElementById("guess").value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    document.getElementById("feedback").innerText = "Please enter a number between 1 and 100.";
    return;
  }

  attempts--;
  document.getElementById("attempts").innerText = attempts;

  if (guess === randomNumber) {
    const playerName = prompt("Congratulations! You've guessed the number. Enter your name for the leaderboard:");
    if (playerName) saveToLeaderboard(playerName, attempts);
    resetGame();
  } else if (attempts === 0) {
    alert("Game over! The correct number was " + randomNumber + ".");
    resetGame();
  } else if (guess < randomNumber) {
    document.getElementById("feedback").innerText = "Too low! Try again.";
  } else {
    document.getElementById("feedback").innerText = "Too high! Try again.";
  }
});

updateLeaderboard();
