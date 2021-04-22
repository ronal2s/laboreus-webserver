import { ObjectId } from 'bson';
import Connection from './utils/mongo';
import { Application } from 'express';
import NewsController from './controller/news.controller';

var cors = require('cors')
const port = process.env.PORT || 5000;
const express = require('express');
const app: Application = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

Connection.open();




// async function prueba() {
//     const recipes_collection = Connection.db.collection('recipes');
//     console.log('Dentro')
//     const cursor = await recipes_collection.find().sort({ name: 1 });
//     // console.log('Dentro2: ', cursor)
//     // await cursor.forEach(recipe => {
//     //     console.log('ID: ', recipe._id);
//     //     console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
//     // });

//     recipes_collection.findOne({ _id: new ObjectId('60466de152dcde429843b462') }).then((result) => {
//         // recipes_collection.findOne({ name: 'loco moco' },).then((result) => {
//         console.log('Result: ', result);
//     })
// }

// setTimeout(() => {
//     BarberController.prueba();
//     // prueba();
// }, 1000)

app.route('/news')
    .post((req, res) => {
        const news: NewsModel = req.body;
        news.createdDate = new Date().toISOString();
        NewsController.insert(news, (error, result) => {
            if (error) {
                res.json({ error: true, message: error })
            } else {
                res.json({ error: false, response: result.ops, message: 'Noticia creada' })
            }
        });
    })
    .put((req, res) => {
        const news: NewsModel = req.body;
        news.updatedDate = new Date().toISOString();
        // console.log(req.body)
        NewsController.update(news, (error, result) => {
            if (error) {
                res.json({ error: true, message: error })
            } else {
                res.json({ error: false, response: result.result.ok, message: 'Noticia actualizada' })
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