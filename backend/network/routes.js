const express = require('express');
const users = require('../components/users/network');
const photo = require('../components/files/network');

const router = express.Router();

router.route('/')
.get((req,res)=> {
    res.send("Hola Mundo");
})

router.use('/auth',users);
router.use('/photo',photo);

module.exports = router;