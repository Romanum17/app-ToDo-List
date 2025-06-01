const express = require("express");
const router = express.Router();

const pool = require("../database.js");


router.get("/add", (req, res)=> {
    res.render("links/add.hbs");
})

router.post("/add", async (req, res)=>{
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    pool.query("INSERT INTO tareas set ?", [newLink]);
    
    res.send("Recibido");
});

module.exports = router;