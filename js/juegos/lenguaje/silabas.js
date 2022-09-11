const brands = [
  {
    iconName: "KO",
    iconName1: "A",
    iconName2: "LA",
    brandName: "🐨",
  
  },
  {
    iconName: "O",
    iconName1: "VE",
    iconName2: "JA",
    brandName: "🐑",
  
  },
  {
    iconName: "CI",
    iconName1: "ER",
    iconName2: "VO",
    brandName: "🦌",
    
  },
  {
    iconName: "FLA",
    iconName1: "MEN",
    iconName2: "CO",
    brandName: "🦩",
 
  },
  {
    iconName: "AR",
    iconName1: "DI",
    iconName2: "LLA",
    brandName: "🐿️",
 
  },
  {
    iconName: "CAN",
    iconName1: "GU",
    iconName2: "RO",
    brandName: "🦘",
 
  },
  {
    iconName: "E",
    iconName1: "RI",
    iconName2: "ZO",
    brandName: "🦔",
 
  },
  {
    iconName: "PIN",
    iconName1: "GUI",
    iconName2: "NO",
    brandName: "🐧",
   
  },
  {
    iconName: "TOR",
    iconName1: "TU",
    iconName2: "GA",
    brandName: "🐢",
   
  },
  {
    iconName: "BA",
    iconName1: "LLE",
    iconName2: "NA",
    brandName: "🐳",
   
  },
  {
    iconName: "MA",
    iconName1: "PA",
    iconName2: "CHE",
    brandName: "🦝",
    
  },
  {
    iconName: "CU",
    iconName1: "LE",
    iconName2: "BRA",
    brandName: "🐍",
    
  },
  {
    iconName: "CA",
    iconName1: "RA",
    iconName2: "COL",
    brandName: "🐌",
    
  },
  {
    iconName: "TI",
    iconName1: "BU",
    iconName2: "RÓN",
    brandName: "🦈",
    
  },
];
//Sonidos del juego
const winAudio = new Audio("/sound/correcto.wav");
const loseAudio = new Audio("/sound/incorrecto.wav");
const againAudio = new Audio("/sound/playagain.mp3");
const clickAudio = new Audio("/sound/click.wav");

let correct = 0; 
let total = 0;
const totalDraggableItems = 4;
const totalMatchingPairs = 12; // Should be <= totalDraggableItems

const scoreSection = document.querySelector(".score");
const correctSpan = scoreSection.querySelector(".correct");
const totalSpan = scoreSection.querySelector(".total");
const playAgainBtn = scoreSection.querySelector("#play-again-btn");

const draggableItems = document.querySelector(".draggable-items");
const matchingPairs = document.querySelector(".matching-pairs");
let draggableElements;
let droppableElements;

initiateGame();

function initiateGame() {
  const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, brands);
  const randomDroppableBrands = totalMatchingPairs<totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands) : randomDraggableBrands;
  const alphabeticallySortedRandomDroppableBrands = [...randomDroppableBrands].sort((a,b) => a.brandName.toLowerCase().localeCompare(b.brandName.toLowerCase()));

  // Create "draggable-items" and append to DOM
  for(let i=0; i<randomDraggableBrands.length ; i++) {
    draggableItems.insertAdjacentHTML("beforeend", `
    <div class="draggable-items">
      <i class="draggable" draggable="true" id="${randomDraggableBrands[i].iconName}">${randomDraggableBrands[i].iconName}</i>
      <i class="draggable" draggable="true" id="${randomDraggableBrands[i].iconName1}">${randomDraggableBrands[i].iconName1}</i>
      <i class="draggable" draggable="true" id="${randomDraggableBrands[i].iconName2}">${randomDraggableBrands[i].iconName2}</i>
    </div>     
    `);
  }

// Create "matching-pairs" and append to DOM
  for(let i=0; i<alphabeticallySortedRandomDroppableBrands.length; i++) {
    matchingPairs.insertAdjacentHTML("beforeend", `
      <div class="matching-pair">
        <span class="label">${alphabeticallySortedRandomDroppableBrands[i].brandName}</span>
        <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
        <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName1}"></span>
        <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName2}"></span>
      </div>
    `);
  }

  draggableElements = document.querySelectorAll(".draggable");
  droppableElements = document.querySelectorAll(".droppable");
  
  draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
    // elem.addEventListener("drag", drag);
    // elem.addEventListener("dragend", dragEnd);
  });
  
  droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
  });
}

// DRAG AND DROP FUNCTIONS

//Events fired on the drag target
function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // or "text/plain"
}

//Events fired on the drop target
function dragEnter(event) {
  if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.preventDefault();
  }
}

function dragLeave(event) {
  if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableElementBrand = event.dataTransfer.getData("text");
  const droppableElementBrand = event.target.getAttribute("data-brand");
  const isCorrectMatching = draggableElementBrand===droppableElementBrand;
  total++;
  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementBrand);
    event.target.classList.add("dropped");
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.innerHTML = `<i class="draggable">${draggableElementBrand}</i>`;
    correct++;  
    winAudio.play();
  }
  else{
    loseAudio.play();
  }
  scoreSection.style.opacity = 0;
  setTimeout(() => {
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    scoreSection.style.opacity = 1;
  }, 200);

  if(correct===Math.min(totalMatchingPairs, 12)) { // Game Over!!
    playAgainBtn.style.display = "block";
    setTimeout(() => {
      playAgainBtn.classList.add("play-again-btn-entrance");
      swal({
        position: 'top-end',
        icon: 'success',
        title: "🌟🌟¡Enhorabuena!🌟🌟",
        text: '🥇 ¡Lo has conseguido! 🥇',
        showConfirmButton: false,
        timer: 3600
      });
      
      updateScoreUser();
    }, 200);
    againAudio.play();
  }
}
 
// Other Event Listeners
playAgainBtn.addEventListener("click", playAgainBtnClick);
function playAgainBtnClick() {
  playAgainBtn.classList.remove("play-again-btn-entrance");
  correct = 0;
  total = 0;
  draggableItems.style.opacity = 0;
  matchingPairs.style.opacity = 0;
  setTimeout(() => {
    scoreSection.style.opacity = 0;
  }, 100);
  setTimeout(() => {
    playAgainBtn.style.display = "none";
    while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
    while (matchingPairs.firstChild) matchingPairs.removeChild(matchingPairs.firstChild);
    initiateGame();
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    draggableItems.style.opacity = 1;
    matchingPairs.style.opacity = 1;
    scoreSection.style.opacity = 1;
  }, 500);
}

// Auxiliary functions
function generateRandomItemsArray(n, originalArray) {
  let res = [];
  let clonedArray = [...originalArray];
  if(n>clonedArray.length) n=clonedArray.length;
  for(let i=1; i<=n; i++) {
    const randomIndex = Math.floor(Math.random()*clonedArray.length);
    res.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  return res;
}