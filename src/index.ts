import { ObjectId } from 'bson';
import Connection from './utils/mongo';
import { Application } from 'express';
import NewsController from './controller/news.controller';
import { Socket } from 'node:dgram';

var cors = require('cors')
const port = process.env.PORT || 5000;
const express = require('express');
const app: Application = express();

const server = require('http').Server(app);
const socketio: Socket = require('socket.io')(server);

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

Connection.open();

app.get('/', (req, res) => {
    res.send('Laboreus API')
})

app.post('/login', (req, res) => {
    const credentials: LoginModel = req.body;
    let response: GenericResponse;
    if (credentials.user == 'laboreus' && credentials.password == 'N7RytxrTfhDyvyTQCA5q5xKoJToKSYgdsJ_mHrv0') {
        response = { error: false, message: 'Credenciales correctas' }
    } else {
        response = { error: true, message: 'Usuario o clave incorrectos' }
    }
    res.send(response);
})

app.route('/news')
    .post((req, res) => {
        const news: NewsModel = req.body;
        news.createdDate = new Date().toISOString();
        let response: GenericResponse;
        NewsController.insert(news, (error, result) => {
            if (error) {
                response = { error: true, message: error.message }
                res.json(response)
            } else {
                response = { error: false, message: 'Noticia creada' }
                res.json(response)
            }
        });
    })
    .put((req, res) => {
        const news: NewsModel = req.body;
        news.updatedDate = new Date().toISOString();
        let response: GenericResponse;
        NewsController.update(news, (error, result) => {
            if (error) {
                response = { error: true, message: error.message }
                res.json(response)
            } else {
                response = { error: false, message: 'Noticia actualizada' }
                res.json(response)
            }
        })
    })
    .get(async (req, res) => {
        const data = await NewsController.getAll()
        data.forEach((item) => item.id = item._id)
        res.send({ error: false, data })
    })

// app.post('/upload', (req, res) => {
//     console.log(req.file)
//     res.json({ file: 'req.file' });
// })
app.listen(port, () => console.log(`Listening on port ${port}`))
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