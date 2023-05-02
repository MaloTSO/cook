const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.readAllPosts = async (req, res) =>{
	const AllPost = await PostModel.find().sort({createdAt : -1});

	if(AllPost == null){
		return res.status(400).send('Probleme');
	}

	return res.status(200).json(AllPost);
}

module.exports.readPost = async (req, res) =>{
	if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID post inconnu : ' + req.params.id)

	try {
		const userFound = await PostModel.findById(req.params.id);
		res.send(userFound)
	} catch (err) {
		return res.status(500).send('Probleme : ' + req.params.id)
	}
}


module.exports.createPost = async (req, res) =>{

	if(!ObjectID.isValid(req.body.posterId))
		return res.status(400).send('ID inconnu : ' + req.body.posterId);

	const newPost = new PostModel({
		posterId : req.body.posterId,
		text : req.body.text,
		likers : [],
		comment: [],
	});

	try{
		const post = await newPost.save();
		console.log(post);
		return res.status(201).json({post});
	}catch(err){
		return res.status(400).send(err);
	}
}

module.exports.updatePost = async (req, res) =>{
	/** Verification de l'existence de l'ID */
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID inconnu : ' + req.params.id);

	const updatetexte = {
		text : req.body.text,
	}
	console.log(updatetexte);
	if(!ObjectID.isValid(updatetexte)){
		return res.status(500).json({message : `Il faut entrer un champs texte `});
	}
	try
	{
		const upPost = await PostModel.findByIdAndUpdate(
		req.params.id,
		{$set : updatetexte},
		{new : true})

		console.log(upPost);
		return res.status(200).json({message : `${req.params.id} bien modifié`});

	}catch(err){
		return res.status(500).json({message : `${req.params.id} pas modifié ${err}`});
	}

}

module.exports.deletePost = async (req, res) =>{
	/** Verification de l'existence de l'ID */
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID inconnu : ' + req.params.id);

	try{
		await PostModel.findByIdAndDelete(req.params.id);

		return res.status(200).json({message : `${req.params.id} bien supprimé`});


	}catch(err){
		return res.status(500).json({message : `${req.params.id} pas supprimé ${err}`});
	}
		
}

module.exports.likePost = async (req, res) =>{
	/** Verification de l'existence de l'ID */
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID post inconnu : ' + req.params.id);
	if(!ObjectID.isValid(req.body.id))
		return res.status(400).send('ID User inconnu : ' + req.body.id);
	
		
	try{
		await PostModel.findByIdAndUpdate(
			req.params.id,
			{
				$addToSet: {likers : req.body.id }
			},
			{new : true}
		);
		console.log(`${req.body.id} ajouté aux likers du post ${req.params.id}`);
	}catch(err){
		return res.status(500).json({message : `${req.body.id} pas ajouté aux likers du post ${req.params.id} ${err}`});
	}
	try
	{
		await UserModel.findByIdAndUpdate(
			req.body.id,
			{
				$addToSet: {likes : req.params.id}
			},
			{new : true}
		);
		console.log(`${req.params.id} ajouté à la liste de likes de ${req.body.id}`);
	}catch(err){
		return res.status(500).json({message : `${req.params.id} pas ajouté à la liste de likes de ${req.body.id}  ${err}`});
	}

	return res.status(200).json({message : `${req.body.id} a bien liké le post ${req.params.id}`});

}

module.exports.unlikePost = async (req, res) =>{
	/** Verification de l'existence de l'ID */
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID post inconnu : ' + req.params.id);
	if(!ObjectID.isValid(req.body.id))
		return res.status(400).send('ID User inconnu : ' + req.body.id);

	try{
		await PostModel.findByIdAndUpdate(
			req.params.id,
			{
				$pull: {likers : req.body.id }
			},
			{new : true}
		);
		console.log(`${req.body.id} supprimé des likers du post ${req.params.id}`);
	}catch(err){
		return res.status(500).json({message : `${req.body.id} pas supprimé des likers du post ${req.params.id} ${err}`});
	}
	try
	{
		await UserModel.findByIdAndUpdate(
			req.body.id,
			{
				$pull: {likes : req.params.id}
			},
			{new : true}
		);
		console.log(`${req.params.id} supprimé à la liste de likes de ${req.body.id}`);
	}catch(err){
		return res.status(500).json({message : `${req.params.id} pas supprimé de la liste de likes de ${req.body.id}  ${err}`});
	}

	return res.status(200).json({message : `${req.body.id} a bien unlike le post ${req.params.id}`});

}

module.exports.postCom = async (req,res) =>{
	/** Verification de l'existence des parametres */
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID Post inconnu : ' + req.params.id);
	if(!ObjectID.isValid(req.body.posterId))
		return res.status(400).send('ID User inconnu : ' + req.body.posterId);

	try{
		const newCom = await PostModel.findByIdAndUpdate(
			req.params.id,
			{
				$push:{
					comment: {
						posterId: req.body.posterId,
						text : req.body.text,
						date : Date.now(),
					}
				}
				
			},
			{new: true}
		)
		return res.status(200).json({message : `nouveau commentaire de ${req.body.posterId} sous le post ${req.params.id}`});

	}catch(err){
		return res.status(500).json({message : `ERREUR commentaire pas ajouté`});
	}
};

module.exports.editCom = async (req,res) =>{
	/** Verification de l'existence des parametres */
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID Post inconnu : ' + req.params.id);
	if(!ObjectID.isValid(req.body.ComID))
		return res.status(400).send('ID Commentaire inconnu : ' + req.body.ComID);

	try{
		const post = await PostModel.findById(req.params.id) //recuperation du post
		const theCom = await post.comment.find((comment) => //recuperation du commentaire dans le post
			(comment._id.equals(req.body.ComID))
		)

		if(!theCom){
			return res.status(404).send(`Commentaire ${req.body.ComID} vide, ERREUR`)
		}

		theCom.text = req.body.text //modification du texte dans le commentaire

		const sa = post.save()
		if(sa){
			return res.status(200).send(post);
		}
		
		return res.status(401).json({message : `Le com n'a pas été sauvegardé`});

	}catch(err){
		return res.status(500).json({message : `Commentaire pas trouvé ${err}`});
	}
}

module.exports.delCom = async(req,res) =>{
	/** Verification de l'existence des parametres */
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID Post inconnu : ' + req.params.id);
	if(!ObjectID.isValid(req.body.ComID))
		return res.status(400).send('ID commentaire inconnu : ' + req.body.ComID);
	
	try{
		const resultat = await PostModel.findByIdAndUpdate( //Recherche du post
			req.params.id,
			{
				$pull: { //Suppression du commentaire
					comment: {
						_id: req.body.ComID,
					}
				}
			},
			{new: true},
		)


		return res.status(200).json({message : `Commentaire ${req.body.ComID} bien supprimé`});

	}
	catch(err){
		return res.status(500).json({message : `Probleme pour la suppression du post ${err}`});
	}
}