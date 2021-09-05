const User = require('./model')

const addNewUser = async (username,email,password,photoUrl)=> {
    const user = await User.create({ nickname: username, email: email, password:password, photo:photoUrl });
    return user.id;
}

module.exports = {addNewUser};