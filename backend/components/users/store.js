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

const exitsUser = async (nickname,email)=> {
    const checkUser = await User.findOne({where: {nickname:nickname}})
    const checkEmail = await User.findOne({where: {email:email}})
    
    if(!checkUser && !checkEmail){
        return false;
    }
    return true;
}

module.exports = {addNewUser,loginEmail,loginUser,exitsUser};