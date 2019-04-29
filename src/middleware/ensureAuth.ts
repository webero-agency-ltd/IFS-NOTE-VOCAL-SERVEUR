import { Request , Response , NextFunction }  from 'express' ; 
const site = require('../config/site') ;

//etre bien sur que l'utilisateur est bien connecté a l'application 
export default function ensureAuth( req : Request , res : Response , next : NextFunction ) {
	if ( req.isAuthenticated() ) {
		return next();
	}else{
		//si l'utilisateur n'est pas connecté, on le redirege vers la page login 
		//@todo: s'il y a des redirection, on ajoute dans la redirection apres l'authentification 
		//la précedent URL a la quelle on voulaiz y aller avant 
		let port = site.port ;
		let requested_url = req.protocol + '://' + req.host  + ( port == 80 || port == 443 ? '' : ':'+port ) + req.originalUrl;
		res.redirect('/login?redirect='+encodeURIComponent( requested_url )) ; 
	}
}
