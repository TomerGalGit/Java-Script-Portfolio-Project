const height = 45;
const width = 45;
const length = 10;
const snake = new Array(length).fill(null).map((n, i) => i);
snake.reverse();
let head = snake[0];
let direction = "left";
let isGameOver = false;
let random;
let interval;

const rightBoundaries = [];
const leftBoundaries = [];

// גבולות ימין
for (let i = 0; i < height; i++) {
  rightBoundaries.push(width * i - 1);
}

// גבולות שמאל
for (let i = 1; i <= height; i++) {
  leftBoundaries.push(width * i);
}

const board = document.querySelector(".board");
board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

function createBoard() {
  for (let i = 0; i < height * width; i++) {
    const div = document.createElement("div");
    board.appendChild(div);
  }

  color();
  setApple();
  countApple();
}

let appleCounter = 0;
const counterDisplay = document.querySelector('#counter');

function countApple() {
    counterDisplay.textContent = `🍎${appleCounter}`
}

function color() {
  // Get all board elements.
  const divs = document.querySelectorAll(".board div");

  // Remove all classes.
  divs.forEach((elem) => {
    elem.classList.remove("active");
    elem.classList.remove("head");
    elem.classList.remove("up");
    elem.classList.remove("right");
    elem.classList.remove("down");
    elem.classList.remove("left");
    elem.classList.remove("topLeftRadius");
    elem.classList.remove("topRightRadius");
    elem.classList.remove("bottomRightRadius");
    elem.classList.remove("bottomLeftRadius");
  });

  // Add the class "Active" to the element of the snake.
  snake.forEach((num, i) => {
    divs[num].classList.add("active");
    const prev = snake[i + 1];
    const next = snake[i - 1];

    if (prev && next) {
      if (
        (next == num - 1 && prev == num + width) ||
        (next == num + width && prev == num - 1)
      ) {
        divs[num].classList.add("topLeftRadius");
      } else if (
        (next == num + width && prev == num + 1) ||
        (prev == num + width && next == num + 1)
      ) {
        divs[num].classList.add("topRightRadius");
      } else if (
        (next == num + 1 && prev == num - width) ||
        (prev == num + 1 && next == num - width)
      ) {
        divs[num].classList.add("bottomRightRadius");
      } else if (
        (next == num - 1 && prev == num - width) ||
        (prev == num - 1 && next == num - width)
      ) {
        divs[num].classList.add("bottomLeftRadius");
      }
    }
  });

  divs[head].classList.add("head");
  divs[head].classList.add(direction);
}
function move(dir) {
  if (isGameOver) {
    return;
  }

  const divs = document.querySelectorAll(".board div");

  if (dir === "up") {
    if (direction === "down") {
      return;
    }

    head -= width;

    if (!divs[head]) {
      gameOver();
      return;
    }
  } else if (dir === "down") {
    if (direction === "up") {
      return;
    }

    head += width;

    if (!divs[head]) {
      gameOver();
      return;
    }
  } else if (dir === "left") {
    if (direction === "right") {
      return;
    }

    head++;

    if (leftBoundaries.includes(head)) {
      gameOver();
      return;
    }
  } else if (dir === "right") {
    if (direction === "left") {
      return;
    }

    head--;

    if (rightBoundaries.includes(head)) {
      gameOver();
      return;
    }
  }

  if (snake.includes(head)) {
    gameOver();
    return;
  }
  
  direction = dir;
  snake.unshift(head);
  if (head === random) {
    const audio = document.createElement("audio");
    audio.src = "./Assests/Pebble.ogg";
    appleCounter++;
    countApple();
    audio.play();
    setApple();
  } else {
    snake.pop();
  }
  color();
  startAuto();
}


//הגדרתי את המודל ואחר"כ עשיתי פונקציה שמוסיפה לו את הקלאס שמראה אותו
const modal = document.querySelector(".modal-overlay");
const scoreFinishDisplay = document.querySelector('#scoreFinish')
function modalToggle(){
    modal.classList.add("open-modal");
    scoreFinishDisplay.textContent = `🍎Your Final Score Is ${appleCounter}`
  } 

function gameOver() {
  isGameOver = true;
  clearInterval(interval);  
    const audio = document.createElement("audio");
    audio.src = "./Assests/Country_Blues.ogg";
    audio.play();
    
    setTimeout(() => {
        modalToggle();
    }, 10);
}

//הגדרנו את כפתור הסגירה של המודל והאזנו ללחיצה עליו ע"מ לסגור את המודל
const closeBtn = document.querySelector(".closeModal");

closeBtn.addEventListener("click", function () {
  modal.classList.remove("open-modal");
  location.reload()
});

function setApple() {
  const divs = document.querySelectorAll(".board div");
  random = Math.floor(Math.random() * divs.length);

  if (snake.includes(random)) {
    setApple();
  } else {
    divs.forEach((elem) => elem.classList.remove("apple"));
    divs[random].classList.add("apple");
  }
}
// Difficulity Set
const hardDiff = 20;
const medDiff = 70;
const easyDiff = 150;
let activeDiff = easyDiff;

const diffOption = document.querySelectorAll('.diffOption')
const easyBtn = document.querySelector('#easy');
const medBtn = document.querySelector('#med');
const hardBtn = document.querySelector('#hard');

easyBtn.addEventListener('click', function() {
  activeDiff = easyDiff;
  easyBtn.classList.add("activeDiff");
  medBtn.classList.remove("activeDiff");
  hardBtn.classList.remove("activeDiff");
  playMusicLowDiff();
});

medBtn.addEventListener('click', function() {
  activeDiff = medDiff;
  easyBtn.classList.remove("activeDiff");
  medBtn.classList.add("activeDiff");
  hardBtn.classList.remove("activeDiff");
  playMusicLowDiff();
});

hardBtn.addEventListener('click', function() {
  activeDiff = hardDiff;
  easyBtn.classList.remove("activeDiff");
  medBtn.classList.remove("activeDiff");
  hardBtn.classList.add("activeDiff");
  playMusic();  
});



function startAuto() {
  clearInterval(interval);
  interval = setInterval(() => move(direction), activeDiff);
}
window.addEventListener("keydown", (ev) => {
  ev.preventDefault();

  // Checks which key was pressed.
  switch (ev.key) {
    case "ArrowUp":
      move("up");
      break;
    case "ArrowRight":
      move("right");
      break;
    case "ArrowDown":
      move("down");
      break;
    case "ArrowLeft":
      move("left");
      break;
    case "Escape":
      clearInterval(interval);
      break;
  }
});

function playMusic() {
  const audio = document.createElement("audio");
  audio.src = "./Assests/Untitled video.mp4";
  audio.play();
  audio.volume = 0.1;
}
function playMusicLowDiff(){
  const audio = document.createElement("audio");
  audio.src = "./Assests/bgMusicEasy&MED.mp4";
  audio.play();
  audio.volume = 0.03;
  audio.loop = true;
}