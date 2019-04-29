import { Request , Response , NextFunction }  from 'express' ; 
const passport = require('passport') ; 

//etre bien sur que l'utilisateur est bien connecté a l'application 
export default function strategy( req : Request , res : Response , next : NextFunction ) {
	//si un utilisateur a un remember token lors de la connexion 
	if (req.method == "POST"){
		passport.authenticate('local', { failureRedirect: '/login',failureFlash: true } )(req, res, next);
	}else{
		next() ; 
	}
	/*if ( req.cookies.rememberToken ) {
		//passport.authenticate('token-local')(req, res, next);
	}else */
}
