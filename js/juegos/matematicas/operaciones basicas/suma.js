const option1 = document.getElementById("option1"),
      option2 = document.getElementById("option2"),
      option3 = document.getElementById("option3");  
var answer = 0;

//Sonidos del juego
const winAudio = new Audio("/sound/correcto.wav");
const loseAudio = new Audio("/sound/incorrecto.wav");
const againAudio = new Audio("/sound/playagain.mp3");
const clickAudio = new Audio("/sound/click.wav");



function generate_equation(){ 
  var num1 = Math.floor(Math.random() * 13),
      num2 = Math.floor(Math.random() * 13),
      dummyAnswer1 = Math.floor(Math.random() * 10),
      dummyAnswer2 = Math.floor(Math.random() * 10),
      allAnswers = [],
      switchAnswers = [];

  answer = eval(num1 + num2);
  
  document.getElementById("num1").innerHTML = num1; 
  document.getElementById("num2").innerHTML = num2; 

  allAnswers = [answer, dummyAnswer1, dummyAnswer2];

  for (i = allAnswers.length; i--;){
    switchAnswers.push(allAnswers.splice(Math.floor(Math.random() * (i + 1)), 1)[0]);
  };

  option1.innerHTML = switchAnswers[0];
  option2.innerHTML = switchAnswers[1];
  option3.innerHTML = switchAnswers[2]; 
};

option1.addEventListener("click", function(){
    if(option1.innerHTML == answer){
      generate_equation();
      winAudio.play();
      swal({
        position: 'top-end',
        icon: 'success',
        title: "🏆 Eres un campeón 🏆",
        text: '👍🏻!Buen Trabajo! 👏🏻',
        showConfirmButton: false,
        timer: 3600
      })
      updateScoreUser();
    }
    else{
      loseAudio.play();
    }
});

option2.addEventListener("click", function(){
    if(option2.innerHTML == answer){
      generate_equation();
      winAudio.play();
      swal({
        position: 'top-end',
        icon: 'success',
        title: "🏆 Eres un campeón 🏆",
        text: '👍🏻!Buen Trabajo! 👏🏻',
        showConfirmButton: false,
        timer: 3600
      })
      updateScoreUser();
    }
    else{
      loseAudio.play();
    }
});

option3.addEventListener("click", function(){
    if(option3.innerHTML == answer){
      generate_equation();
      winAudio.play();
      swal({
        position: 'top-end',
        icon: 'success',
        title: "🏆 Eres un campeón 🏆",
        text: '👍🏻!Buen Trabajo! 👏🏻',
        showConfirmButton: false,
        timer: 3600
      })
      updateScoreUser();
    }
    else{
      loseAudio.play();
    }
});

generate_equation()


