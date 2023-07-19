const hammerFollower = document.getElementById("follower");

function startFollow() {
  hammerFollower.classList.add("show-hammer");
  document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    hammerFollower.style.left = mouseX + "px";
    hammerFollower.style.top = mouseY + "px";
  });
}

const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".moleActive");

const timer = document.querySelector("#timer");
const score = document.querySelector("#score");

let result = 0;
let hitPos;
let currentTime = 60;

function createRandomSquare() {
  squares.forEach((square) => {
    square.classList.remove("moleActive");
    square.classList.remove("moleHit");
  });

  let random = squares[Math.floor(Math.random() * 9)];
  console.log(random);
  random.classList.add("moleActive");
  hitPos = random.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPos) {
      result++;
      score.textContent = result;
      hitPos = null;
      const audioHit = document.createElement("audio");
      audioHit.src = "./Assets/Audio/SMACK Sound Effect.mp4";
      audioHit.play();
      audioHit.volume = 0.2;
      square.classList.add("moleHit");
    }
  });
});

const easyBTN = document.querySelector("#easy");
const medBTN = document.querySelector("#med");
const hardBTN = document.querySelector("#hard");
const selectDiff = document.querySelector(".modal-start");

let isMoving = null;

easyBTN.addEventListener("click", () => {
  function swapMole() {
    isMoving = setInterval(createRandomSquare, 1000);
    selectDiff.classList.add("modal-invis");
    startFollow();
    const audio = document.createElement("audio");
    audio.src = "./Assets/Audio/music-bg.mp4";
    audio.play();
    audio.volume = 0.2;
    moleGiggle();

    countDownTimerId = setInterval(countDown, 1000);
  }
  if (currentTime == 0) {
    currentTime = 60;
  }

  swapMole();
});

medBTN.addEventListener("click", () => {
  function swapMole() {
    isMoving = setInterval(createRandomSquare, 600);
    selectDiff.classList.add("modal-invis");
    startFollow();
    const audio = document.createElement("audio");
    audio.src = "./Assets/Audio/music-bg.mp4";
    audio.play();
    audio.volume = 0.2;
    moleGiggle();

    countDownTimerId = setInterval(countDown, 1000);
  }
  if (currentTime == 0) {
    currentTime = 60;
  }
  swapMole();
});

let countDownTimerId = null;

hardBTN.addEventListener("click", () => {
  function swapMole() {
    isMoving = setInterval(createRandomSquare, 400);
    selectDiff.classList.add("modal-invis");
    startFollow();
    const audio = document.createElement("audio");
    audio.src = "./Assets/Audio/music-bg.mp4";
    audio.play();
    audio.volume = 0.2;
    moleGiggle();

    countDownTimerId = setInterval(countDown, 1000);
  }
  if (currentTime == 0) {
    currentTime = 60;
  }
  swapMole();
});

const modalOverlay = document.querySelector(".modal-overlay");
const scoreDisplay = document.querySelector("#scoreFinish");
const playAgainBtn = document.querySelector("#playAgain");
const closeModalBtn = document.querySelector(".closeModal");

function countDown() {
  currentTime--;
  timer.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(isMoving);
    scoreDisplay.textContent = `Your Final Score is ${result} 🔨`;
    modalOverlay.classList.add("open-modal");
    selectDiff.classList.add("modal-invis");

    closeModalBtn.addEventListener("click", () => {
      modalOverlay.classList.remove("open-modal");
      selectDiff.classList.remove("modal-invis");
    });

    playAgainBtn.addEventListener("click", () => {
      location.reload();
    });
  }
}

function moleGiggle() {
  const audioGiggle = document.createElement("audio");
  setInterval(() => {
    audioGiggle.src = "./Assets/Audio/mole laugh effect.mp4";
    audioGiggle.play();
    audioGiggle.volume = 0.2;
  }, 10 * 1000);
}
