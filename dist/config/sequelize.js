module.exports = {
    username: "root",
    database: "vocal-note",
    password: '',
    params: {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};
