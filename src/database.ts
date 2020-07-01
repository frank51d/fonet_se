import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.then(function(p){
    return p.getConnection();
}).then(function(){
    console.log('DB is Connected');
});

export default pool;
