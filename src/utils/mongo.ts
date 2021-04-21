import { Db, MongoClient } from 'mongodb';

class Connection {
    static db: Db;
    static url: string
    static options: { bufferMaxEntries: number; reconnectTries: number; useNewUrlParser: boolean; useUnifiedTopology: boolean }

    static async open() {
        if (this.db) return this.db
        let client = new MongoClient('mongodb+srv://laboreus:laboreustest@clusternorthamerica.e8uyb.mongodb.net/test?authSource=admin&replicaSet=atlas-km483x-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true')
        await client.connect();
        this.db = client.db('dev');
        return this.db
    }

}

export default Connection;
