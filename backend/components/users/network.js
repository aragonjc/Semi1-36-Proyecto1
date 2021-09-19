const express = require('express');
const controller = require('./controller');
const validatetoken = require('../../util/validatetoken');

const router = express.Router();

router.post('/signup',(req,res)=>{
    controller.signup(req.body.nickname,req.body.email,req.body.password,req.body.photourl)
        .then(r =>res.status(200).send({error:'',body:'registrado correctamente'}))
        .catch(e =>res.status(500).send({error:'Error usuario no registrado',body:''}));
});

router.post('/signin',(req,res)=> {
    controller.signin(req.body.user,req.body.password)
        .then(response => res.status(200).send({error:'',body:response}))
        .catch(e=>res.status(500).send({error:e,body:''}));
})

router.post('/check',validatetoken,(req,res)=>{
    res.status(200).send(req.user);
})

router.post('/password',validatetoken,(req,res) => {
    controller.checkPassword(req.body.id,req.body.password)
        .then(response => res.status(200).send({error:'',body:response}))
        .catch(error=> res.status(500).send({error:error,body:''}));
});

router.post('/all',(req,res) => {
    controller.getAllUsers(req.body.id)
        .then(response => res.status(200).send({error:'',body:response}))
        .catch(error => res.status(500).send({error:error,body:''}));
});

router.post('/addfriend',(req,res) => {
    controller.addFriend(req.body.userId,req.body.friendId)
        .then(response => res.status(200).send({error:'',body:response}))
        .catch(error => res.status(500).send({error:error,body:''}));
});

router.post('/getfriends',(req,res) => {

    controller.getFriends(req.body.userId)
        .then(response => res.status(200).send({body:response}))
        .catch(error => res.status(500).send({error:error}));
});

router.post('/getpic',(req,res) => {

    controller.getPhotoUrl(req.body.userId)
        .then(response => res.status(200).send({url:response}))
        .catch(error=>res.status(500).send({error:error}));
});

module.exports = router;