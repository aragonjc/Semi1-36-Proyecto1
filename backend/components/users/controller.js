const store = require('./store')
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const isEmail = require('@stdlib/assert-is-email-address' );
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const signup =  (username,email,password,photourl) => {
    return new Promise( async (resolve,reject)=> {
        if(!username || !email || !password || !photourl ) {
            console.error(chalk.black.bgRed('[usersController] los datos enviados estan vacios'));
            reject('Los datos son incorrectos');
        }

        const existsUser = await store.exitsUser(username,email);
        if(existsUser) {
            reject('El usuario ya existe');
        } else {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            
            const userId = store.addNewUser(username,email,hashPassword,photourl);

            resolve({
                userId,
                username,
                email,
                photourl
            })
        }
    });
}

const signin = (userCredential, password) => {
    return new Promise(async (resolve,reject)=> {
        if(!userCredential || !password) {
            console.error(chalk.bgRed('[usersController] datos nulos'));
            reject('Los datos son incorrectos')
        }
        let response;
        let responseMsg;
        if(isEmail(userCredential)) {
            responseMsg = 'email';
            response = await store.loginEmail(userCredential);
        } else {
            responseMsg = 'usuario'
            response = await store.loginUser(userCredential);
        }

        if(!response) {
            reject(`${responseMsg} o contraseña incorrecta`);
        } else {
            const validPassword = await bcrypt.compare(password,response.dataValues.password);
            if(validPassword) {
                const usr = {
                    id:response.dataValues.id,
                    nickname:response.dataValues.nickname,
                    email:response.dataValues.email,
                    photo:response.dataValues.photo
                }
                const token = jwt.sign({_id:response.dataValues.id},config.jwt.tokenSecret)
                const res = {
                    usr:usr,
                    token:token
                }
                resolve(res)
            } else {
                reject(`${responseMsg} o contraseña incorrecta`);
            }
        }
    });
}

const checkPassword = (userId,password) => {
    return new Promise(async (resolve,reject) =>{
        if(!userId || !password) {
            console.error(chalk.bgRed('[usersController] datos nulos'));
            reject('Los datos son invalidos')
        }
    
        const user = await store.getUser(userId);
    
        if(!user) {
            reject('El usuario es incorrecto')
        } else {
            const validPassword = await bcrypt.compare(password,user.dataValues.password);
            if (validPassword)
                resolve(true);
            else
                resolve(false)
        }
    });
}

const getAllUsers = (userId) => {
    return new Promise(async (resolve,reject) =>{
        if(!userId) {
            console.error(chalk.bgRed('[usersController] datos nulos'));
            reject('Los datos son invalidos')
        }

        const users = await store.getUsers(userId);
        if(users) {
            const userList = users.filter(user=>{
                if(user.id != userId) {
                    return user;
                }
            })
            resolve(userList);
        } else {
            reject('No se pudo accesar a los usuarios')
        }
    });
}

const addFriend = (userId,friendId)=> {
    return new Promise(async (resolve,reject) => {
        if(!userId || !friendId) {
            console.error(chalk.bgRed('[usersController] datos nulos'));
            reject('Los datos son invalidos')
        }

        const result = await store.addFriend(userId,friendId);
        if(result) {
            resolve('Todo Ok')
        } else {
            reject('Error no se pudo añadir amigo');
        }
    });
}

const getFriends = (userId) => {
    return new Promise(async (resolve,reject) => {
        if(!userId) {
            console.error(chalk.bgRed('[usersController] datos nulos'));
            reject('Los datos son invalidos')
        }

        const friends = await store.getFriends(userId);
        if(friends) {
            resolve(friends);
        } else {
            reject('Error no se pudo obtener los amigos');
        }

    });
}

const getPhotoUrl = (userId) => {
    return new Promise(async (resolve,reject) => {
        if(!userId) {
            console.error(chalk.bgRed('[usersController] datos nulos'));
            reject('Los datos son invalidos')
        }

        const user = await store.getUser(userId);
        if(user) {
            resolve(user.dataValues.photo);
        } else {
            reject('Error no se pudo obtener la imagen');
        }
    });
}

module.exports = {
    signup,
    signin,
    checkPassword,
    getAllUsers,
    addFriend,
    getFriends,
    getPhotoUrl
};