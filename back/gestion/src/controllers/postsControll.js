const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.readAllPosts = async (req, res) =>{
	const AllPost = await PostModel.find().sort({createdAt : -1});

	/**Affichage de tous les posts, utile pour la page d'accueil */
	if(AllPost == null){
		return res.status(400).send('Probleme');
	}

	return res.status(200).json(AllPost);
}

module.exports.readPost = async (req, res) =>{
	/** Verification que l'ID est valide */
	if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID post inconnu : ' + req.params.id)

	/**recherche par l'ID d'un post */
	try { 
		const postFound = await PostModel.findById(req.params.id);
		res.send(postFound)
	} catch (err) {
		return res.status(500).send('Probleme : ' + req.params.id)
	}
}

module.exports.getPostsByUserId = async(req, res) => {
	
	if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID utilisateur inconnu : ' + req.params.id)

	/**recupration de tous les posts d'un user, utile pour afficher sur sa page de profil */
	try{
		const postsFound = await PostModel.find({posterId : req.params.id})

		res.send(postsFound)
	}catch(err){
		return res.status(500).send('Probleme : ' + req.params.id)
	}
}


module.exports.createPost = async (req, res) =>{

	if(!ObjectID.isValid(req.body.posterId))
		return res.status(400).send('ID inconnu : ' + req.body.posterId);

	/**Création d'un nouveau post avec comme info obligatoires : l'ID du posteur et le texte */
	const newPost = new PostModel({
		posterId : req.body.posterId,
		text : req.body.text,
		likers : [],
		comment: [],
		picture: req?.body?.picture
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
	
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID inconnu : ' + req.params.id);


	/**modification du texte d'un post */
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

	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID inconnu : ' + req.params.id);


	/**suppression d'un post par son ID */
	try{
		await PostModel.findByIdAndDelete(req.params.id);

		return res.status(200).json({message : `${req.params.id} bien supprimé`});


	}catch(err){
		return res.status(500).json({message : `${req.params.id} pas supprimé ${err}`});
	}
		
}

module.exports.likePost = async (req, res) =>{
	
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID post inconnu : ' + req.params.id);
	if(!ObjectID.isValid(req.body.id))
		return res.status(400).send('ID User inconnu : ' + req.body.id);
	
	/**Permet d'ajouter un like sur un post */
	try{
		await PostModel.findByIdAndUpdate( /**on rajoute d'abord à la liste des likers du post */
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
		await UserModel.findByIdAndUpdate( /**Puis on rajoute ensuite à la liste des likes du user */
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
	
	if(!ObjectID.isValid(req.params.id))
		return res.status(400).send('ID post inconnu : ' + req.params.id);
	if(!ObjectID.isValid(req.body.id))
		return res.status(400).send('ID User inconnu : ' + req.body.id);
 

	/**Similaire à like post sauf qu'on utilise pull pour retirer à la liste des likers du post et à la liste des likes du user */
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
		/**Permet de poster un commentaire pour posterId au post req.params.id en y passant du texte dans le body */
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