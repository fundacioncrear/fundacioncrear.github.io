const efectoCortina = () => {
    document.querySelector(".top").style.height= "10%";
    document.querySelector(".bottom").style.height= "10%";
}

const guardarUserName = ()=>{
    console.log(JSON.stringify(document.getElementById("name_user").value))
    localStorage.setItem("user", JSON.stringify({"name":document.getElementById("name_user").value})) ;
}

efectoCortina();