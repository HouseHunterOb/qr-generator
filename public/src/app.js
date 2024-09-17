// Seleccionar las opciones de QR
document.querySelectorAll('.qr-option').forEach(option => {
    option.addEventListener('click', () => {
        const type = option.getAttribute('data-type');
        displayForm(type);
    });
});

// Mostrar formulario dinámico
function displayForm(type) {
    const formContainer = document.getElementById('dynamic-form');
    formContainer.innerHTML = ''; // Limpiar el formulario actual

    switch(type) {
        case 'url':
            formContainer.innerHTML = `
                <label for="url">Ingresa la URL:</label>
                <input type="text" id="url" placeholder="https://example.com">
            `;
            break;
        case 'vcard':
            formContainer.innerHTML = `
                <label for="name">Nombre Completo:</label>
                <input type="text" id="name" placeholder="John Doe">
                <label for="phone">Número de Teléfono:</label>
                <input type="text" id="phone" placeholder="+521234567890">
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="example@example.com">
            `;
            break;
        case 'text':
            formContainer.innerHTML = `
                <label for="text">Ingresa el texto:</label>
                <input type="text" id="text" placeholder="Escribe tu texto aquí">
            `;
            break;
        case 'email':
            formContainer.innerHTML = `
                <label for="email">Email de destino:</label>
                <input type="email" id="email" placeholder="example@example.com">
            `;
            break;
        case 'wifi':
            formContainer.innerHTML = `
                <label for="ssid">Nombre de la red (SSID):</label>
                <input type="text" id="ssid" placeholder="Mi WiFi">
                <label for="password">Contraseña:</label>
                <input type="text" id="password" placeholder="Contraseña del WiFi">
                <label for="encryption">Encriptación:</label>
                <select id="encryption">
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Sin contraseña</option>
                </select>
            `;
            break;
        case 'bitcoin':
            formContainer.innerHTML = `
                <label for="btc-address">Dirección Bitcoin:</label>
                <input type="text" id="btc-address" placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa">
            `;
            break;
        case 'event':
            formContainer.innerHTML = `
                <label for="event-name">Nombre del Evento:</label>
                <input type="text" id="event-name" placeholder="Mi Evento">
                <label for="date">Fecha:</label>
                <input type="date" id="date">
            `;
            break;
        case 'facebook':
            formContainer.innerHTML = `
                <label for="fb-page">Página de Facebook:</label>
                <input type="text" id="fb-page" placeholder="https://facebook.com/mipagina">
            `;
            break;
        default:
            formContainer.innerHTML = '<p>Selecciona una opción para generar un QR.</p>';
    }
}

// Evento para el botón de generar QR
document.getElementById('generate-qr-btn').addEventListener('click', () => {
    const formData = new FormData(document.querySelector('#dynamic-form'));
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica para enviar los datos al backend y generar el QR
});