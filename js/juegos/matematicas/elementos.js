const brands = [
    {
      iconName: "1",
      brandName: "🎁",
    },
    {
      iconName: "2",
      brandName: "🍪🍪",
    },
    {
      iconName: "3",
      brandName: "🪁🪁   🪁",
    },
    {
      iconName: "4",
      brandName: "✏️✏️   ✏️✏️",
    },
    {
      iconName: "5",
      brandName: "🌸🌸   🌸🌸   🌸",
    },
    {
      iconName: "6",
      brandName: "👧👧   👧👧   👧👧",
    },
  
    {
      iconName: "7",
      brandName: "🍇🍇   🍇🍇   🍇🍇  🍇",
    },
    {
      iconName: "8",
      brandName: "📕📕   📕📕   📕📕   📕📕",
    },
    {
      iconName: "9",
      brandName: "🥥🥥   🥥🥥   🥥🥥   🥥🥥   🥥",
    },
    {
      iconName: "10",
      brandName: "🧚‍♀️🧚‍♀️   🧚‍♀️🧚‍♀️   🧚‍♀️🧚‍♀️   🧚‍♀️🧚‍♀️   🧚‍♀️🧚‍♀️",
    }
  ];
  
  
  //Sonidos del juego
  let winAudio = new Audio("/sound/correcto.wav");
  let loseAudio = new Audio("/sound/incorrecto.wav");
  let againAudio = new Audio("/sound/playagain.mp3");
  let clickAudio = new Audio("/sound/click.wav");

  
  let correct = 0; 
  let total = 0;
  const totalDraggableItems = 4;
  const totalMatchingPairs = 4; // Should be <= totalDraggableItems
  
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
      </div>     
      `);
    }
    //<i class="droppable" ${randomDraggableBrands[i].iconName} draggable" draggable="true"};" id="${randomDraggableBrands[i].iconName}"></i>//
  //draggableItems.insertAdjacentHTML("beforeend", `
  //<i class="${randomDraggableBrands[i].iconName} draggable" draggable="true" id="${randomDraggableBrands[i].iconName}"></i>
  //`);
  
  
  /*Otra solucion
  <span class="draggable">${randomDraggableBrands[i].iconName} </span>
        <span class="draggable">${randomDraggableBrands[i].iconName1} </span>
        <span class="draggable">${randomDraggableBrands[i].iconName2} </span>
  */
  
  
  
    // Create "matching-pairs" and append to DOM
    for(let i=0; i<alphabeticallySortedRandomDroppableBrands.length; i++) {
      matchingPairs.insertAdjacentHTML("beforeend", `
        <div class="matching-pair">
          <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
          <span class="label">${alphabeticallySortedRandomDroppableBrands[i].brandName}</span>
          
        </div>
      `);
    }
  
    /*<div class="matching-pair">
          <span class="label">${alphabeticallySortedRandomDroppableBrands[i].brandName}</span>
          <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
        </div>
      `);
    }*/
    
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
  
  // Drag and Drop Functions
  
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
      //<i class="draggable" draggable="true" id="${randomDraggableBrands[i].iconName2}">${randomDraggableBrands[i].iconName2}</i>
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
  
    
    if(correct===Math.min(totalMatchingPairs, 4)) { // Game Over!!
      playAgainBtn.style.display = "block";
      setTimeout(() => {
        playAgainBtn.classList.add("play-again-btn-entrance");
      }, 200);
      swal({
        position: 'top-end',
        icon: 'success',
        title: "🏆 Eres un campeón 🏆",
        text: '👍🏻!Buen Trabajo! 👏🏻',
        showConfirmButton: false,
        timer: 3600
      })
      updateScoreUser();
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