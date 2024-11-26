var nombreLocalStore1 = "pasiente"


function recuperarDatosFormulario() {
    var nombre = document.getElementById("nombre").value
    var identificacion = document.getElementById("identificacion").value
    var fechaNacimiento = document.getElementById("fechaNacimiento").value
    var correo = document.getElementById("correo").value
    var fechaRegistro = document.getElementById("fecha-registro").value
    var telefono = document.getElementById("telefono").value
    var usuario = document.getElementById("usuario").value
    var contraseña = document.getElementById("contraseña").value
}


function guardar() {

    recuperarDatosFormulario()

        pasiente = new pasientes(identificacion.value, nombre.value,
            fechaNacimiento.value, telefono.value, correo.value, usuario.value, contraseña.value)

        var Pasientes = getJSONDeLocalStore(nombreLocalStore1)

        Pasientes.push(pasiente)

        setJSONDeLocalStore(nombreLocalStore1, Pasientes)

        limpiarFormulario()

        console.log(pasiente)

        alert("Datos guardados exitosamente.")
  
}