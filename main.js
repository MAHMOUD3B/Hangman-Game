const letters = "abcdefghijklmnopqrstuvwxyz.";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
lettersArray.forEach((ele) => {
  let span = document.createElement("span");
  span.className = "letter-box";
  let spanText = document.createTextNode(ele);
  span.appendChild(spanText);
  lettersContainer.appendChild(span);
});

const words = {
  programming: [
    "HTML",
    "CSS",
    "JavaScript",
    "React.JS",
    "SASS",
    "Pug",
    "Bootstrap",
    "Git",
  ],
  movies: ["Prestige", "Inception", "Parasite", "Coco", "Up"],
  countries: ["Seria", "Palestine", "Egypt", "Iraq", "Yemen", "Qatar"],
};
let keys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * keys.length);
let randomPropName = keys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropName.length);
let randomValue = randomPropValue[randomValueNumber];
document.querySelector(".game-info .catogery span").innerHTML = randomPropName;
let lettersGeuss = document.querySelector(".letters-guess");
let wordLetters = Array.from(randomValue.toLowerCase());
wordLetters.forEach(() => {
  let span = document.createElement("span");
  lettersGeuss.appendChild(span);
});

let guessSpans = document.querySelectorAll(".letters-guess span");
let theDraw = document.querySelector(".hangman-draw");
let wrongCounter = 0;
document.addEventListener("click", (ele) => {
  let theStatus = false;
  if (ele.target.className === "letter-box") {
    ele.target.classList.add("clicked");
    let clickedLetter = ele.target.innerHTML.toLowerCase();
    wordLetters.forEach((letter, letterIndex) => {
      if (clickedLetter === letter) {
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {
          if (letterIndex === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });
    if (theStatus === false) {
      wrongCounter++;
      theDraw.classList.add(`wrong-${wrongCounter}`);
      document.querySelector("#fail").play();
      if (wrongCounter === 8) {
        lettersContainer.classList.add("finished");
        endGame();
      }
    }
  }
});
function endGame() {
  let div = document.createElement("div");
  div.className = "game-over";
  let divText = document.createTextNode(
    `Game Over The Word Is: ${randomValue}`
  );
  div.appendChild(divText);
  document.body.appendChild(div);
  let tryAgain = document.createElement("span");
  tryAgain.className = "try-again";
  let tryText = document.createTextNode("Try Again");
  tryAgain.appendChild(tryText);
  div.appendChild(tryAgain);
  tryAgain.onclick = function (ele) {
    ele.target.parentElement.classList.remove("game-over");
    location.reload();
  };
}
