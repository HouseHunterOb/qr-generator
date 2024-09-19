const ssidInput = document.getElementById('ssid');
const passwordInput = document.getElementById('password');
const securitySelect = document.getElementById('security');
const qrPreview = document.getElementById('qr-preview');
const qrColorPicker = document.getElementById('qr-color');
const qrShapeSelector = document.getElementById('qr-shape');
const downloadJpgButton = document.getElementById('download-jpg');
const downloadPngButton = document.getElementById('download-png');
const downloadSvgButton = document.getElementById('download-svg');

// Función para generar el QR de Wi-Fi
function generateQrCode() {
    const ssid = ssidInput.value;
    const password = passwordInput.value;
    const security = securitySelect.value;
    const color = qrColorPicker.value;
    const shape = qrShapeSelector.value;

    // Usar una API de QR (por ejemplo: https://goqr.me/api/doc/)
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=WIFI:S:${ssid};T:${security};P:${password};;&size=200x200&color=${color.replace('#', '')}&shape=${shape}`;

    qrPreview.src = qrImageUrl;
}

// Escucha los cambios en los campos del formulario
ssidInput.addEventListener('input', generateQrCode);
passwordInput.addEventListener('input', generateQrCode);
securitySelect.addEventListener('change', generateQrCode);
qrColorPicker.addEventListener('input', generateQrCode);
qrShapeSelector.addEventListener('change', generateQrCode);

// Funciones de descarga (ejemplo simple, puedes usar canvas para más opciones)
downloadJpgButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = qrPreview.src;
    link.download = 'wifi-qr-code.jpg';
    link.click();
});

downloadPngButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = qrPreview.src;
    link.download = 'wifi-qr-code.png';
    link.click();
});

downloadSvgButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = qrPreview.src;
    link.download = 'wifi-qr-code.svg';
    link.click();
});

// Generar QR inicialmente
generateQrCode();