// Definir claves para el almacenamiento en localStorage
const nombreLocalStore = "CitasMedicas"; // Clave para guardar citas médicas
const nombreLocalStore2 = "personalmedico"; // Clave para guardar médicos

// Clase para representar una cita médica
class Citas {
    constructor(id, fecha, medicoId, especialidadId) {
        this.id = id; // ID único de la cita
        this.fecha = fecha; // Fecha de la cita
        this.medicoId = medicoId; // ID del médico asociado
        this.especialidadId = especialidadId; // ID de la especialidad asociada
    }
}

// **Funciones para manejo de citas**
// Obtener las citas almacenadas en localStorage
function getCitas() {
    return JSON.parse(localStorage.getItem(nombreLocalStore)) || [];
}

// Guardar las citas en localStorage
function setCitas(citas) {
    localStorage.setItem(nombreLocalStore, JSON.stringify(citas));
}

// Generar un ID único basado en el tiempo
function generarId() {
    return Date.now();
}

// Obtener las especialidades desde localStorage
function getEspecialidades() {
    return JSON.parse(localStorage.getItem("especialidadesMedicas")) || [];
}

// Obtener los médicos desde localStorage
function getMedicos() {
    return JSON.parse(localStorage.getItem(nombreLocalStore2)) || [];
}

// Guardar o actualizar una cita
function guardarCita() {
    const idCita = document.getElementById("idCita").value || generarId(); // Obtener ID o generar uno nuevo
    const fecha = document.getElementById("fecha").value; // Obtener fecha de la cita
    const medicoId = document.getElementById("selectMedico").value; // Obtener ID del médico
    const especialidadId = document.getElementById("selectEspecialidad").value; // Obtener ID de la especialidad

    const citasList = getCitas(); // Obtener la lista de citas existentes
    
    // Buscar si la cita ya existe para actualizarla
    const indice = citasList.findIndex(cita => cita.id == idCita);
    if (indice >= 0) {
        citasList[indice] = new Citas(idCita, fecha, medicoId, especialidadId);
    } else {
        citasList.push(new Citas(idCita, fecha, medicoId, especialidadId)); // Agregar nueva cita
    }

    setCitas(citasList); // Guardar cambios en localStorage
    limpiarFormulario(); // Limpiar el formulario
    consultarCitas(); // Actualizar la tabla
}

// Consultar todas las citas y mostrarlas en una tabla
function consultarCitas() {
    const citasList = getCitas(); // Obtener citas
    const tabla = document.getElementById("tablaCitas").getElementsByTagName('tbody')[0];
    tabla.innerHTML = ""; // Limpiar contenido previo

    const medicos = getMedicos(); // Obtener médicos
    const especialidades = getEspecialidades(); // Obtener especialidades

    citasList.forEach(cita => {
        const medico = medicos.find(m => m.idMedico === cita.medicoId); // Buscar médico por ID

        const fila = document.createElement("tr");
        fila.innerHTML =
            `<td>${cita.id}</td>
            <td>${cita.fecha}</td>
            <td>${medico ? medico.nombre : 'No asignado'}</td>
            <td>${cita.especialidadId}</td>
            <td>
                <button onclick="editarCita(${cita.id})">Editar</button>
                <button onclick="eliminarCita(${cita.id})">Eliminar</button>
            </td>`;

        tabla.appendChild(fila); // Agregar fila a la tabla
    });
}

// Editar una cita existente
function editarCita(idCita) {
    const citasList = getCitas();
    const cita = citasList.find(c => c.id == idCita);

    if (cita) {
        document.getElementById("idCita").value = cita.id;
        document.getElementById("fecha").value = cita.fecha;
        document.getElementById("selectMedico").value = cita.medicoId;
        document.getElementById("selectEspecialidad").value = cita.especialidadId;
    }
}

// Eliminar una cita por su ID
function eliminarCita(idCita) {
    let citasList = getCitas();
    citasList = citasList.filter(cita => cita.id != idCita);

    setCitas(citasList); // Guardar cambios
    consultarCitas(); // Actualizar la vista
}

// Limpiar el formulario después de guardar o editar una cita
function limpiarFormulario() {
    document.getElementById("formCita").reset();
    document.getElementById("idCita").value = ""; // Borrar ID para nueva entrada
}

// **Funciones para manejo de especialidades y médicos**
// Cargar especialidades en el select correspondiente
function cargarEspecialidades() {
    const especialidades = getEspecialidades();
    const selectEspecialidad = document.getElementById("selectEspecialidad");

    selectEspecialidad.innerHTML = '<option value="" disabled selected>Elige una especialidad</option>';

    especialidades.forEach(especialidad => {
        const option = document.createElement("option");
        option.value = especialidad.idEspecialidad;
        option.text = especialidad.nombre;
        selectEspecialidad.appendChild(option);
    });
}

// Filtrar y cargar médicos según la especialidad seleccionada
function seleccionarMedico() {
    const especialidadId = document.getElementById("selectEspecialidad").value;
    const medicos = getMedicos();
    const selectMedico = document.getElementById("selectMedico");

    selectMedico.innerHTML = '<option value="" disabled selected>Selecciona un médico</option>';

    const medicosPorEspecialidad = medicos.filter(medico => medico.especialidad === especialidadId);

    if (medicosPorEspecialidad.length > 0) {
        medicosPorEspecialidad.forEach(medico => {
            const option = document.createElement("option");
            option.value = medico.idMedico;
            option.text = medico.nombre;
            selectMedico.appendChild(option);
        });
    } else {
        const option = document.createElement("option");
        option.value = "";
        option.text = "No hay médicos disponibles";
        selectMedico.appendChild(option);
    }
}

// Inicializar la página al cargar
document.addEventListener("DOMContentLoaded", function() {
    cargarEspecialidades(); // Cargar especialidades
    consultarCitas(); // Mostrar citas existentes
});
