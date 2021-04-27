import { Db, MongoClient } from 'mongodb';

class Connection {
    static db: Db;
    static url: string
    static options: { bufferMaxEntries: number; reconnectTries: number; useNewUrlParser: boolean; useUnifiedTopology: boolean }

    static async open() {
        if (this.db) return this.db
        let client = new MongoClient('mongodb+srv://laboreus:laboreustest@clusternorthamerica.e8uyb.mongodb.net/test?authSource=admin&replicaSet=atlas-km483x-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true')
        await client.connect();
        console.log('Process: ', process.env.NODE_ENV)
        console.log('Process: ', process.env.NODE_ENV ? 'prod' : 'dev')
        this.db = client.db(process.env.NODE_ENV ? 'prod' : 'dev');
        return this.db
    }

}

export default Connection;
