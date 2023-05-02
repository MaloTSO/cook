const routerStart = require('express').Router();
const postController = require('../controllers/postsControll');

routerStart.get('/', postController.readAllPosts);
routerStart.get('/:id', postController.readPost);
routerStart.post('/', postController.createPost);
routerStart.put('/:id', postController.updatePost);
routerStart.delete('/:id', postController.deletePost);
routerStart.patch('/like/:id', postController.likePost);
routerStart.patch('/unlike/:id', postController.unlikePost);

//commentaires
routerStart.patch('/commentaire/:id', postController.postCom);
routerStart.patch('/edit/:id', postController.editCom);
routerStart.patch('/delcom/:id', postController.delCom);



module.exports = routerStart;