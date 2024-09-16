const QRCode = require('qrcode');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const os = require('os');

// Crear interfaz para entrada de datos desde la terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Rutas predefinidas para guardar los archivos
const savePaths = {
  1: path.join(os.homedir(), 'Desktop'),
  2: path.join(os.homedir(), 'Downloads'),
  3: path.join(os.homedir(), 'Documents')
};

// Colores predefinidos
const colors = {
  1: '#000000', // Negro
  2: '#FFFFFF', // Blanco
  3: '#FF5733', // Naranja
  4: '#33FF57', // Verde
  5: '#3357FF', // Azul
  6: '#FFC300', // Amarillo
  7: '#C70039', // Rojo
  8: '#900C3F', // Púrpura
};

// Función para seleccionar un color de una lista
const selectColor = (callback) => {
  console.log("\nSelecciona un color:");
  console.log("1. Negro (#000000)");
  console.log("2. Blanco (#FFFFFF)");
  console.log("3. Naranja (#FF5733)");
  console.log("4. Verde (#33FF57)");
  console.log("5. Azul (#3357FF)");
  console.log("6. Amarillo (#FFC300)");
  console.log("7. Rojo (#C70039)");
  console.log("8. Púrpura (#900C3F)");

  rl.question("Opción: ", (option) => {
    const color = colors[option];
    if (color) {
      callback(color);
    } else {
      console.log("Opción no válida. Inténtalo de nuevo.");
      selectColor(callback);
    }
  });
};

// Función para generar el QR y guardarlo
const generateQRCode = async (data, filename, savePath, options) => {
  try {
    const filePath = path.join(savePath, filename);
    await QRCode.toFile(filePath, data, {
      color: {
        dark: options.dotsColor,  // Color de los "puntitos"
        light: options.bgColor    // Color del fondo
      },
      width: 600  // Aumenta la resolución
    });
    console.log(`✅ Código QR generado y guardado en ${filePath}`);
  } catch (err) {
    console.error("Error generando el código QR:", err);
  }
};

// Menú para seleccionar la ubicación de guardado
const selectSavePath = (callback) => {
  console.log("\nSelecciona la ubicación donde quieres guardar el archivo QR:");
  console.log("1. Escritorio");
  console.log("2. Descargas");
  console.log("3. Documentos");

  rl.question("Opción: ", (option) => {
    const savePath = savePaths[option];
    if (savePath) {
      callback(savePath);
    } else {
      console.log("Opción no válida. Inténtalo de nuevo.");
      selectSavePath(callback);
    }
  });
};

// Menú principal dinámico
const showMenu = () => {
  console.log("=== GENERADOR DE CÓDIGOS QR ===\n");
  console.log("Selecciona una opción:");
  console.log("1. Crear QR para Wi-Fi");
  console.log("2. Crear QR para texto o enlace");
  console.log("3. Crear QR para WhatsApp");
  console.log("4. Crear QR para contacto (VCARD)");
  console.log("5. Salir\n");

  rl.question("Opción: ", handleMenuSelection);
};

// Manejar la selección del menú
const handleMenuSelection = (option) => {
  switch (option) {
    case '1':
      generateWifiQR();
      break;

    case '2':
      rl.question("Introduce el texto o enlace para el código QR: ", (input) => {
        selectSavePath((savePath) => {
          console.log("\nSelecciona el color de los puntitos:");
          selectColor((dotsColor) => {
            console.log("\nSelecciona el color de fondo:");
            selectColor((bgColor) => {
              const options = { dotsColor: dotsColor, bgColor: bgColor };
              generateQRCode(input, 'qr-text.png', savePath, options);
              rl.close();
            });
          });
        });
      });
      break;

    case '3':
      generateWhatsAppQR();
      break;

    case '4':
      generateContactQR();
      break;

    case '5':
      console.log("Saliendo del programa...");
      rl.close();
      break;

    default:
      console.log("Opción no válida. Inténtalo de nuevo.\n");
      showMenu();
  }
};

const generateContactQR = () => {
  rl.question("Introduce el nombre del contacto (Nombre y Apellidos): ", (fullName) => {
    rl.question("Introduce el número de teléfono: ", (phone) => {
      rl.question("Introduce el correo electrónico: ", (email) => {
        rl.question("Introduce la empresa (opcional): ", (organization) => {
          rl.question("Introduce el sitio web (opcional): ", (website) => {
            // Separar nombre y apellidos (si hay más de una palabra, asumir que son apellidos)
            const nameParts = fullName.trim().split(' ');
            const firstName = nameParts[0]; // Primer nombre
            let lastName = '';

            if (nameParts.length > 1) {
              lastName = nameParts.slice(1).join(' '); // Asume que el resto son apellidos
            }

            // Creación del formato VCARD correcto
            const vCardData = `
BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${fullName}
TEL:${phone}
EMAIL:${email}
${organization ? `ORG:${organization}` : ''}
${website ? `URL:${website}` : ''}
END:VCARD
            `.trim();

            selectSavePath((savePath) => {
              console.log("\nSelecciona el color de los puntitos:");
              selectColor((dotsColor) => {
                console.log("\nSelecciona el color de fondo:");
                selectColor((bgColor) => {
                  const options = { dotsColor: dotsColor, bgColor: bgColor };
                  generateQRCode(vCardData, 'qr-contact.png', savePath, options);
                  rl.close();
                });
              });
            });
          });
        });
      });
    });
  });
};

// Iniciar el menú
showMenu();