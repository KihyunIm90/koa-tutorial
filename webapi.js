const mydb = require('./db')

const getNowDateTimeString = () => {
    let today = new Date();
    today.setHours(today.getHours() + 9);
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let datetimeString = date + ' ' + time;

    return datetimeString;
}

exports.getUser = (id) => {
    let query = `select * from koa_tutorial where id=${id}`;
    console.log(query);
    if (id == undefined || id == null) {
        query = `select * from koa_tutorial`;
    }
    return mydb.pool.query(query)
        .then((rows) => {
            return rows;
        })
        .catch(err => {
            return err;
        })
}

exports.addUser = (name, age) => {
    let datetimeString = getNowDateTimeString();
    return mydb.pool.query(`insert into koa_tutorial (name, age, regdate) values('${name}', ${age}, '${datetimeString}')`)
        .then(() => {
            return null;
        })
        .catch(err => {
            return err;
        });
}

exports.updateUser = (id, name, age) => {
    let datetimeString = getNowDateTimeString();
    return mydb.pool.query(`update koa_tutorial set name='${name}', age=${age}, regdate='${datetimeString}' where id=${id}`)
        .then(() => {
            return null;
        }).catch(err => {
            return err;
        });
}

exports.deleteUser = (id) => {
    return mydb.pool.query(`delete from koa_tutorial where id=${id}`)
        .then(() => {
            return null;
        }).catch(err => {
            return err;
        });
}