function MenuDesplegable() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function limpiarFormulario() {

    identificacion.value = ""
    nombre.value = ""
    fechaNacimiento.value = ""
    telefono.value = ""
    usuario.value = ""
    contraseña.value = ""
}

function getJSONDeLocalStore(nombreLocalStore) {

    return JSON.parse(
        localStorage.getItem(nombreLocalStore) || "[]") 
}

function setJSONDeLocalStore(nombreLocalStore, arrayJSON) {

    localStorage.setItem(nombreLocalStore, 
        JSON.stringify(arrayJSON))    
}
