// Variables de selección
const qrColorPicker = document.getElementById('qr-color');
const qrShapeSelector = document.getElementById('qr-shape');
const qrLogoUploader = document.getElementById('qr-logo');
const qrPreview = document.getElementById('qr-preview');
const downloadJpgButton = document.getElementById('download-jpg');
const downloadVectorButton = document.getElementById('download-vector');
const textAreas = document.querySelectorAll('textarea');

// Estado del QR
let qrOptions = {
    text: '',
    color: '#000000',
    shape: 'square',
    logo: null,
};

// Evento para cambiar el color del QR
qrColorPicker.addEventListener('input', (e) => {
    qrOptions.color = e.target.value;
    updateQrPreview();
});

// Evento para cambiar la forma del QR
qrShapeSelector.addEventListener('change', (e) => {
    qrOptions.shape = e.target.value;
    updateQrPreview();
});

// Evento para subir un logo
qrLogoUploader.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        qrOptions.logo = event.target.result;
        updateQrPreview();
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Función para actualizar la previsualización del QR
function updateQrPreview() {
    // Simulación de generación de QR
    let qrImageUrl = generateQrUrl(qrOptions.text, qrOptions.color, qrOptions.shape, qrOptions.logo);
    qrPreview.src = qrImageUrl;
}

// Simulación de generación de URL QR (placeholder)
function generateQrUrl(text, color, shape, logo) {
    return 'https://via.placeholder.com/150.png?text=QR+Code';
}

// Evento para descargar el QR en JPG
downloadJpgButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = qrPreview.src;
    link.download = 'qr-code.jpg';
    link.click();
});

// Evento para descargar el QR en Vector (SVG/PNG)
downloadVectorButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = qrPreview.src;
    link.download = 'qr-code.svg';
    link.click();
});

// Evento para cambiar el contenido del QR
textAreas.forEach(textArea => {
    textArea.addEventListener('input', (e) => {
        qrOptions.text = e.target.value;
        updateQrPreview();
    });
});

// Previsualización inicial
updateQrPreview();