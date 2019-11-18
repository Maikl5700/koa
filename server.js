const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./routes');
const err = require('./controllers/error')

const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(err)
app.use(router.routes())


app.listen(3000);