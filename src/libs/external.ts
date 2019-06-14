var request = require('../libs/request') ;
var json = require('../libs/json');
var application = require('../libs/application');
var AppError = require('../libs/AppError');
var user = require('../libs/user');
import { ExternalAttributes, ExternalInstance } from '../models/external';
import to from '../libs/promise';
import { DBInterface } from '../interface/DBInterface';

/*
 * Classe de manipulation des actions vers trello 
*/
class ext {

	/*
	 * récupération de la configuration de l'externale 
	*/
	async find( u ){
	    let usr = await user.find(  u ) ;
	    if (!usr) 
	    	throw new AppError('EI0001');
	    let [ err , data ] = await to( usr.getExternal() ) 
	    if ( err ) 
	    	throw new AppError('EI0002');
	    if ( !data ) {
	    	data = { infusionsoft : null , trello : null }
	    }
	    return data ;
	}

	/*
	 * Création d'un configuration
	*/
	async create( u , { infusionsoft , trello } ){
	    let usr = await user.find( u ) ;
	    if (!usr) 
	    	throw new AppError('EC0001');
		let { External } = global['db'] as DBInterface ;
	    //récupération externale si existe 
		let [ err , data ] = await to(External.findOne({
		    where: { UserId : u }
	    })) 
	    if ( err || !data ) 
	    	throw new AppError('EI0003');
	    let external = data as ExternalInstance ;
	    if ( external ) {
	    	//ici l'option external existe, donc on fait juste la mise a jour de celle ci 
	    	return external.update( { infusionsoft , trello } )	
	    }
	    //Création de team de l'applications 
	    data as ExternalInstance ;
		[ err , data ] = await to(External.create( { infusionsoft , trello } )) 
	    if ( err ) 
	    	throw new AppError('EI0004');
	    external = data ; 
	    [ err , data ] = await to( user.setExternal( external ) ) 
	    if ( err )
	    	throw new AppError('EI0005');
	    return external ;
	}
}

module.exports = new ext() ; 