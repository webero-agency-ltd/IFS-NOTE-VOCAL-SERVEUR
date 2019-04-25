import { Request , Response , NextFunction }  from 'express' ; 

//etre bien sur que l'utilisateur est bien connecté a l'application 
export default function ensureAuth( req : Request , res : Response , next : NextFunction ) {
	if ( req.isAuthenticated() ) {
		return next();
	}else{
		//si l'utilisateur n'est pas connecté, on le redirege vers la page login 
		res.redirect('/login')
	}
}
