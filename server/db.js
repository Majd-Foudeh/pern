const {Pool} =require('pg')

const pool = new Pool ({
    user:"postgres",
    password: "2912maJD2001",
    host: "localhost",
    port: 5432,
    database:"perntodo"

})

module.exports=pool

