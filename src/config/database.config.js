import {Sequelize} from 'sequelize';
import { log, logError } from "../utils/log.utils.js";

class Connection {
    db = null
    async connect(){
        if(!!this.db) return;
        try{
            this.db = new Sequelize("budget","root","",{
                host:"localhost",
                dialect:"mariadb"
            })
            await  this.db.authenticate()
            log(`authentification réussite`)
        }catch(error){
            logError(error.message)
        }
    }
    async sync(){
        await this.db.sync({force:true})
        console.log(`synchronisation réussi`)
    }
}
const connection = new Connection()
await connection.connect()

export default connection;