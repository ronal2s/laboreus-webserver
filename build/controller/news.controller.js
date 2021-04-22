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
const bson_1 = require("bson");
const mongo_1 = require("../utils/mongo");
const const_1 = require("../utils/const");
class NewsController {
    static prueba() {
        return __awaiter(this, void 0, void 0, function* () {
            const recipes_collection = mongo_1.default.db.collection('recipes');
            const cursor = yield recipes_collection.find().sort({ name: 1 });
            // console.log('Dentro2: ', cursor)
            // await cursor.forEach(recipe => {
            //     console.log('ID: ', recipe._id);
            //     console.log(`${recipe.name} has ${recipe.ingredients.length} ingredients and takes ${recipe.prepTimeInMinutes} minutes to make.`);
            // });
            recipes_collection.findOne({ _id: new bson_1.ObjectId('60466de152dcde429843b462') }).then((result) => {
                // recipes_collection.findOne({ name: 'loco moco' },).then((result) => {
                console.log('Result: ', result);
            });
        });
    }
    static insert(item, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = mongo_1.default.db.collection(const_1.default.COLLECTIONS.NEWS);
                collection.insertOne(item, callback);
            }
            catch (error) {
                console.error('Error News Insert: ', error);
            }
        });
    }
    static update(item, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = mongo_1.default.db.collection(const_1.default.COLLECTIONS.NEWS);
                const query = { _id: new bson_1.ObjectId(item.id) };
                delete item.id;
                collection.updateOne(query, { $set: Object.assign({}, item) }, callback);
            }
            catch (error) {
                console.error('Error News Update: ', error);
            }
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = mongo_1.default.db.collection(const_1.default.COLLECTIONS.NEWS);
                const data = yield collection.find().toArray();
                // console.log(data)
                return data;
            }
            catch (error) {
                console.error('Error News Get: ', error);
            }
        });
    }
}
exports.default = NewsController;
//# sourceMappingURL=news.controller.js.map