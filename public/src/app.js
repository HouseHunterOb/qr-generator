const qrOptions = document.querySelectorAll('.qr-option');
const formContainer = document.getElementById('form-fields');
const formTitle = document.getElementById('form-title');
const formDescription = document.getElementById('form-description');

qrOptions.forEach(option => {
    option.addEventListener('click', () => {
        const type = option.getAttribute('data-type');
        generateForm(type);
    });
});

function generateForm(type) {
    formContainer.innerHTML = ''; // Limpiar formulario
    formTitle.innerHTML = `Código QR ${capitalize(type)}`;
    formDescription.innerHTML = `Ingresa los datos para generar el código QR ${type}.`;

    if (type === 'url') {
        formContainer.innerHTML = `
            <div class="form-group">
                <label for="url">URL:</label>
                <input type="text" id="url" placeholder="https://tusitio.com">
            </div>`;
    } else if (type === 'vcard') {
        formContainer.innerHTML = `
            <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" placeholder="Nombre completo">
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="ejemplo@correo.com">
            </div>
            <div class="form-group">
                <label for="phone">Teléfono:</label>
                <input type="text" id="phone" placeholder="Número de teléfono">
            </div>`;
    } else if (type === 'email') {
        formContainer.innerHTML = `
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="Correo electrónico">
            </div>
            <div class="form-group">
                <label for="subject">Asunto:</label>
                <input type="text" id="subject" placeholder="Asunto del mensaje">
            </div>
            <div class="form-group">
                <label for="message">Mensaje:</label>
                <textarea id="message" placeholder="Escribe tu mensaje aquí..."></textarea>
            </div>`;
    } else if (type === 'wifi') {
        formContainer.innerHTML = `
            <div class="form-group">
                <label for="ssid">Nombre de la Red (SSID):</label>
                <input type="text" id="ssid" placeholder="Nombre de la red">
            </div>
            <div class="form-group">
                <label for="password">Contraseña:</label>
                <input type="text" id="password" placeholder="Contraseña de la red">
            </div>`;
    } else if (type === 'sms') {
        formContainer.innerHTML = `
            <div class="form-group">
                <label for="phone">Teléfono:</label>
                <input type="text" id="phone" placeholder="Número de teléfono">
            </div>
            <div class="form-group">
                <label for="message">Mensaje:</label>
                <textarea id="message" placeholder="Escribe tu mensaje aquí..."></textarea>
            </div>`;
    }
    // Añadir más opciones de formularios según el tipo de QR (Bitcoin, Evento, Facebook, etc.)
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}