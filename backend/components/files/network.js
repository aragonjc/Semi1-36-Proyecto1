const express = require('express');
const controller = require('./controller');
const multer = require("multer");


const router = express.Router();

router.post('/upload',
            multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('file'),
            async (req,res)=>{

    controller.uploadPhoto(req,res)
                .then(response => res.status(200).send({url:response}))
                .catch(err => res.status(500).send({error:err}))
});


module.exports = router;
