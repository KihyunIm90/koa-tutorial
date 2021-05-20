const mariadb = require('mariadb');

exports.pool = mariadb.createPool({
    host: '192.168.14.6',
    user: 'adipy',
    password: 'hP2-ZKGplu',
    port: 3307,
    database: 'nodejs_test',
    connectionLimit: 5
});