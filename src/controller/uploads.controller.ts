import CONSTANTS from '../utils/const';
import Connection from '../utils/mongo';
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream')


class UploadsController {
    static async upload(uri: string) {
        const collection = Connection.db.collection(CONSTANTS.COLLECTIONS.FILES)
        let storage = new GridFsStorage({
            url: uri,
            file: (req, file) => {
                return new Promise(
                    (resolve, reject) => {
                        const fileInfo = {
                            filename: file.originalname,
                            bucketName: "imageUpload"
                        }
                        resolve(fileInfo)

                    }
                )
            }
        })

        const upload = multer({ storage })
        return upload;
    }
}

export default UploadsController;