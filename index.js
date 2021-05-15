const Koa = require('koa');
const Router = require('koa-router');
const mariadb = require('mariadb');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

const pool = mariadb.createPool({
    host: '192.168.14.6',
    user: 'adipy',
    password: 'hP2-ZKGplu',
    port: 3307,
    database: 'nodejs_test',
    connectionLimit: 5
});

let result;

async function getUser(id) {
    await pool.getConnection().then(conn => {
        console.log('Connected');
        return conn.query(`select * from koa_tutorial where id=${id}`).then((rows) => {
            console.log(rows[0]);
            conn.release();
            result = rows[0];
        }).finally(() => {
            conn.release();
        })
    }).catch(err => {
        console.log('Not Connected');
        console.log(err);
    })
}

async function addUser(name, age) {
    await pool.getConnection().then(conn => {
        let datetimeString = getNowDateTimeString();
        return conn.query(`insert into koa_tutorial (name, age, regdate) values('${name}', ${age}, '${datetimeString}')`).then(() => {
            console.log('completed');
        });
    }).catch(err => {
        console.log('Not Connected');
    });
}

async function updateUser(id, name, age) {
    await pool.getConnection().then(conn => {
        let datetimeString = getNowDateTimeString();
        return conn.query(`update koa_tutorial set name='${name}', age=${age}, regdate='${datetimeString}' where id=${id}`).then(() => {
            console.log('completed');
        });
    }).catch(err => {
        console.log('Not Connected');
    });
}

async function deleteUser(id) {
    await pool.getConnection().then(conn => {
        let datetimeString = getNowDateTimeString();
        return conn.query(`delete from koa_tutorial where id=${id}`).then(() => {
            console.log('completed');
        });
    }).catch(err => {
        console.log('Not Connected');
    });
}

function getNowDateTimeString() {
    let today = new Date();
    today.setHours(today.getHours() + 9);
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let datetimeString = date + ' ' + time;

    return datetimeString;
}

router.get('/', async function (ctx, next) {
    let id = ctx.query.id;
    await getUser(id);
    ctx.body = result;
});

router.post('/', async function (ctx, next) {
    const { name, age } = ctx.request.body;
    await addUser(name, age);
});

router.put('/', async function (ctx, next) {
    const { id, name, age } = ctx.request.body;
    await updateUser(id, name, age);
});

router.delete('/', async function (ctx, next) {
    let id = ctx.query.id;
    await deleteUser(id);
});