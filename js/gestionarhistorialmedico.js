document.addEventListener('DOMContentLoaded', function () {
    // Obtención de referencias a los elementos del DOM necesarios
    const historyForm = document.getElementById('medical-history-form'); // Formulario principal del historial médico
    const historyIdInput = document.getElementById('history-id'); // Campo para el ID del historial
    const consultationDateInput = document.getElementById('consultation-date'); // Campo para la fecha de consulta
    const diagnosisInput = document.getElementById('diagnosis'); // Campo para el diagnóstico
    const treatmentInput = document.getElementById('treatment'); // Campo para el tratamiento
    const doctorNotesInput = document.getElementById('doctor-notes'); // Campo para las notas del médico
    const attachmentsInput = document.getElementById('attachments'); // Campo para adjuntar archivos
    const consultHistoryButton = document.getElementById('consult-history'); // Botón para consultar historiales
    const selectHistoryId = document.getElementById('select-history-id'); // Dropdown para seleccionar un historial

    // Función para inicializar el formulario con un ID único generado automáticamente
    function initializeForm() {
        historyIdInput.value = 'HIST-' + Math.floor(Math.random() * 1000000); // Genera un ID único con el prefijo "HIST-"
    }

    // Función para guardar el historial médico en el localStorage
    function saveHistory(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página)

        // Construcción del objeto del historial médico con los datos del formulario
        const history = {
            id: historyIdInput.value, // ID del historial
            date: consultationDateInput.value, // Fecha de consulta
            diagnosis: diagnosisInput.value, // Diagnóstico ingresado
            treatment: treatmentInput.value, // Tratamiento ingresado
            doctorNotes: doctorNotesInput.value, // Notas del médico
            attachments: [], // Inicialización del array para archivos adjuntos
        };

        // Procesamiento de archivos adjuntos, si los hay
        if (attachmentsInput.files.length > 0) {
            for (let file of attachmentsInput.files) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    // Agrega cada archivo como un objeto con su contenido codificado en Base64
                    history.attachments.push({
                        name: file.name,
                        type: file.type,
                        data: event.target.result,
                    });
                };
                reader.readAsDataURL(file); // Lee el archivo como Base64
            }
        }

        // Recupera los historiales existentes del localStorage (o crea uno vacío si no hay ninguno)
        const histories = JSON.parse(localStorage.getItem('medicalHistories')) || [];
        histories.push(history); // Agrega el nuevo historial a la lista
        localStorage.setItem('medicalHistories', JSON.stringify(histories)); // Guarda la lista actualizada en el localStorage

        alert('Historial médico guardado correctamente.'); // Notifica al usuario del éxito
        historyForm.reset(); // Resetea el formulario
        initializeForm(); // Re-inicializa el formulario con un nuevo ID
        populateHistoryDropdown(); // Actualiza las opciones del dropdown
    }

    // Función para rellenar el dropdown con los IDs de historiales médicos guardados
    function populateHistoryDropdown() {
        selectHistoryId.innerHTML = '<option value="" disabled selected>Selecciona un ID de Historial</option>'; // Reinicia las opciones
        const histories = JSON.parse(localStorage.getItem('medicalHistories')) || []; // Obtiene la lista de historiales
        histories.forEach(history => {
            // Crea y agrega una opción por cada historial
            const option = document.createElement('option');
            option.value = history.id;
            option.textContent = history.id;
            selectHistoryId.appendChild(option);
        });
    }

    // Función para consultar un historial médico específico y cargar sus datos en el formulario
    function consultHistory() {
        const selectedId = selectHistoryId.value; // Obtiene el ID seleccionado en el dropdown
        if (!selectedId) {
            alert('Por favor, selecciona un historial.'); // Valida que se haya seleccionado un ID
            return;
        }

        // Recupera la lista de historiales médicos del localStorage
        const histories = JSON.parse(localStorage.getItem('medicalHistories')) || [];
        const history = histories.find(h => h.id === selectedId); // Busca el historial con el ID seleccionado

        if (history) {
            // Si se encuentra el historial, rellena los campos del formulario
            historyIdInput.value = history.id;
            consultationDateInput.value = history.date;
            diagnosisInput.value = history.diagnosis;
            treatmentInput.value = history.treatment || ''; // Asigna un valor vacío si no existe
            doctorNotesInput.value = history.doctorNotes || ''; // Asigna un valor vacío si no existe
            alert('Historial cargado correctamente.'); // Notifica al usuario del éxito
        } else {
            alert('No se encontró el historial seleccionado.'); // Notifica si el historial no se encuentra
        }
    }

    // Asociación de eventos a los elementos interactivos
    historyForm.addEventListener('submit', saveHistory); // Asocia la función de guardado al evento de envío del formulario
    consultHistoryButton.addEventListener('click', consultHistory); // Asocia la función de consulta al botón correspondiente

    // Inicialización del formulario y del dropdown al cargar la página
    initializeForm(); // Genera un ID único para el formulario
    populateHistoryDropdown(); // Carga las opciones de IDs guardados en el dropdown
});
