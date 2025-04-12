const express = require('express');
const printer = require('node-printer');

const app = express();
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

app.post('/print', (req, res) => {
    const text = req.body.text;

    if (!text) {
        return res.status(400).json({ message: 'No hay texto para imprimir.' });
    }

    const printerName = '10.50.10.252'; // Cambia esto por el nombre de tu impresora

    printer.printDirect({
        data: text,
        printer: printerName,
        type: 'RAW',
        success: function (jobID) {
            res.json({ message: 'Impresión enviada correctamente.' });
        },
        error: function (err) {
            res.status(500).json({ message: 'Error al enviar la impresión: ' + err });
        }
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});