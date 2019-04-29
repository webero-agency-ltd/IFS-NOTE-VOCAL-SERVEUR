import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import hash from '../libs/hash' ;
const validator = require( '../request/' );

//afficher la page signup
export function page( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { redirect } = req.query ; 
	if ( ! redirect ) {
		redirect = '' ; 
	}
	res.render( 'signup.ejs' ,{ redirect : encodeURIComponent( redirect ) } ) 
}

//création de nouvelle utilisateur 
export function create( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { email , fullname , password , confpassword } = req.body ; 
	let { User } = this.db as DBInterface ;
	//validation de formulaire 
	let is = validator( { email , fullname , password , confpassword } , 'sinup' ) ; 
	let { redirect } = req.query ;

	if ( is !== true ) {
		//retour a la page précedement avec l'erreur 
		req.flash('errors' , is ) ; 
		if ( redirect ) {
			res.redirect('signup?redirect='+encodeURIComponent(redirect) ) 
		}else{
			res.redirect('signup')
		}
	}
	//ici on fait la vérification que le password entré est bien confirmé 
	if ( password !== confpassword ) {
		req.flash('errors' , { confpassword : lang['signupEmailConfpassword2'] } ) ; 
		if ( redirect ) {
			res.redirect('signup?redirect='+encodeURIComponent(redirect) ) 
		}else{
			res.redirect('signup')
		}
	}
	//on vérifie si l'utilisateur n'est pas encore enregistré
	User.find({
	    where: { email }
	})
	.then( async u => {
	  	if (u) {
	  		//si utilisateur existe, alors on indique une erreur a l'email
	  		req.flash('errors' , { email : lang['signupEmailReady'] } ) ; 
			if ( redirect ) {
				return res.redirect('signup?redirect='+encodeURIComponent(redirect) ) 
			}else{
				return res.redirect('signup')
			}
	  	}
	  	//si utilisateur n'existe pas alors on le crée 
	  	let role = 'user' ;
	  	User.create( {fullname,email,password : await hash( password as string ) ,role} )
		  	.then( u => {
		  		req.flash('success' , { global : lang['signupSuccess']  } ) ; 
		  		if ( redirect ) {
					res.redirect('login?redirect='+encodeURIComponent(redirect) ) 
				}else{
					res.redirect('login')
				}
		  	}) 
		  	.catch( e => {
		  		//s'il y a une erreur quelconque lors de la création 
				req.flash('errors' , { global : lang['MessageAppGlobalErreur']  } ) ; 
				if ( redirect ) {
					res.redirect('signup?redirect='+encodeURIComponent(redirect) ) 
				}else{
					res.redirect('signup')
				}
			});
	})
	.catch( e => {
		//s'il y a une erreur quelconque lors de la récupération des donner
		req.flash('errors' , { global : lang['MessageAppGlobalErreur']  } ) ; 
		if ( redirect ) {
			res.redirect('signup?redirect='+encodeURIComponent(redirect) ) 
		}else{
			res.redirect('signup')
		}
	});

}