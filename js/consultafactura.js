// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos del DOM utilizados en la funcionalidad
    const searchForm = document.getElementById('search-form'); // Formulario de búsqueda
    const searchInput = document.getElementById('search-input'); // Campo de entrada para buscar facturas
    const invoiceListContainer = document.getElementById('invoice-list-container'); // Contenedor donde se mostrarán las facturas

    // Función para obtener todas las facturas almacenadas en el localStorage
    function fetchInvoices() {
        return JSON.parse(localStorage.getItem('invoices')) || []; // Devuelve un array de facturas o un array vacío si no hay datos
    }

    // Función para mostrar facturas en el contenedor de la página
    function displayInvoices(invoices) {
        invoiceListContainer.innerHTML = ''; // Limpiar el contenido del contenedor de facturas
        invoices.forEach(invoice => {
            // Crear un elemento <div> para cada factura
            const invoiceDiv = document.createElement('div');
            invoiceDiv.classList.add('invoice-item'); // Agregar una clase para estilizar cada factura
            invoiceDiv.innerHTML = `
                <h3>Factura ID: ${invoice.id}</h3>
                <p><strong>Monto:</strong> $${invoice.amount.toFixed(2)}</p>
                <p><strong>Fecha de Emisión:</strong> ${invoice.issueDate}</p>
                <p><strong>Fecha de Vencimiento:</strong> ${invoice.dueDate}</p>
                <p><strong>Método de Pago:</strong> ${invoice.paymentMethod}</p>
                <p><strong>Estado de Pago:</strong> ${invoice.paymentStatus}</p>
                <p><strong>Concepto del Servicio:</strong> ${invoice.serviceConcept}</p>
                <p><strong>Descuento Aplicado:</strong> ${invoice.discount}%</p>
                <hr>
            `; // Plantilla para mostrar los detalles de la factura
            invoiceListContainer.appendChild(invoiceDiv); // Agregar la factura al contenedor
        });
    }

    // Función para buscar facturas basándose en un término de búsqueda
    function searchInvoices(query) {
        const invoices = fetchInvoices(); // Obtener todas las facturas
        if (!query) {
            return invoices; // Si no se proporciona un término de búsqueda, devolver todas las facturas
        }

        // Filtrar facturas que coincidan con el término de búsqueda en ID, estado de pago o fecha de vencimiento
        return invoices.filter(invoice => {
            return invoice.id.toLowerCase().includes(query.toLowerCase()) || // Buscar por ID
                   invoice.paymentStatus.toLowerCase().includes(query.toLowerCase()) || // Buscar por estado de pago
                   invoice.dueDate.includes(query); // Buscar por fecha de vencimiento
        });
    }

    // Función para manejar el evento de búsqueda
    function handleSearch(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recargar la página)
        const query = searchInput.value.trim(); // Obtener y limpiar el valor del campo de búsqueda
        const filteredInvoices = searchInvoices(query); // Obtener las facturas filtradas
        displayInvoices(filteredInvoices); // Mostrar las facturas filtradas
    }

    // Asociar el evento submit del formulario a la función handleSearch
    searchForm.addEventListener('submit', handleSearch);

    // Mostrar todas las facturas cuando se carga la página
    displayInvoices(fetchInvoices());
});
