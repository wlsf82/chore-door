const doorImage1 = document.querySelector('#door1');
const doorImage2 = document.querySelector('#door2');
const doorImage3 = document.querySelector('#door3');
const startButton = document.querySelector('#start');

const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

const WIN_STATUS = 'win';

let openDoor1;
let openDoor2;
let openDoor3;

let numClosedDoors = 3;

let currentlyPlaying = true;

let score = 0;
let highScore = 0;

const currentStreak = document.getElementById('score-number');
const bestStreak = document.getElementById('high-score-number');

currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

const isBot = door => door.src === botDoorPath ? true : false;

const isClicked = door => door.src === closedDoorPath ? false : true;

const playDoor = door => {
  numClosedDoors--;

  if (numClosedDoors === 0) {
    gameOver(WIN_STATUS);
  } else if (isBot(door)) {
    gameOver();
  }
};

const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);

  if (choreDoor === 1) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 2) {
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};

const findDoorWithChoreBot = () => {
  [openDoor1, openDoor2, openDoor3].forEach((door, doorIndex) => {
    if (door === botDoorPath) {
      console.log(`The chore bot is on door ${doorIndex + 1}`);
    }
  })
};

doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  }
}

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!';
  currentlyPlaying = true;

  randomChoreDoorGenerator();
  findDoorWithChoreBot();
};

const gameOver = status => {
  const playAgainQuestion = 'Play again?';

  if (status === WIN_STATUS) {
    startButton.innerHTML = `You win! ${playAgainQuestion}`
    getYourScore();
  } else {
    startButton.innerHTML = `Game over! ${playAgainQuestion}`;
    score = 0;
    currentStreak.innerHTML = score;
  }

  currentlyPlaying = false;
};

const getYourScore = () => {
  score++;

  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
};

startRound();
