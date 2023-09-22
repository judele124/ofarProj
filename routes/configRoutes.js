const indexR = require("./indax");
const userR = require("./user");
const toysR = require("./toys");

exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/users" , userR);
    app.use("/toys" , toysR);
}