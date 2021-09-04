const express = require('express')

const router = express.Router();

router.route('/')
.get((req,res)=> {
    res.send("Hola Mundo");
})

module.exports = router;