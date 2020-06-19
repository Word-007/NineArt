const express = require('express');
// const cors = require("cors");
const regRouter = require('./routs/register.js');
const loginRouter = require('./routs/login.js');
const indexRouter = require('./routs/index.js');
const appRouter = require('./routs/app.js');
const appsRouter = require('./routs/apps.js');
const cartRouter = require('./routs/cart.js');
const orderRouter = require('./routs/order.js');
const bodyParser = require('body-parser');

let app = express();

app.listen(8080);

app.use(express.static('public'));

// app.use(cors({
//     //指定允许访问的地址列表
//     origin: ['http://127.0.0.1:8081',"http://localhost:8081"],
//     methods:["GET","POST"],
//     alloweHeaders:['Conten-Type','Authorization'],
//     //是否每次请求验证
//     credentials: true
// }));

app.use(bodyParser.urlencoded({
	extended:false
}));

app.use('/reg',regRouter)
app.use('/login',loginRouter)
app.use('/index',indexRouter)
app.use('/app',appRouter)
app.use('/apps',appsRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)