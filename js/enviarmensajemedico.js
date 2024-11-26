// Escuchar el evento DOMContentLoaded para asegurarse de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos del DOM utilizados en la funcionalidad
    const sendMessageButton = document.getElementById('send-message'); // Botón para enviar mensaje
    const recipientSelect = document.getElementById('recipient'); // Selector de destinatarios
    const messageIdInput = document.getElementById('message-id'); // Campo para mostrar el ID del mensaje
    const messageDateInput = document.getElementById('message-date'); // Campo para mostrar la fecha y hora del mensaje

    // Función para generar un ID único y asignar la fecha/hora actual al mensaje
    function generateMessageDetails() {
        messageIdInput.value = 'MSG-' + Math.floor(Math.random() * 1000000); // Generar un ID único con prefijo "MSG-"
        messageDateInput.value = new Date().toLocaleString(); // Establecer la fecha y hora actual en formato local
    }

    // Función para cargar los médicos disponibles en el elemento <select>
    function loadDoctors() {
        const doctors = JSON.parse(localStorage.getItem('personalmedico')) || []; // Obtener los datos de médicos del localStorage
        doctors.forEach(doctor => {
            const option = document.createElement('option'); // Crear un nuevo elemento <option>
            option.value = doctor.nombre; // Establecer el valor de la opción como el nombre del médico
            option.textContent = doctor.nombre; // Establecer el texto visible de la opción
            recipientSelect.appendChild(option); // Agregar la opción al <select> de destinatarios
        });
    }

    // Asociar el evento click al botón de enviar mensaje
    sendMessageButton.addEventListener('click', function () {
        // Crear un objeto que representa el mensaje
        const message = {
            id: messageIdInput.value, // ID único del mensaje
            sender: document.getElementById('sender').value, // Nombre del remitente
            recipient: recipientSelect.value, // Nombre del destinatario seleccionado
            date: messageDateInput.value, // Fecha y hora del mensaje
            content: document.getElementById('message-content').value, // Contenido del mensaje
            status: 'no_leido', // Estado inicial del mensaje
        };

        // Guardar el mensaje en localStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || []; // Obtener mensajes existentes o inicializar un array vacío
        messages.push(message); // Agregar el nuevo mensaje a la lista
        localStorage.setItem('messages', JSON.stringify(messages)); // Guardar la lista actualizada en localStorage

        alert('Mensaje enviado correctamente.'); // Notificar al usuario que el mensaje se envió
        document.getElementById('message-form').reset(); // Reiniciar el formulario para ingresar un nuevo mensaje
        generateMessageDetails(); // Generar un nuevo ID y fecha para el siguiente mensaje
    });

    // Inicializar la funcionalidad al cargar la página
    loadDoctors(); // Cargar los médicos en el <select>
    generateMessageDetails(); // Generar un ID y fecha/hora inicial para el mensaje
});
