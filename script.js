"use strict";
// Selecting Elements
const playeractive0 = document.querySelector(".player--0");
const playeractive1 = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const playerCurrent0El = document.querySelector("#current--0");
const playerCurrent1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
let scores, current, activePlayer, playing;

//starting Conditions

const againButton = function () {
  scores = [0, 0];
  current = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  playerCurrent0El.textContent = 0;
  playerCurrent1El.textContent = 0;

  diceEl.classList.add("hidden");
  playeractive0.classList.remove("player--winner");
  playeractive1.classList.remove("player--winner");
  playeractive0.classList.add("player--active");
  playeractive1.classList.remove("player--active");
};
againButton();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  playeractive0.classList.toggle("player--active");
  playeractive1.classList.toggle("player--active");
};

//Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNum);
    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceNum}.png`;

    // 3. Check for rolled if 1;
    if (diceNum !== 1) {
      current += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += current;
    // eg:  scores[1] = scores[1] + current
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //finish the game
    // checking if the player has reached the enough points
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", againButton);
