import Connection from './utils/mongo';
import { Application } from 'express';
import NewsController from './controller/news.controller';
import CONSTANTS from './utils/const';
import { getNewsPlatform } from './utils/helpers';

var cors = require('cors')
const port = process.env.PORT || 5000;
const express = require('express');
const app: Application = express();


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
        news.platform = getNewsPlatform(news);
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
    .delete((req, res) => {
        const news: NewsModel = req.body;
        news.updatedDate = new Date().toISOString();
        let response: GenericResponse;
        NewsController.delete(news, (error, result) => {
            if (error) {
                response = { error: true, message: error.message }
                res.json(response)
            } else {
                response = { error: false, message: 'Noticia eliminada' }
                res.json(response)
            }
        })
    })
    .get(async (req, res) => {
        const data = await NewsController.getAll()
        data.forEach((item) => item.id = item._id)
        res.send({ error: false, data })
    })

app.get('/news/page', async (req, res) => {
    const page: { start: number, end: number } = req.query as any
    const data = await NewsController.getAll()
    let dataPagination: NewsModel[] = [];
    if (page.end <= data.length) {
        for (let i = page.start; i < page.end; i++) {
            const element = data[i];
            if (element) {
                element.id = element._id
                dataPagination.push(element);
            }
        }
    }
    res.send({ error: false, length: dataPagination.length, data: dataPagination })
})

// app.get('/test', async (req, res) => {
//     const data = await NewsController.getAll()
//     let test = [];
//     data.forEach((item: NewsModel) => {
//         //@ts-ignore
//         item.id = item._id;
//         item.platform = getNewsPlatform(item)
//         // if (item.picture) {
//         //     if (!item.picture.includes('jpeg') || !item.picture.includes('jpg')) {
//         //         test.push(item);

//         //     }
//         // }
//         NewsController.update(item, (error, result) => {
//             if (error) {
//                 console.error(error);
//             } else {
//                 console.log('Actualizado')
//             }
//         })
//     })

//     res.send(data)

// })


app.listen(port, () => console.log(`Listening on port ${port}`))
