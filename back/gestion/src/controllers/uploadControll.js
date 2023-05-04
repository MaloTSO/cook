const UserModel = require('../models/userModel');
const fs = require('fs');
const {promisify} = require('util');
const { uploadErrors } = require('../utils/errors.utils');
const pipeline = promisify(require('stream').pipeline);
const { Readable } = require('stream');

module.exports.uploadProfil = async (req, res) =>{
    try{
        // if( 
        //     req.file.detectedMimeType !== "image/png" && 
        //     req.file.detectedMimeType !=="image/jpeg")
        // {
        //     throw Error("invalid file");
        // }

        if(req.file.size > 1000000){
            throw Error("max size");
        }
       
    }catch(err){
        const errors = uploadErrors(err)
        return res.status(201).json({errors});
    }

    const fileName = req.body.name + ".jpg";

    const imageStream = Readable.from(req.file.buffer) //transformation du buffer en stream pour pipeline

    // require('../../../../front/public/')

    await pipeline(
        imageStream,
        fs.createWriteStream(
            `${__dirname}/../../../client/public/upload/profil/${fileName}`
        ),
    )
    return res.status(200).send('image DL')
}