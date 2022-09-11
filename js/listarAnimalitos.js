const setIdAnimalitoSelecionado = (id) => {
    console.log(id);
    localStorage.setItem("animalito", JSON.stringify({"id": id}))
    animalitoSeleccionado = id;
}


const listarAnimalitos = () => {
    let resultado = ``;
    // Por cada animalito a agregar sume un numero a 13        
    let cantImg = 13 + 1;
    for(let numImg = 1; numImg < cantImg; numImg++){
        console.log(numImg)
        resultado += `
            <div class="slick">
                <a href="/html/juegos.html" type="button" onclick="setIdAnimalitoSelecionado(${numImg})">
                    <picture>
                        <img src="/resource/img/animalito/${numImg}.png" alt="animalito">
                    </picture>
                </a>
            </div>
        `;
    }
    
    document.getElementById("track").innerHTML = resultado;
};

listarAnimalitos();
