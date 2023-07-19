let width = 4;
let height = 4;
const length = width * height;
const divs = [];
let isGameOver = false;
let options = [];
const board = document.querySelector(".board");
board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

function createBoard() {
  // יצרנו מערך עם מספרים
  const numbers = new Array(length).fill().map((n, i) => i + 1);

  for (let i = 0; i < length; i++) {
    const div = document.createElement("div");
    const rand = Math.floor(Math.random() * numbers.length);

    // רק אם זה לא המספר האחרון
    if (numbers[rand] !== length) {
      div.innerHTML = numbers[rand];
    }

    numbers.splice(rand, 1);
    board.appendChild(div);
    divs.push(div);

    // אירוע המופעל במעבר עכבר
    div.addEventListener("mouseover", (ev) => {
      if (isGameOver) {
        return;
      }

      const empty = divs.find((el) => el.innerHTML == "");
      empty.classList.remove("active");

      if (options.includes(i)) {
        empty.classList.add("active");
      }
    });

    // אירוע המופעל בעזיבת העכבר
    div.addEventListener("mouseout", (ev) => {
      const empty = divs.find((el) => el.innerHTML == "");
      empty.classList.remove("active");
    });

    // אירוע המופעל בלחיצה על העכבר
    div.addEventListener("click", (ev) => {
      if (isGameOver) {
        return;
      }

      const elem = ev.target;

      if (options.includes(i)) {
        const empty = divs.find((el) => el.innerHTML == "");
        empty.classList.remove("active");
        empty.innerHTML = elem.innerHTML;
        elem.innerHTML = "";
        checkAllOptions();
      }
    });
  }

  checkAllOptions();
}

let moveCounter = 0;
const movesDisplay = document.querySelector("#moves");
function checkAllOptions() {
  movesDisplay.innerHTML = `${moveCounter}`;
  moveCounter++;
  const audio1 = document.createElement("audio");
  audio1.src = "/Puzzle Project/Assets/pop 2.wav";
  audio1.play();
  audio1.volume = 0.5;
  divs.forEach((el) => el.classList.remove("empty", "option"));
  const emptyIndex = divs.findIndex((div) => div.innerHTML == "");
  options = [];
  const top = emptyIndex - width;
  const bottom = emptyIndex + width;
  const right = emptyIndex + 1;
  const left = emptyIndex - 1;

  if (top >= 0) {
    options.push(top);
  }

  if (bottom < length) {
    options.push(bottom);
  }

  if (emptyIndex % width != 0) {
    options.push(left);
  }

  if (emptyIndex % width != width - 1) {
    options.push(right);
  }

  divs[emptyIndex].classList.add("empty");
  options.forEach((index) => divs[index].classList.add("option"));

  isGameOver = divs.slice(0, -1).every((el, i) => el.innerHTML == i + 1);

  if (isGameOver) {
    gameOver();
  }
}

function cheat() {
  divs.forEach((elem, i) => (elem.innerHTML = i + 1));
  divs[divs.length - 1].innerHTML = "";
  checkAllOptions();
}

function gameOver() {
  board.classList.add("game-over");

  confetti({
    particleCount: 100,
    spread: 70,
    decay: 0.9,
    origin: { y: 0.6 },
  });

  const winner = document.createElement("div");
  winner.classList.add("winner");
  winner.innerHTML = "👌Level Complete ";

  document.body.appendChild(winner);

  setTimeout(function () {
    location.reload();
  }, 5 * 1000);
}

// אם לוחצים 3 פעמים על המקש "ב" במקלדת, זה מפעיל את הפונקציה שמרמה
let conunter = 0;

window.addEventListener("keyup", (ev) => {
  if (isGameOver) {
    return;
  }

  if (ev.key == "c" || ev.key == "ב") {
    conunter++;

    if (conunter >= 3) {
      cheat();
    }

    setTimeout(() => {
      conunter = 0;
    }, 1500);
  }
});

