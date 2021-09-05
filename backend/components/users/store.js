const User = require('./model')

const addNewUser = async (username,email,password,photoUrl)=> {
    const user = await User.create({ nickname: username, email: email, password:password, photo:photoUrl });
    return user.id;
}

const loginUser = async (user)=> {
    
    const userSearch = await User.findOne({where: {nickname: user}});
    return userSearch
}

const loginEmail = async (email)=> {
    const userSearch = await User.findOne({where: {email: email}});
    return userSearch
}

module.exports = {addNewUser,loginEmail,loginUser};