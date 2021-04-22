"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./utils/mongo");
const news_controller_1 = require("./controller/news.controller");
var cors = require('cors');
const port = process.env.PORT || 5000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketio = require('socket.io')(server);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongo_1.default.open();
app.get('/', (req, res) => {
    res.send('Laboreus API');
});
app.post('/login', (req, res) => {
    const credentials = req.body;
    let response;
    if (credentials.user == 'laboreus' && credentials.password == 'N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0') {
        response = { error: false, message: 'Credenciales correctas' };
    }
    else {
        response = { error: true, message: 'Usuario o clave incorrectos' };
    }
    res.send(response);
});
app.route('/news')
    .post((req, res) => {
    const news = req.body;
    news.createdDate = new Date().toISOString();
    let response;
    news_controller_1.default.insert(news, (error, result) => {
        if (error) {
            response = { error: true, message: error.message };
            res.json(response);
        }
        else {
            response = { error: false, message: 'Noticia creada' };
            res.json(response);
        }
    });
})
    .put((req, res) => {
    const news = req.body;
    news.updatedDate = new Date().toISOString();
    let response;
    news_controller_1.default.update(news, (error, result) => {
        if (error) {
            response = { error: true, message: error.message };
            res.json(response);
        }
        else {
            response = { error: false, message: 'Noticia actualizada' };
            res.json(response);
        }
    });
})
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield news_controller_1.default.getAll();
    data.forEach((item) => item.id = item._id);
    res.send({ error: false, data });
}));
// app.post('/upload', (req, res) => {
//     console.log(req.file)
//     res.json({ file: 'req.file' });
// })
app.listen(port, () => console.log(`Listening on port ${port}`));
// //Sockets
// socketio.on("connection", (userSocket) => {
//     userSocket.on("send_message", (data) => {
//         userSocket.broadcast.emit("receive_message", data)
//     })
//     // socketio.emit('jjj', )
// })
// server.listen(8080, function () {
//     console.log('Sockets Server listening on port 8080');
// });
//# sourceMappingURL=index.js.map