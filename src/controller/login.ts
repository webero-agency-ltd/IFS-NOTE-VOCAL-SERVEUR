import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import * as bcrypt from 'bcrypt' ;
const passport = require('passport') ; 
const LocalStrategy = require('passport-local').Strategy; 

//afficher la page login
export function page( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { redirect } = req.query ; 
	if ( ! redirect ) {
		redirect = '' ; 
	}
	res.render( 'login.ejs' ,{ redirect : encodeURIComponent( redirect ) }) 
}

//création de nouvelle utilisateur 
export function create( req:Request, res:Response ) {
	let { User } = this.db as DBInterface ;
	//ici on veut se souvenire de l'utilisateur lors de la prochaine connexion  
	let token=Math.random().toString();
    token=token.substring(2,token.length);
    //mise a jours de l'utilisateur et enregistrement du remember token dans ca table de base de donner 
    //ce remember token est utilises dans l'extenssion chrome pour faire l'authentification entre 
    //un utilisateur et le serveur de vocal note 
    let { redirect } = req.query ;  
    User.find({ where: { id: req.user.id } })
    	.then(u => {
    		if (u) {
		      	return u.update({
		        	rememberToken: token
		      	})
		      	.then(t => {  
		      		res.cookie('me_identity', token ) //, { expires : new Date(new Date().getTime()+2073816000) }
		      		res.cookie('remember_me', token ) //, { expires : new Date(new Date().getTime()+2073816000) }
		      		if ( redirect ) {
		      			res.redirect( decodeURIComponent(redirect) ) 
		      		}else{
		      			res.redirect('/') 
		      		}
				})
				.catch( e => res.redirect('/') );
		    }
		})
		.catch( e => res.redirect('/') );
}