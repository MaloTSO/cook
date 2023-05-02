const routerStart = require('express').Router();
const usersController = require('../controllers/usersControll');
const uploadControll = require('../controllers/uploadControll');
const multer = require('multer');
const upload = multer();



//base
routerStart.post('/register', usersController.signUp);
routerStart.post('/login', usersController.signIn);
routerStart.get('/logout', usersController.logout);

//modification et affichage
routerStart.get('/', usersController.getAllUsers);
routerStart.get('/:id', usersController.userInfo);
routerStart.put('/:id', usersController.updateUser);
routerStart.delete('/:id', usersController.deleteUser);
routerStart.patch('/follow/:id', usersController.follow);
routerStart.patch('/unfollow/:id', usersController.unfollow);

//Upload
routerStart.post('/upload', upload.single('file') , uploadControll.uploadProfil)

module.exports = routerStart;