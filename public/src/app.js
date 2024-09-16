const QRCode = require('qrcode');

// Elementos del DOM
const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const qrCanvas = document.getElementById('qr-code');

// Tipos de QR (ejemplo de cómo agregar diferentes tipos)
const qrOptions = document.querySelectorAll('.qr-option');
let qrType = 'URL';

// Escoger tipo de QR
qrOptions.forEach(option => {
    option.addEventListener('click', function() {
        qrType = this.innerText;
        qrInput.placeholder = `Introduce el contenido para ${qrType}`;
    });
});

// Función para generar QR
generateBtn.addEventListener('click', function() {
    const inputData = qrInput.value;

    if (inputData.trim() === '') {
        alert('Por favor introduce un valor válido.');
        return;
    }

    QRCode.toCanvas(qrCanvas, inputData, function (error) {
        if (error) console.error(error);
        console.log('QR generado correctamente!');
    });
});