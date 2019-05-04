var local = 'fr';
//let lang : object = require('../resources/lang/'+local+'/sinup') ; 
module.exports = {
    email: {
        presence: true,
        length: {
            maximum: 255,
            minimum: 6,
            message: 'Erreur email'
        }
    },
    fullname: {
        presence: true,
        length: {
            maximum: 255,
            minimum: 6,
            message: 'Erreur fullname'
        }
    },
    password: {
        presence: true,
        length: {
            maximum: 26,
            minimum: 6,
            message: 'Erreur password'
        }
    },
    confpassword: {
        presence: true,
        length: {
            maximum: 26,
            minimum: 6,
            message: 'Erreur confpassword'
        }
    }
};
