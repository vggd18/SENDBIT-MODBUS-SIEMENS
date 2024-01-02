const express = require('express');
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
const app = express();
const port = 3000;

// Adicione esta linha para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

client.connectTCP("192.168.100.2", { port: 502 })
    .then(setClient)
    .catch((e) => {
        console.log(e.message);
    });

function setClient() {
    client.setID(1);
}

app.get('/sendBit', (req, res) => {
    client.writeCoil(0, true)
        .then((response) => {
            console.log(response);
            res.send('Bit enviado!');
        })
        .catch((e) => {
            console.log(e.message);
            res.status(500).send(e.message);
        });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});