  //Sonidos del juego
  let winAudio = new Audio("/sound/correcto.wav");
  let loseAudio = new Audio("/sound/incorrecto.wav");
  let againAudio = new Audio("/sound/playagain.mp3");
  let clickAudio = new Audio("/sound/click.wav");

var img = [
  "/resource/img/buhok.png",
  "/resource/img/cacatua.png",
  "/resource/img/conejo.png",
  "/resource/img/gatocaja.png",
  "/resource/img/gatocool.png",
  "/resource/img/gatocupcake.png",
  "/resource/img/gatoperro.png",
  "/resource/img/nutrias.png"

]

var texto = "Clicks: ";
var texto2 = "Ganados: "; 
var old = 7
var clicks = 0
function aleatorio() {
  let root = document.documentElement
  root.style.setProperty('--image','url('+img[old]+')')
  old++
  //`<img src="/resource/img/animalito/${numeros[i]}.png" alt=" ">`
  //('--image','src="/resource/img/$('+img[old]+').png')


  /*let tarjeta = document.getElementById(i);
    tarjeta.innerHTML = `<img src="/resource/img/animalito/${numeros[i]}.png" alt=" ">`;
    tarjeta.disabled = true;*/
  if(old > 7) {
    old = 0
  }  
  document.querySelector('#numero').innerHTML = texto2 + old
  var ul = document.querySelectorAll('#puzz i');
  for(var i=0;i<ul.length;i++){
    ul[i].style.left = Math.random()*(window.innerWidth-100) + 'px'
    ul[i].style.top = Math.random()*(window.innerHeight-100) + 'px'
  }
  // for (var i = ul.children.length; i >= 0; i--) {
  //   ul.appendChild(ul.children[Math.random() * i | 0]);    
  // }
}
aleatorio()

function recargar() {
  var hecho = document.querySelectorAll('.done')
  hecho.forEach(function(e){
    e.classList.toggle('done')
  })
  var dropped = document.querySelectorAll('.dropped')
  dropped.forEach(function(e){
    e.classList.toggle('dropped')
  })
  var todoHecho = document.querySelector('.allDone')
  todoHecho.style = ''
  todoHecho.classList.toggle('allDone')
}


// funcionalidad móvil
var p = document.querySelectorAll('#puzz i')
p.forEach(function(e){
  e.addEventListener('mousedown', function(){
    clicks++
    document.querySelector('#clicks').innerHTML = texto + clicks
  })
  e.addEventListener('click', function(){
    if(document.querySelector('.clicked')){
      document.querySelector('.clicked').classList.toggle('clicked')
      e.classList.toggle('clicked')
    }  
  })
})

var fp = document.querySelectorAll('#puz i')
fp.forEach(function(el){
  el.addEventListener('click', function(){
    if(document.querySelector('.clicked')){
      var c = document.querySelector('.clicked')
      if(c.classList.contains(el.classList)) {
        el.classList.add('dropped')
        c.classList.add('done')
        c.classList.toggle('clicked')

        if(document.querySelectorAll('.dropped').length == 9) {
          document.querySelector('#puz').classList.add('allDone')
          document.querySelector('#puz').style.border = 'none'  
          document.querySelector('#puz').style.animation = 'allDone 1s linear forwards'

          setTimeout(function(){
            recargar()
            aleatorio()            
          },1500)
        } 
      }
    }    
  })
})

// arrastrar y soltar en el escritorio
function allowDrop(ev) {
  ev.preventDefault();
  
  
}
//arrastrar 
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);  
  clickAudio.play();
  
}


//soltar
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text")
  if(ev.target.className == data){
    ev.target.classList.add('dropped')
    document.querySelector('.'+data+"[draggable='true']").classList.add('done')
    winAudio.play();

  
    if(document.querySelectorAll('.dropped').length == 9) {
      document.querySelector('#puz').classList.add('allDone')
      document.querySelector('#puz').style.border = 'none'  
      document.querySelector('#puz').style.animation = 'allDone 1s linear forwards'  
      swal({
        position: 'top-end',
        icon: 'success',
        title: "🏆 Eres un campeón 🏆",
        text: '👍🏻!Buen Trabajo! 👏🏻',
        showConfirmButton: false,
        timer: 3600
      }) 
      againAudio.play();  
      updateScoreUser();


      //Establecer el tiempo de espera
      setTimeout(function(){
        recargar()
        aleatorio()        
      },1500)
    }    
  }  
  else{
    loseAudio.play();
  }
}
