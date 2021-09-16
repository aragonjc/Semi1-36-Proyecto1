const User = require('./model')
const Friend = require('./model_friend')

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

const getUser = async (id) => {
    const user = await User.findOne({where:{id:id}});
    return user;
}

const getUsers = async () => {
    const users = await User.findAll({attributes: {exclude: ['password','photo']}});
    return users
}

const addFriend = async (userId,friendId) => {
    const addedFriend = await Friend.create({usuario:userId,amigo:friendId});
    return addedFriend;
}

module.exports = {addNewUser,loginEmail,loginUser,exitsUser,getUser,getUsers,addFriend};