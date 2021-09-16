const express = require('express');
const controller = require('./controller');
const multer = require("multer");
const validatetoken = require('../../util/validatetoken');
const { response } = require('express');


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
        .then(response=>res.status(200).send({error:'',url:response}))
        .catch(err=>res.status(500).send({error:err,body:''}))
})

router.post('/allprivate',validatetoken,(req,res) => {
    
    controller.getAllPrivateFiles(req.body.userId)
        .then(response => res.status(200).send({error:'', body:response}))
        .catch(err => res.status(500).send({error:err,body:''}))
});

router.post('/register',(req,res) => {
    
    controller.saveFile(req.body.nombre,req.body.url,req.body.fecha,req.body.extension,req.body.private,req.body.usuario,req.body.disable)
        .then(response => res.status(200).send({error:'',body:response}))
        .catch(err => res.status(500).send({error:err, body:''}));
});


module.exports = router;
