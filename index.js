const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const send = require('koa-send');
const ejs = require('koa-ejs')
const path = require('path');
const serve = require('koa-static')
const webapi = require('./webapi');

const app = new Koa();
const router = new Router();

const buildDirectory = path.resolve(__dirname, './views');
app.use(serve(buildDirectory));
app.use(koaBody());
app.use(koaLogger());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

ejs(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'ejs',
    layout: false,
    debug: true
})

router.get('/', async (ctx) => {
    await ctx.render('index', { root: buildDirectory });
});


router.get('/select', async (ctx) => {
    let id = ctx.query.id;
    const rows = await webapi.getUser(id);
    if (rows == null) {
        ctx.body = "NO RESULT";
    }
    else {
        ctx.body = rows;
    }
});

router.post('/insert', (ctx) => {
    const { name, age } = ctx.request.body;
    return webapi.addUser(name, age)
        .then((err) => {
            console.log(err);
            if (err == null) {
                ctx.body = "Completed";
            }
            else {
                ctx.body = err;
            }
        });
});

router.put('/update', (ctx) => {
    const { id, name, age } = ctx.request.body;
    return webapi.updateUser(id, name, age)
        .then((err) => {
            if (err == null) {
                ctx.body = "Completed";
            }
            else {
                ctx.body = err;
            }
        });
});

router.delete('/delete', (ctx) => {
    let id = ctx.query.id;
    return webapi.deleteUser(id)
        .then((err) => {
            if (err == null) {
                ctx.body = "Completed";
            }
            else {
                ctx.body = err;
            }
        });
});