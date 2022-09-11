const mostrarAnimalitoSeleccionado = ()=>{
    var animalito = JSON.parse(localStorage.getItem("animalito"));
    document.getElementById("resultado").innerHTML = `
    <img src="/resource/img/animalito/${animalito.id}.png" alt="animalito">
`;
};


const mostrarUserName = () => {
    const nombre = JSON.parse(localStorage.getItem("user"));
    document.getElementById("nombre").innerHTML = nombre.name;
};


mostrarAnimalitoSeleccionado();
mostrarUserName();

// localStorage.clear();
