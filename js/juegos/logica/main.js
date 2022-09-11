  //Sonidos del juego
  let winAudio = new Audio("/sound/correcto.wav");
  let loseAudio = new Audio("/sound/incorrecto.wav");
  let againAudio = new Audio("/sound/playagain.mp3");
  let clickAudio = new Audio("/sound/click.wav");

var img = [
  "https://img.freepik.com/free-vector/cute-rabbit-astronaut-riding-carrot-rocket-cartoon-vector-icon-illustration-animal-nature-isolated_138676-5243.jpg?w=740&t=st=1661519636~exp=1661520236~hmac=850369463ae0cec130f89451c090847ca4b5bd72e542e86ca5fe4806a87e0935",
  "https://img.freepik.com/free-vector/cute-cool-cat-wearing-eyeglasses-hoodie-cartoon-vector-icon-illustration-animal-fashion-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4234.jpg?t=st=1661518927~exp=1661519527~hmac=878406844fff4d70b621dd65128bd4b4b714310f271d6d541d5bd1af75a78ae0",
  "https://img.freepik.com/free-vector/cute-owl-with-moon-stars-cartoon-icon-illustration_138676-2251.jpg?w=740&t=st=1661518763~exp=1661519363~hmac=34a37293da786ed0abce7d86634588939fe3c4387f9c1906f33487aec87c9d45",
  "https://img.freepik.com/premium-vector/cute-screaming-cockatiel-bird_138676-2070.jpg?w=740",
  "https://img.freepik.com/free-vector/home-pets-white-cat-cute-kitten-play-with-ball-parrot-sitting-dachshund-dog-head-feline-bird-puppy-cartoon-characters-petcare-adoption-love-animals-concept-vector-illustration_107791-8914.jpg?w=1060&t=st=1661518403~exp=1661519003~hmac=ba2bd596a96778c66153f1d0c29cd8b29519226be5345e43dfe7cd062acc7368",
  'https://img.freepik.com/premium-vector/cute-cat-cartoon-petshop-logo-flat-cartoon-style-suitable-web-landing-page-banner-flyer-sticker-wallpaper-card-background_226569-70.jpg?w=740',
  'https://media.gettyimages.com/vectors/cute-cartoon-dachshunds-in-love-vector-id865392634?s=2048x2048',
  'https://media.gettyimages.com/vectors/heart-shaped-sea-otters-in-love-vector-graphics-vector-id1183276814?s=2048x2048',
  'https://media.gettyimages.com/vectors/funny-no-prob-llama-vector-illustration-vector-id1089951888?s=2048x2048',
  'https://media.gettyimages.com/vectors/cute-sloth-sitting-in-lotus-yoga-pose-cartoon-sloth-bear-vector-vector-id1076571820?s=2048x2048',
  'https://img.freepik.com/free-vector/cute-cat-corgi-dog-cartoon-vector-icon-illustration-animal-friend-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3558.jpg?w=740&t=st=1661518970~exp=1661519570~hmac=2ce42da15b2f43a7a5129426279152dba8a0acb504bed467241b702974e37655',
  "https://img.freepik.com/free-vector/cute-cat-cupcake-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3653.jpg?t=st=1661491729~exp=1661492329~hmac=af0537e65b4076201ca7462298a8aa0b4a68a4f627baf01cf5cc39bd1e84d965"
]

var texto = "Clicks: ";
var texto2 = "Ganados: "; 
var old = 11
var clicks = 0
function aleatorio() {
  let root = document.documentElement
  root.style.setProperty('--image','url('+img[old]+')')
  old++
  
  if(old > 11) {
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