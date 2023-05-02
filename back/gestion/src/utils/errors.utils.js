module.exports.signUpErrors= (err) => {
    let errors = {pseudo : '', email : '', password : ''}

    if(err.message.includes('pseudo'))
        errors.pseudo = 'Pseudo incorrect ou deja pris';

    if(err.message.includes('email'))
        errors.email = 'email incorrect';

    if(err.message.includes('password'))
        errors.password = 'le mot de passe doit faire 6 caracteres minimum';

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = 'Cet pseudo est deja pris';

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = 'Cet email est deja pris';
    
    return errors;
}

module.exports.signInErrors = (err) => {
    let errors = {email : '', password : ''};

    if(err.message.includes('email')) 
        errors.email = "email inconnu";

    if(err.message.includes('password'))
        errors.password = "mot de passe incorrect";

    return errors;

}


module.exports.uploadErrors = (err) => {
    let errors = {format: '', maxSize: ''};
    if(err.message.includes('invalid file'))
        errors.format = 'Format incompatible';

    if(err.message.includes('size'))
        errors.maxSize = 'Le fichier depasse 500ko';

    return errors;

}