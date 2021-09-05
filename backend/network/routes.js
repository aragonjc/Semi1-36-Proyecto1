const express = require('express')
const users = require('../components/users/network')

const router = express.Router();

router.route('/')
.get((req,res)=> {
    res.send("Hola Mundo");
})

router.use('/auth',users);

module.exports = router;