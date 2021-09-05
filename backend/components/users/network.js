const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.post('/signup',(req,res)=>{
    controller.signup(req.body.nickname,req.body.email,req.body.password,req.body.photourl)
        .then(r =>res.status(200).send({error:'',body:'registrado correctamente'}))
        .catch(e =>res.status(500).send({error:'Error usuario no registrado',body:''}))
});

module.exports = router;