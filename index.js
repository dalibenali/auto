'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require("request");
const Routes = require("./routes/players/index");
const PORT = process.env.PORT || 5000

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// route for players ressources
app.use("/players", Routes.PlayersRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});

// export express app for testing with mocha
module.exports = app;
