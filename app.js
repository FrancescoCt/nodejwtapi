//Import env credentials
require('dotenv').config();

// app.js
const cookieParser = require('cookie-parser'); //Express doesn't handle cookies directly, it needs backup
const express = require('express');
const path = require("path");

//#region Define Routes
const routes = "./BL/routes"
//#region API
const productRoutes = require(`${routes}/apiRoutes/productRoutes`);
const customerRoutes = require(`${routes}/apiRoutes/customerRoutes`);
const orderRoutes = require(`${routes}/apiRoutes/orderRoutes`);
//#endregion API

//#region Pages
const pageRoutes = require(`${routes}/pageRoutes`);
//#endregion Pages

//#endregion Define Routes
const app = express();
const domainName = process.env.DOMAIN;
const port = process.env.PORT;

app.set("json spaces", 2);
//Setup cookies
app.use(cookieParser());
//Setup the new views for the view engine
app.use(express.static(path.join(__dirname, "UI")));
app.set("views", path.join(__dirname, "UI/views"));
app.set("view engine", "ejs");

app.use(express.json());


//#region Use Routes
//#region API
app.use('/api', productRoutes);
app.use('/api', customerRoutes);
app.use('/api', orderRoutes);
//#endregion API

//#region Pages
app.use('/', pageRoutes);
//#endregion Pages
//#endregion Use Routes

app.listen(port, () => {
    console.log(`Server running at ${domainName}:${port}/`);
});

module.exports = app;