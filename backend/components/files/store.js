const File = require('./model');

const addNewFile = async (nombre,url,fecha,extension,private,usuario,disable)=> {
    const file = await File.create({ nombre:nombre, url:url, fecha:fecha, extension:extension, private:private, usuario:usuario, disable:disable });
    return file.id;
}

const getFiles = async (userId) => {
    const files = await File.findAll({where:{usuario:userId,private:true,disable:false}});
    return files;
}

module.exports = {addNewFile,getFiles}