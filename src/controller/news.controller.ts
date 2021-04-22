import { ObjectId } from 'bson';
import { DeleteWriteOpResultObject, InsertOneWriteOpResult, MongoCallback, UpdateWriteOpResult } from 'mongodb';
import Connection from '../utils/mongo';
import CONSTANTS from '../utils/const';


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
            const collection = Connection.db.collection(CONSTANTS.COLLECTIONS.NEWS);
            collection.insertOne(item, callback)
        } catch (error) {
            console.error('Error News Insert: ', error)
        }
    }

    static async update(item: NewsModel, callback: MongoCallback<UpdateWriteOpResult>) {
        try {
            const collection = Connection.db.collection(CONSTANTS.COLLECTIONS.NEWS);
            const query = { _id: new ObjectId(item.id) }
            delete item.id;
            collection.updateOne(query, { $set: { ...item } }, callback);
        } catch (error) {
            console.error('Error News Update: ', error)
        }
    }

    static async delete(item: NewsModel, callback: MongoCallback<DeleteWriteOpResultObject>) {
        try {
            const collection = Connection.db.collection(CONSTANTS.COLLECTIONS.NEWS);
            const query = { _id: new ObjectId(item.id) }
            delete item.id;
            collection.deleteOne(query, callback);
        } catch (error) {
            console.error('Error News Delete: ', error)
        }
    }

    static async getAll() {
        try {
            const collection = Connection.db.collection(CONSTANTS.COLLECTIONS.NEWS);
            const data = await collection.find().toArray()
            // console.log(data)
            return data;

        } catch (error) {
            console.error('Error News Get: ', error)
        }
    }
}
export default NewsController;