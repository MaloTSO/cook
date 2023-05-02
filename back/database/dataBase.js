//Pour connecter MongoDB au serveur 

const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://'+process.env.DB_USER_PASS+'@touitteur.pdvapfp.mongodb.net/touitteur')
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.log("erreur de connexion à MongoDB", err));


    