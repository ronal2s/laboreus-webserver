import { ObjectId } from 'bson';
import { InsertOneWriteOpResult, MongoCallback } from 'mongodb';
import Connection from '../utils/mongo';
const { COLLECTIONS } = require('../utils/const');

class NewsController {
    static async prueba() {
        const recipes_collection = Connection.db.collection('recipes');
        const cursor = await recipes_collection.find().sort({ name: 1 });
        // console.log('Dentro2: ', cursor)
        // await cursor.forEach(recipe => {
        //     console.log('ID: ', recipe._id);
        //     console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
        // });

        recipes_collection.findOne({ _id: new ObjectId('60466de152dcde429843b462') }).then((result) => {
            // recipes_collection.findOne({ name: 'loco moco' },).then((result) => {
            console.log('Result: ', result);
        })
    }

    static async insert(item: NewsModel, callback: MongoCallback<InsertOneWriteOpResult<any>>) {
        try {
            const collection = Connection.db.collection(COLLECTIONS.NEWS);
            collection.insertOne(item, callback)
        } catch (error) {
            console.error('Error News Insert: ', error)
        }
    }
}
export default NewsController;