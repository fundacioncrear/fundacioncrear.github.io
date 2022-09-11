const animales = [
    {
      iconName: "cat",
      Nombre: "Gato",
      color: "#36a2eb"
    },
  
    {
      iconName: "dove",
      Nombre: "Paloma",
      color: "#808080"
    },
    {
      iconName: "hippo",
      Nombre: "Hipopótamo",
      color: "#ff9f40"
    },
  
    {
      iconName: "horse",
      Nombre: "Caballo",
      color: "#804000"
    },
    {
      iconName: "spider",
      Nombre: "Araña",
      color: "#0000FF"
    },
    {
      iconName: "frog",
      Nombre: "Rana",
      color: "#4bc0c0"
    },
    {
      iconName: "crow",
      Nombre:"Cuervo",
      color: "#111111"
    },
    {
      iconName: "bug",
      Nombre:"Pulga",
      color: "#5e2129"
    },
    {
      iconName: "piggy-bank",
      Nombre:"Cerdo",
      color: "#ff6384"
    },
  
    {
      iconName: "otter",
      Nombre:"Nutria",
      color: "#8D4925"
    },
    {
      iconName: "fish",
      Nombre:"Pez",
      color: "#9966ff" 
    }
  
  
  
  
  ];
  //Sonidos del juego
  let winAudio = new Audio("/sound/correcto.wav");
  let loseAudio = new Audio("/sound/incorrecto.wav");
  let againAudio = new Audio("/sound/playagain.mp3");
  let clickAudio = new Audio("/sound/click.wav");


  let correcto = 0;
  let total = 0;
  const Total_elementos_arrastrables = 5;
  const TotalPares_Compatibles = 5; 
  
  const Seccion_puntaje = document.querySelector(".puntaje");
  const Seccion_correcto = Seccion_puntaje.querySelector(".correcto");
  const Medicion_total = Seccion_puntaje.querySelector(".total");
  const Btn_juegadenuevo = Seccion_puntaje.querySelector("#juegadenuevo-btn");
  
  const Elementos_Arrastrables = document.querySelector(".elementos-arrastrables");
  const Pares_compatibles = document.querySelector(".pares-compatibles");
  let Elementos_arrastrables;
  let Elementos_despegables;
  
  Iniciar_Juego();
  
  function Iniciar_Juego() {
    const randomDraggableBrands = generarRandomItemsArray(Total_elementos_arrastrables, animales);
    const randomDroppableBrands = TotalPares_Compatibles<Total_elementos_arrastrables ? generarRandomItemsArray(TotalPares_Compatibles, randomDraggableBrands) : randomDraggableBrands;
    const alphabeticallySortedRandomDroppableBrands = [...randomDroppableBrands].sort((a,b) => a.Nombre.toLowerCase().localeCompare(b.Nombre.toLowerCase()));
    
    // Crear "elementos arrastrables" y agregarlos al DOM
    for(let i=0; i<randomDraggableBrands.length; i++) {
      Elementos_Arrastrables.insertAdjacentHTML("beforeend", `
        <i class="fas fa-${randomDraggableBrands[i].iconName} draggable" draggable="true" style="color: ${randomDraggableBrands[i].color};" id="${randomDraggableBrands[i].iconName}"></i>
      `);
    }
    
    // Crear "pares coincidentes" y agregar a DOM
    for(let i=0; i<alphabeticallySortedRandomDroppableBrands.length; i++) {
      Pares_compatibles.insertAdjacentHTML("beforeend", `
        <div class="matching-pair">
          <span class="label">${alphabeticallySortedRandomDroppableBrands[i].Nombre}</span>
          <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
        </div>
      `);
    }
    
    Elementos_arrastrables = document.querySelectorAll(".draggable");
    Elementos_despegables = document.querySelectorAll(".droppable");
    
    Elementos_arrastrables.forEach(elem => {
      elem.addEventListener("dragstart", dragStart);
      // elem.addEventListener("drag", drag);
      // elem.addEventListener("dragend", dragEnd);
    });
    
    Elementos_despegables.forEach(elem => {
      elem.addEventListener("dragenter", dragEnter);
      elem.addEventListener("dragover", dragOver);
      elem.addEventListener("dragleave", dragLeave);
      elem.addEventListener("drop", drop);
    });
  }
  
  // Funciones de arrastrar y soltar
  
  //Eventos activados del destino de arrastre
  
  function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id); 
  }
  
  //Eventos activados del destino de colocación
  
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
    const Elemento_Arrastrable_animales = event.dataTransfer.getData("text");
    const Elemento_Desplegable_animales = event.target.getAttribute("data-brand");
    const Pares_Correctos = Elemento_Arrastrable_animales===Elemento_Desplegable_animales;
    total++;
    if(Pares_Correctos) {
      const draggableElement = document.getElementById(Elemento_Arrastrable_animales);
      event.target.classList.add("dropped");
      draggableElement.classList.add("dragged");
      draggableElement.setAttribute("draggable", "false");
      event.target.innerHTML = `<i class="fas fa-${Elemento_Arrastrable_animales}" style="color: ${draggableElement.style.color};"></i>`;
      correcto++;  
      winAudio.play();
    }
    else{
      loseAudio.play();
    }
    Seccion_puntaje.style.opacity = 0;
    setTimeout(() => {
      Seccion_correcto.textContent = correcto;
      Medicion_total.textContent = total;
      Seccion_puntaje.style.opacity = 1;
    }, 200);
   
    if(correcto===Math.min(TotalPares_Compatibles, Total_elementos_arrastrables)) {  // Game Over!!
      Btn_juegadenuevo.style.display = "block";
      setTimeout(() => {
        Btn_juegadenuevo.classList.add("juegadenuevo-btn-entrada");
        swal({
          position: 'top-end',
          icon: 'success',
          title: "🏆 Eres un campeón 🏆",
          text: '👍🏻!Buen Trabajo! 👏🏻',
          showConfirmButton: false,
          timer: 3600
        });
        
        updateScoreUser();
        // alert("🏆 Eres un campeón 🏆")
      }, 200);
      againAudio.play();
      
    }
  }
  
  // Otros detectores de eventos
  Btn_juegadenuevo.addEventListener("click", BtnClick_juegadenuevo);
  function BtnClick_juegadenuevo() {
  clickAudio.play();
    Btn_juegadenuevo.classList.remove("juegadenuevo-btn-entrada");
    correcto = 0;
    total = 0;
    Elementos_Arrastrables.style.opacity = 0;
    Pares_compatibles.style.opacity = 0;
    setTimeout(() => {
      Seccion_puntaje.style.opacity = 0;
    }, 100);
    setTimeout(() => {
      Btn_juegadenuevo.style.display = "none";
      while (Elementos_Arrastrables.firstChild) Elementos_Arrastrables.removeChild(Elementos_Arrastrables.firstChild);
      while (Pares_compatibles.firstChild) Pares_compatibles.removeChild(Pares_compatibles.firstChild);
      Iniciar_Juego();
      Seccion_correcto.textContent = correcto;
      Medicion_total.textContent = total;
      Elementos_Arrastrables.style.opacity = 1;
      Pares_compatibles.style.opacity = 1;
      Seccion_puntaje.style.opacity = 1;
    }, 500);
  }
  
  // Funciones auxiliares
  function generarRandomItemsArray(n, Array_original) {
    let res = [];
    let Array_clonada = [...Array_original];
    if(n>Array_clonada.length) n=Array_clonada.length;
    for(let i=1; i<=n; i++) {
      const Indice_Aleatorio = Math.floor(Math.random()*Array_clonada.length);
      res.push(Array_clonada[Indice_Aleatorio]);
      Array_clonada.splice(Indice_Aleatorio, 1);
    }
    return res;
  }