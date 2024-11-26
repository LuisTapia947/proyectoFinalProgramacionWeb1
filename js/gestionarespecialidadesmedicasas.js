// Nombre del localStorage utilizado para almacenar las especialidades médicas
const nombreLocalStore = "especialidadesMedicas";

// Clase para representar una especialidad médica
class EspecialidadMedica {
    constructor(idEspecialidad, nombre, descripcion, estado, fechaCreacion) {
        this.idEspecialidad = idEspecialidad; // ID único de la especialidad
        this.nombre = nombre; // Nombre de la especialidad
        this.descripcion = descripcion; // Descripción detallada de la especialidad
        this.estado = estado; // Estado de la especialidad (ej. activa/inactiva)
        this.fechaCreacion = fechaCreacion; // Fecha de creación de la especialidad
    }
}

// Función para obtener las especialidades almacenadas en el localStorage
function getEspecialidades() {
    return JSON.parse(localStorage.getItem(nombreLocalStore)) || []; // Devuelve las especialidades o un array vacío si no existen
}

// Función para guardar una lista de especialidades en el localStorage
function setEspecialidades(especialidades) {
    localStorage.setItem(nombreLocalStore, JSON.stringify(especialidades)); // Serializa y guarda las especialidades
}

// Función para guardar o actualizar una especialidad médica
function guardarEspecialidad() {
    // Obtener los valores ingresados en el formulario
    const idEspecialidad = document.getElementById("idEspecialidad").value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const estado = document.getElementById("estado").value;
    const fechaCreacion = document.getElementById("fechaCreacion").value;

    // Obtener las especialidades existentes del localStorage
    const especialidades = getEspecialidades();

    // Buscar si la especialidad ya existe (por su ID)
    const indice = especialidades.findIndex(e => e.idEspecialidad == idEspecialidad);
    if (indice >= 0) {
        // Si ya existe, actualiza los datos de la especialidad
        especialidades[indice] = new EspecialidadMedica(idEspecialidad, nombre, descripcion, estado, fechaCreacion);
    } else {
        // Si no existe, crea una nueva especialidad y la agrega a la lista
        especialidades.push(new EspecialidadMedica(idEspecialidad, nombre, descripcion, estado, fechaCreacion));
    }

    // Guardar la lista actualizada en el localStorage
    setEspecialidades(especialidades);

    // Mostrar la lista actualizada en la consola para depuración
    console.log(especialidades);
}

// Función para editar una especialidad existente
function editarEspecialidad() {
    // Obtener los valores ingresados en el formulario
    const idEspecialidad = document.getElementById("idEspecialidad").value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const estado = document.getElementById("estado").value;
    const fechaCreacion = document.getElementById("fechaCreacion").value;

    // Validar que se haya proporcionado un ID
    if (!idEspecialidad) {
        alert("No se ha seleccionado ninguna especialidad para editar.");
        return; // Termina la ejecución si no hay ID
    }

    // Obtener las especialidades del localStorage
    const especialidades = getEspecialidades();

    // Buscar la especialidad con el ID proporcionado
    const indice = especialidades.findIndex(e => e.idEspecialidad == idEspecialidad);
    if (indice >= 0) {
        // Actualizar los datos de la especialidad si existe
        especialidades[indice] = new EspecialidadMedica(
            idEspecialidad,
            nombre,
            descripcion,
            estado,
            fechaCreacion
        );

        // Guardar la lista actualizada en el localStorage
        setEspecialidades(especialidades);

        alert("Especialidad actualizada correctamente."); // Notificar éxito al usuario
    } else {
        alert("No se encontró la especialidad a editar."); // Notificar si no se encuentra la especialidad
    }
}

// Función para eliminar una especialidad por su ID
function eliminarEspecialidad() {
    // Obtener las especialidades existentes del localStorage
    let especialidades = getEspecialidades();

    // Obtener el ID de la especialidad que se desea eliminar
    const idEspecialidad = document.getElementById("idEspecialidad").value;

    // Filtrar la lista para excluir la especialidad con el ID proporcionado
    especialidades = especialidades.filter(e => e.idEspecialidad != idEspecialidad);

    // Guardar la lista actualizada en el localStorage
    setEspecialidades(especialidades);

    alert("Especialidad eliminada correctamente."); // Notificar éxito al usuario
}



