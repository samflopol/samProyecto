import{ createPool}from "mysql2/promise"
const pool=createPool({
    host:'localhost',
    port:'3306',
    user:'prueba02',
    password:'prueba02',
    database:'prueba02'
});

export default pool;