// how to play Modal
const modalDisplay = document.querySelector(".HTPmodal-overlay");
const howToPlayBtn = document.querySelector(".how-to-play");
const closeModal = document.querySelector(".closeModal");

howToPlayBtn.addEventListener("click", function () {
  modalDisplay.classList.add("open-modal");
});

closeModal.addEventListener("click", function () {
  modalDisplay.classList.remove("open-modal");
  location.reload();
});

// Setting Difficulity
let seconds = 0;
let minutes = 0;
const timer = document.querySelector("#timer");

const easyBtn = document.querySelector("#easy");
const medBtn = document.querySelector("#med");
const hardBtn = document.querySelector("#hard");

const easyAlertDisplay = document.querySelector("#easyAlert");
const medAlertDisplay = document.querySelector("#medAlert");
const hardAlertDisplay = document.querySelector("#hardAlert");

// Easy Diff
function easyDiffAlert() {
  easyAlertDisplay.classList.add("open-modal");
  setTimeout(function () {
    easyAlertDisplay.classList.remove("open-modal");
  }, 4 * 1000);
}

easyBtn.addEventListener("click", function () {
  easyDiffAlert();
  playMusicLowDiff();
  easyBtn.classList.add("activeDiff");
  medBtn.classList.remove("activeDiff");
  hardBtn.classList.remove("activeDiff");
  setInterval(function () {
    timer.innerHTML = `${seconds++} : 0${minutes}`;
    if (seconds == 59) {
      timer.innerHTML = `0${seconds++} : ${minutes}`;
      minutes++;
      seconds = 0;
    }
    if (seconds < 10) {
      timer.innerHTML = `0${seconds}  : 0${minutes}`;
    }
    if (minutes == 7) {
      location.reload();
    }
  }, 1000);
});
// Medium Diff
function medDiffAlert() {
  medAlertDisplay.classList.add("open-modal");
  setTimeout(function () {
    medAlertDisplay.classList.remove("open-modal");
  }, 4 * 1000);
}

medBtn.addEventListener("click", function () {
  medDiffAlert();
  playMusicLowDiff();
  medBtn.classList.add("activeDiff");
  easyBtn.classList.remove("activeDiff");
  hardBtn.classList.remove("activeDiff");
  setInterval(function () {
    timer.innerHTML = `${seconds++} : 0${minutes}`;
    if (seconds == 59) {
      timer.innerHTML = `0${seconds++} : ${minutes}`;
      minutes++;
      seconds = 0;
    }
    if (seconds < 10) {
      timer.innerHTML = `0${seconds}  : 0${minutes}`;
    }
    if (minutes == 7) {
      location.reload();
    }
    if (moveCounter == 100) {
      location.reload();
    }
  }, 1000);
});

// Hard Diff
function hardDiffAlert() {
  hardAlertDisplay.classList.add("open-modal");
  setTimeout(function () {
    hardAlertDisplay.classList.remove("open-modal");
  }, 4 * 1000);
}

hardBtn.addEventListener("click", function () {
  hardDiffAlert();
  playMusic();
  hardBtn.classList.add("activeDiff");
  easyBtn.classList.remove("activeDiff");
  medBtn.classList.remove("activeDiff");
  setInterval(function () {
    timer.innerHTML = `${seconds++} : 0${minutes}`;
    if (seconds == 59) {
      timer.innerHTML = `0${seconds++} : ${minutes}`;
      minutes++;
      seconds = 0;
    }
    if (seconds < 10) {
      timer.innerHTML = `0${seconds}  : 0${minutes}`;
    }
    if (minutes == 3) {
      location.reload();
    }
  }, 1000);
});

function playMusic() {
  const audio = document.createElement("audio");
  audio.src = "./Assets/Untitled video.mp4";
  audio.play();
  audio.volume = 0.05;
}
function playMusicLowDiff(){
  const audio = document.createElement("audio");
  audio.src = "./Assets/bg musicEASY&MED.mp4";
  audio.play();
  audio.volume = 0.03;
  audio.loop = true;
}