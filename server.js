'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;
const {homePage, datas } = require('./handlers');

//////bringing in customers and stock///

const {stock, customers} = require('./data/promo');

////////
///checking if order is in stock
///////
const checkOrderItemsOutOfStock = (checkOrder) => {
    let noStock = false;
    if (((checkOrder.order === "socks") && stock.socks <= 0) ||
        (checkOrder.order === "bottle" && stock.bottles <= 0) ||
        ((checkOrder.size === "small") && stock.shirt.small <= 0) ||
        ((checkOrder.size === "medium") && stock.shirt.medium <= 0) ||
        ((checkOrder.size === "large") && stock.shirt.large <= 0) ||
        ((checkOrder.size === "xlarge") && stock.shirt.xlarge <= 0)) {
        noStock = true;
    }
    return noStock
}


/////////
//client, country and clothes, etc error
/////
const handleBruh = (req, res) => {
    let checkOrder = {}
    checkOrder = req.body;
    console.log(checkOrder, "do we go through here?");

    if ('canada' !== checkOrder.country.toLowerCase()) {
        res.send({
            status : 'error',
            error: '650'
        });
    } else if (checkOrderItemsOutOfStock(checkOrder)) {
        res.send({
            status: 'error',
            error: '450'
        });
    } else {
        customers.forEach(client => {
            if ((client.givenName  === checkOrder.givenName && client.surname === checkOrder.surname) || client.address === checkOrder.address){
                res.send({
                    status: 'error',
                    error: '550'
                });
                
            }
        })
        res.send({
            status: 'success'
        })
    }
    return checkOrder
}

/////////////////////////
//////rendering the order Page
/////////////

const orderPage = (req, res) => {
    let order = req.params.data;
    console.log(order, "heheheheehehhehe")
}


express()
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('tiny'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    .set('view engine', 'ejs')

    // endpoints
    .post('/data', datas)
    // .get('/todos', todo)
    .get("/", homePage)

    //EXERCISE 2 ///

    //.get("/order-form", handleSubmit)
    .post("/order", handleBruh)
    .get("/order-confirmation", orderPage)
    .get('*', (req, res) => res.send('Dang. 404.'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));