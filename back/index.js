//lancement du serveur sur un port

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./gestion/src/routes/usersRoutes.js');
const postRoutes = require('./gestion/src/routes/postsRoutes.js');
const cookieParser = require('cookie-parser');
require('dotenv').config({path:'./database/.env'});
require('./database/dataBase');
const {checkUser, requireAuth} = require('./gestion/src/middleware/auth.middleware.js');

const cors = require('cors');

const app = express();


app.use(cors());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res)=>{
  res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Serveur actif sur le port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  console.log('OK DANS LE BACK')
  res.send('RESEND DANS LE FRONT')
})

