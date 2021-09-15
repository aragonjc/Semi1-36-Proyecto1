const store = require('./store');
const aws = require('aws-sdk')
const fs = require('fs')
const chalk = require('chalk')
const config = require('../../config/config')

const uploadPhoto = (req,res) => {
    return new Promise((resolve,reject) => {

        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: config.aws.accessKeyId,
            secretAccessKey: config.aws.secretAccessKey,
            region: config.aws.region
        });
        
        const s3 = new aws.S3();
        let params = {
            ACL: 'public-read',
            Bucket: config.aws.bucket,
            Body: fs.createReadStream(req.file.path),
            ContentType: req.file.mimetype,
            Key: `userImg/${req.file.originalname}`
        };

        s3.upload(params, (err, data) => {
            
            if (err) {
                console.error(chalk.bgRed('[FileControllerAWS] Error al tratar de subir el archvio a S3', err));
                reject('No fue posible cargar la foto')
            }

            if (data) {
                fs.unlinkSync(req.file.path);
                resolve(data.Location)
            }
        });
        
    })
    
}

const uploadFile = (req,res) => {
    return new Promise((resolve,reject) => {

        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: config.aws.accessKeyId,
            secretAccessKey: config.aws.secretAccessKey,
            region: config.aws.region
        });
        
        const s3 = new aws.S3();
        let params = {
            ACL: 'public-read',
            Bucket: config.aws.bucket,
            Body: fs.createReadStream(req.file.path),
            ContentType: req.file.mimetype,
            Key: `userFiles/${req.file.originalname}`
        };

        s3.upload(params, (err, data) => {
            
            if (err) {
                console.error(chalk.bgRed('[FileControllerAWS] Error al tratar de subir el archvio a S3', err));
                reject('No fue posible cargar la foto')
            }

            if (data) {
                console.error(chalk.bgBlue('[FileControllerAWS] Archivo subido correctamente', err));
                
                fs.unlinkSync(req.file.path);
                resolve(data.Location)
            }
        });
        
    })
}

const saveFile = (nombre,url,fecha,extension,private,usuario,disable) => {
    return new Promise(async (resolve,reject) => {
        
        if(!nombre || !url || !fecha || !extension || private === undefined || !usuario || disable === undefined) {
            console.error(chalk.bgRed('[FileController] datos nulos'));
            return reject('Los datos son incorrectos')
        }

        const result = await store.addNewFile(nombre,url,fecha,extension,private,usuario,disable);
        
        if(result) {
            resolve('El archivo se subio correctamente')
        } else {
            reject('Error al subir el archivo')
        }

    });
}

module.exports = {
    uploadPhoto,
    uploadFile,
    saveFile
}