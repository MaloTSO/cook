const UserModel = require('../models/userModel.js');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const erreur = require('../utils/errors.utils.js')

const createToken = (id)=>{
    return jwt.sign({id}, process.env.TOKEN_SECRET,{
        expiresIn : 3*24*60*60*1000
    })
}

/*------------------------------------------------REGISTER,LOGIN,LOGOUT-------------------------------------------------------------*/

module.exports.signUp = async(req, res) =>{
    
    const {pseudo, email, password} = req.body

    try{
        //création du compte et du token 
            const user = await UserModel.create({pseudo, email, password});
            // const token = createToken(user._id);
            res.status(200).send(user._id);

            // res.status(201).json({ID: user._id});
    }
    catch(err){
            const errors = erreur.signUpErrors(err);
            res.status(400).send({errors});
    }
}

module.exports.signIn = async(req, res) =>{
    const{email,  password} = req.body

    try{
        const user = await UserModel.login(email, password);
        // const token = createToken(user._id)
        console.log('id : ' + user._id);

        // res.send(token, {httpOnly: true});
        
        res.status(200).send(user._id)
    }catch(err){
        const errors = erreur.signInErrors(err);
        res.status(400).send({errors}); 
    }

}

module.exports.logout = (req, res)=>{
    // res.redirect('/');
    return res.status(200).send({message : 'bien deconnecté'});
}

/*---------------------------------------------------GET-------------------------------------------------------------*/


module.exports.getAllUsers = async (req, res)=>{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);   
}

module.exports.userInfo = async (req, res)=>{ //plus de callBack, function (err, docs) ne marche pas
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)
    
    try {
        const userFound = await UserModel.findById(req.params.id).select('-password');
        res.send(userFound)
    } catch (err) {
        return res.status(500).send('Probleme : ' + req.params.id)
    }
};

/*---------------------------------------------------PUT-------------------------------------------------------------*/


module.exports.updateUser = async (req, res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)
    
    try{
        const upUser = await UserModel.updateOne(
            { _id: req.params.id },
        {
            $set: {
                bio: req.body.bio
            }
        },
        {
            new: true, upsert: true, setDefaultsOnInsert: true
        },
        )
        
        res.status(200).json({message : `${req.params.id} bien modifié`});
    }catch(err){
        return res.status(500).json({message : `${req.params.id} pas modifié ${err}`});
    }
}

/*-------------------------------------------------DELETE---------------------------------------------------------------*/


module.exports.deleteUser = async (req,res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)
    try{
        await UserModel.deleteOne({_id: req.params.id}).exec();
        res.status(200).json({message : `${req.params.id} bien supprimé`});
    }catch (err)
    {
        return res.status(500).json({message : `${req.params.id} pas supprimé ${err}`})
    }
}

/*----------------------------------------------PATCH------------------------------------------------------------------*/


module.exports.follow = async(req, res) =>{
    if(!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(400).send('ID inconnu : ' + req.params.id)
    
    try{

        
        //ajout à la liste des followings
        const upd1 = await UserModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {following : req.body.idToFollow}},
            {new : true, upsert : true},
        )
        console.log(req.params.id);
        if(upd1 == null){
            return res.status(400).json({message : `${req.params.id} pas modifié ${err}`})
        }

        //ajout à la liste des followers
        const upd2 = await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            {$addToSet: {followers : req.params.id}},
            {new : true, upsert : true},
        )


        if(upd2 == null){
            return res.status(400).json({message : `${req.params.id} pas modifié ${err}`})
        }
    
    }catch (err)
    {
        return res.status(500).json({message : `${req.params.id} pas modifié ${err}`})
    }

    return res.status(200).json({message : `${req.body.idToFollow} bien ajouté à la liste des following de ${req.params.id} et ${req.params.id} bien ajouté à la liste des followers de ${req.body.idToFollow}`});

}


module.exports.unfollow = async(req, res) =>{
    
    if(!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnFollow))
        return res.status(400).send('ID inconnu : ' + req.params.id)
    
    try{

        //suppression de la liste des followings
        const upd1 = await UserModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {following : req.body.idToUnFollow}},
            {new : true, upsert : true},
        )
        console.log(req.params.id);
        if(upd1 == null){
            return res.status(400).json({message : `${req.params.id} pas modifié ${err}`})
        }

        //suppression de la liste des followers
        const upd2 = await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            {$pull: {followers : req.params.id}},
            {new : true, upsert : true},
        )


        if(upd2 == null){
            return res.status(400).json({message : `${req.params.id} pas modifié ${err}`})
        }
    
    }catch (err)
    {
        return res.status(500).json({message : `${req.params.id} pas modifié ${err}`})
    }

    return res.status(200).json({message : `${req.body.idToUnFollow} bien suppriméo de la liste des followers de ${req.params.id} et ${req.params.id} bien supprimé de la liste des following de ${req.body.idToUnFollow}`});

}
