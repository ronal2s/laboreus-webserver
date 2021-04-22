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
const const_1 = require("../utils/const");
const mongo_1 = require("../utils/mongo");
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream')
class UploadsController {
    static upload(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mongo_1.default.db.collection(const_1.default.COLLECTIONS.FILES);
            let storage = new GridFsStorage({
                url: uri,
                file: (req, file) => {
                    return new Promise((resolve, reject) => {
                        const fileInfo = {
                            filename: file.originalname,
                            bucketName: "imageUpload"
                        };
                        resolve(fileInfo);
                    });
                }
            });
            const upload = multer({ storage });
            return upload;
        });
    }
}
exports.default = UploadsController;
//# sourceMappingURL=uploads.controller.js.map