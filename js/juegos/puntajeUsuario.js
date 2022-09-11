class Usuario{
    constructor(nombre, puntaje){
        this.nombre = nombre;
        this.puntaje = puntaje;
    }
}

const openStorageUser = (key) => {
    return localStorage.getItem(key);
};

const createStorageUser = (clave, valor)=>{
    if(openStorageUser(clave) === null){
        console.log("creando...");
        localStorage.setItem(clave, valor);
    }
};

const findAll = () => {
    const respuesta = openStorageUser("listaUsuarios");
    let datos = JSON.parse(respuesta);
    return datos;
}

const findByName = (name) => {
    let datos = findAll();

    const cantUsers = datos.length;
    for(var usuario = 0; usuario<cantUsers; usuario++){
        if(datos[usuario].nombre == name)
        return datos[usuario];
    }
    return null;
};

const saveUser = (objUsuario) =>{
    const resultado = openStorageUser("listaUsuarios");
    let datos = JSON.parse(resultado);
    datos.push(JSON.parse(JSON.stringify(objUsuario)));
    localStorage.setItem("listaUsuarios", JSON.stringify(datos));
    console.log("Usuario creado");
};

const updateScoreUser = () => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    let datos = findAll();
    datos.forEach(user => {
        if(user.nombre == usuario.name) {
            // console.log(user);
            user.puntaje += 1;
            // console.log(user);
        }
    });
    localStorage.setItem("listaUsuarios", JSON.stringify(datos));
};


const setScoreByName = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const datos = findByName(user.name);

    if(datos === null){
        console.log("Nombre no registrado");
        saveUser(new Usuario(user.name, 0));
    }

    document.getElementById("score").innerHTML = `${findByName(user.name).puntaje}`;
};

const run = () => {
    createStorageUser("listaUsuarios", JSON.stringify([new Usuario("Gisell", 100)]))
    setScoreByName();
    // updateScoreUser();
};


run();


