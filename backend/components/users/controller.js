const store = require('./store')
const bcrypt = require('bcryptjs');
const chalk = require('chalk')
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

module.exports = {
    signup
};