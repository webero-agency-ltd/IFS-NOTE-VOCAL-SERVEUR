import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';

//ajouter l'utilisateur actuelle a cette infusionsoft 
export function create( req:Request, res:Response ) {
	let { Infusionsoft , User , Team } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	let userid = req.user.id;  
	Infusionsoft.find( { where: { unique : id } } )
	  	.then( I => {
	  		//ici on a l'infusionsoft qui correspond 
	  		//on récupére maintenant l'utilisateur 
	  		User.findOne({
			    where: { id : userid }
		    })
			    .then(function(user) {
			    	//récupération du team, qui a la relation entre infusionsoft 
			    	//et l'utilisateur actuel, s'il n'existe pas, on le crée 
			    	Team.findOne({
					    where: { UserId : userid , InfusionsoftId : I.id }
				    })
					    .then( T => {
			    			if ( !T ) {
			    				//création du teams et attacher le team a l'infusionsoft, et a l'id utilisateur
						    	Team.create( { role : 'membre' , active : true } )
						    		.then( newteam => {
						    			//attache le team a l'utilisateur en question 
						    			newteam.setInfusionsoft( I )
						    				.then( x => {
						    					//attache le team a infusionsoft
								    			newteam.setUser( user )
								    				.then( x => {
										    			res.json( { success:true } ) ; 			
										    		})
										    		.catch( e => {
										    			return res.json({error:lang['MessageAppGlobalErreur']});
													});	
								    		})
								    		.catch( e => {
										  		return res.json({error:lang['MessageAppGlobalErreur']});
											});
						    		})
						    		.catch( e => {
								  		return res.json({error:lang['MessageAppGlobalErreur']});
									});
			    			}else{
							    res.json( { success:true } ) ; 
			    			}
			    		})
			    		.catch( e => {
					  		return res.json({error:lang['MessageAppGlobalErreur']});
						});
			    })
			    .catch( e => {
			  		return res.json({error:lang['MessageAppGlobalErreur']});
				});
	  	}) 
	  	.catch( e => {
			return res.json({error:lang['MessageAppGlobalErreur']});
	  	});
}

//liste de tout les teams d'un infusionsoft qui est passé en paramètre 
export function index( req:Request, res:Response ) {
	let { Infusionsoft , User , Team } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ;
	Team.findAll({
	    where: { InfusionsoftId : id }
    })
	    .then( T => {
	    	let resp = [] ; 
	    	T.forEach( ( e , i ) => {
	    		e.getUser().then( r => {
	    			resp.push( r )
	    			if ( i == T.length - 1 ) {
	    				return res.json( resp );
	    			}
	    		}).catch(e=>{
	    			if ( i == T.length - 1 ) {
	    				return res.json( resp );
	    			}
	    		})
	    	})
		})
		.catch( e => {
			console.log( e )
	  		return res.json({error:lang['MessageAppGlobalErreur']});
		});
}