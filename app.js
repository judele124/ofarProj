const express = require("express");
const path = require("path");
const http = require("http");


require("./db/mongoConnect");
const {routesInit} = require("./routes/configRoutes");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
routesInit(app);

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
server.listen(PORT);

