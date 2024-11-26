var nombreLocalStore2 = "personalmedico"

function recuperarDatosFormulario() {
    var idMedico = document.getElementById("idMedico").value
    var nombre = document.getElementById("nombre").value
    var LicenciaProfecional = document.getElementById("LicenciaProfecional").value
    var selectEspecialidades = document.getElementById("selectEspecialidades").value
    var telefono = document.getElementById("telefono").value
    var correo = document.getElementById("correo").value
    var usuario = document.getElementById("usuario").value
    var contraseña = document.getElementById("contraseña").value
}

function guardar() {

    recuperarDatosFormulario()

    medico = new personalMedico(idMedico.value, nombre.value, LicenciaProfecional, 
        selectEspecialidades.value, telefono.value, correo.value, usuario.value, contraseña.value)

    var PersonalMedico = getJSONDeLocalStore(nombreLocalStore2)

    PersonalMedico.push(medico)

    setJSONDeLocalStore(nombreLocalStore2, PersonalMedico)

    console.log(medico)

    alert("Datos guardados exitosamente.")
}


function agregarIDentificacores() {
    // Obtener el elemento <select> donde se agregarán las opciones
    var matriculas = document.getElementById("selectEspecialidades");

    // Verificar si el elemento select existe
    if (!matriculas) {
        console.error("No se encuentra el elemento select con id 'selectEspecialidades'.");
        return;
    }

    // Obtener las especialidades del localStorage
    var especialidades = getEspecialidades();

    // Limpiar las opciones actuales (si las hubiera)
    matriculas.innerHTML = '<option value="" disabled selected>Elige una opción</option>';

    // Recorrer las especialidades y agregar una opción por cada nombre
    for (const especialidad of especialidades) {
        var option = document.createElement("option");
        option.text = especialidad.nombre;  // Asumimos que cada objeto tiene un 'nombre'
        option.value = especialidad.idEspecialidad;  // Utiliza el 'idEspecialidad' para el valor
        matriculas.add(option);  // Agregar la opción al select
    }

}

document.addEventListener("DOMContentLoaded", agregarIDentificacores);

