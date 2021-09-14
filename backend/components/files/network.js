const express = require('express');
const controller = require('./controller');
const multer = require("multer");
const validatetoken = require('../../util/validatetoken');
const e = require('express');


const router = express.Router();

router.post('/upload',
            multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('file'),
            async (req,res)=>{

    controller.uploadPhoto(req,res)
        .then(response => res.status(200).send({url:response}))
        .catch(err => res.status(500).send({error:err}))
});

router.post('/upload/file',validatetoken,
            multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('file'),
            async(req,res) => {
    
    controller.uploadFile(req,res)
        .then(response=>response.status(200).send({error:'',body:'Archivo subido correctamente'}))
        .catch(err=>res.status(500).send({error:e,body:''}))
})

router.post('/all',validatetoken,(req,res) => {
    res.send(req.user)
});


module.exports = router;
