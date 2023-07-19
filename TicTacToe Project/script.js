const elem = document.querySelector(".board");
let isX = true;
let winner;
let winnerArray;
const xTurn = document.querySelector(".x-turn");
const oTurn = document.querySelector(".o-turn");

for (let i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.classList.add("sqaure");

  div.addEventListener("click", (ev) => {
    const clickedDiv = ev.target;

    if (!clickedDiv.innerHTML && !winner) {
      if (isX) {
        clickedDiv.innerHTML = "X";
        const audioX = document.createElement("audio");
        audioX.src = "./Assets/pop 1.wav";
        audioX.play();
        audioX.volume = 0.5;
        oTurn.classList.add("active-turn");
        xTurn.classList.remove("active-turn");
      } else {
        clickedDiv.innerHTML = "O";
        const audioO = document.createElement("audio");
        audioO.src = "./Assets/pop 2.wav";
        audioO.play();
        audioO.volume = 0.5;
        xTurn.classList.add("active-turn");
        oTurn.classList.remove("active-turn");
      }

      clickedDiv.classList.add("dirty");
      isX = !isX;
      check();
    }
  });

  elem.appendChild(div);
}

function check() {
  const divs = elem.querySelectorAll("div");

  const options = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const arr of options) {
    const res = arr.map((index) => divs[index].innerHTML);

    if (res.every((val) => val === "X")) {
      winner = "X";
      winnerArray = arr;
      break;
    } else if (res.every((val) => val === "O")) {
      winner = "O";
      winnerArray = arr;
      break;
    }
  }

  if (winner) {
    elem.querySelectorAll("div").forEach((el) => {
      el.className = "dirty";
    });

    winnerArray.forEach((index) => divs[index].classList.add("bg"));

    showWinner(`"${winner}" Won The Game`);
  }
}

function showWinner(text) {
  playMusic();
  const winner = document.createElement("div");
  winner.classList.add("winner");
  winner.innerHTML = text;

  const frame = document.querySelector(".frame");
  frame.appendChild(winner);

  confetti({
    particleCount: 100,
    spread: 70,
    decay: 0.9,
    origin: { y: 0.6 },
  });

  setTimeout(function () {
    frame.removeChild(winner);
  }, 2 * 1000);
}

const htpBtn = document.querySelector(".how-to-play");
const htpModalDisplay = document.querySelector(".modal-overlay1");
const closeModalHtp = document.querySelector(".closeModal");
const resetBtn = document.querySelector("#restart");

htpBtn.addEventListener("click", function () {
  htpModalDisplay.classList.toggle("open-modal");
});
closeModalHtp.addEventListener("click", function () {
  htpModalDisplay.classList.toggle("open-modal");
});

resetBtn.addEventListener("click", function () {
  location.reload();
});

function playMusic() {
  const audio = document.createElement("audio");
  audio.src = "./Assets/Victory - Sound Effect.mp3";
  audio.play();
  audio.volume = 0.2;
}
