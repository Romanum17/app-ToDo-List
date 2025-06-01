const express = require("express");
const morgan = require("morgan");
const {engine} = require('express-handlebars');
const path = require("path");

// inicializaciones
const app = express();

//configuraciones
app.set("port", process.env.PORT  || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars.js")
}));
app.set("view engine", ".hbs");

//FUNCIONES QUE SE EJECUTAN CUANDO SE PIDE UNA PETICION
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales
app.use((req, res, next)  =>{
    next();
});


//rutas 
app.use(require("./routes/index.js"));
app.use(require("./routes/authentication.js"));
app.use("/links", require("./routes/links.js"));

//archivos publicos
app.use(express.static(path.join(__dirname, "public")));

// iniciar servidor

app.listen(app.get("port"), () =>{
    console.log("Servidor en el puerto", app.get("port"));
});

