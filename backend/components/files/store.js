const File = require('./model');

const addNewFile = async (nombre,url,fecha,extension,private,usuario,disable)=> {
    const file = await File.create({ nombre:nombre, url:url, fecha:fecha, extension:extension, private:private, usuario:usuario, disable:disable });
    return file.id;
}

const getFiles = async (userId) => {
    const files = await File.findAll({where:{usuario:userId,private:true,disable:false}});
    return files;
}

const getFile = async (fileId) => {
    const file = await File.findOne({where:{id:fileId}});
    return file;
}

const updateFile = async (fileId,updateValues) => {
    const file = await File.update(updateValues,{where:{id:fileId}});
    return file;
}

module.exports = {addNewFile,getFiles,getFile,updateFile}