const store = require('./store')
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const isEmail = require('@stdlib/assert-is-email-address' );
//**create a function to check if the user alredy exists */
const signup =  (username,email,password,photourl) => {
    return new Promise( async (resolve,reject)=> {
        if(!username || !email || !password || !photourl ) {
            console.error(chalk.black.bgRed('[usersController] los datos enviados estan vacios'));
            reject('Los datos son incorrectos');
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const userId = store.addNewUser(username,email,hashPassword,photourl);

        resolve({
            userId,
            username,
            email,
            photourl
        })

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
                resolve(usr)
            } else {
                reject(`${responseMsg} o contraseña incorrecta`);
            }
        }
    });
}

module.exports = {
    signup,
    signin
};