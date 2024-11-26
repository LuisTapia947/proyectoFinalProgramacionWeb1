// Escuchar el evento DOMContentLoaded para asegurarse de que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos del formulario de factura
    const invoiceForm = document.getElementById('invoice-form');
    const invoiceIdInput = document.getElementById('invoice-id');
    const issueDateInput = document.getElementById('issue-date');
    const dueDateInput = document.getElementById('due-date');
    const amountInput = document.getElementById('amount');
    const discountInput = document.getElementById('discount');

    // Función para generar un ID único para cada factura
    function generateInvoiceId() {
        return 'INV-' + Math.floor(Math.random() * 1000000); // Genera un ID con prefijo "INV-" seguido de un número aleatorio
    }

    // Función para inicializar las fechas del formulario
    function initializeDates() {
        const today = new Date(); // Fecha actual
        const dueDate = new Date(); // Crear un objeto de fecha para la fecha de vencimiento
        dueDate.setDate(today.getDate() + 30); // Establecer la fecha de vencimiento a 30 días a partir de hoy

        // Asignar las fechas al formato adecuado (YYYY-MM-DD) para los inputs
        issueDateInput.value = today.toISOString().split('T')[0];
        dueDateInput.value = dueDate.toISOString().split('T')[0];
    }

    // Función para guardar una factura en el localStorage
    function saveInvoice(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario (envío y recarga de la página)

        // Crear un objeto que representa la factura con los datos del formulario
        const invoice = {
            id: invoiceIdInput.value, // ID de la factura generado automáticamente
            amount: parseFloat(amountInput.value), // Monto total de la factura
            issueDate: issueDateInput.value, // Fecha de emisión
            dueDate: dueDateInput.value, // Fecha de vencimiento
            paymentMethod: document.getElementById('payment-method').value, // Método de pago seleccionado
            paymentStatus: document.getElementById('payment-status').value, // Estado del pago (ej. pagado o pendiente)
            serviceConcept: document.getElementById('service-concept').value, // Concepto del servicio facturado
            discount: parseFloat(discountInput.value) || 0, // Descuento aplicado (0 si no se ingresa valor)
        };

        // Aplicar descuento si se especificó
        if (invoice.discount > 0) {
            const discountAmount = (invoice.amount * invoice.discount) / 100; // Calcular el monto del descuento
            invoice.amount -= discountAmount; // Restar el descuento del monto total
        }

        // Obtener facturas almacenadas en el localStorage (o un array vacío si no hay ninguna)
        const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
        invoices.push(invoice); // Agregar la nueva factura al array
        localStorage.setItem('invoices', JSON.stringify(invoices)); // Guardar la lista actualizada en el localStorage

        alert('Factura generada correctamente.'); // Notificar al usuario que la factura se guardó

        // Reiniciar el formulario para ingresar una nueva factura
        invoiceForm.reset();
        initializeForm(); // Volver a inicializar el formulario con valores predeterminados
    }

    // Función para recuperar facturas del localStorage
    function fetchInvoices() {
        return JSON.parse(localStorage.getItem('invoices')) || []; // Devuelve las facturas almacenadas o un array vacío
    }

    // Función para mostrar facturas almacenadas en la consola (para fines de depuración)
    function displayInvoices() {
        const invoices = fetchInvoices(); // Obtener facturas
        console.log('Facturas Generadas:', invoices); // Mostrar facturas en consola
    }

    // Función para inicializar el formulario con valores predeterminados
    function initializeForm() {
        invoiceIdInput.value = generateInvoiceId(); // Generar un nuevo ID único para la factura
        initializeDates(); // Configurar las fechas iniciales
    }

    // Asociar el evento de envío del formulario a la función saveInvoice
    invoiceForm.addEventListener('submit', saveInvoice);

    // Inicializar el formulario al cargar la página
    initializeForm();

    // Mostrar facturas generadas en la consola al cargar la página (solo para depuración)
    displayInvoices();
});
