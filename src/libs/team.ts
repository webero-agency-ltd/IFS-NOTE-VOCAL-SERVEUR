var site = require('../config/site') ;
var request = require('../libs/request') ;
import { UserAttributes, UserInstance } from '../models/user';
import { DBInterface } from '../interface/DBInterface';
import to from '../libs/promise';
import * as Sequelize from 'sequelize';
import { TeamInstance , TeamAttributes } from '../models/team';
var user = require('../libs/user');
var AppError = require('../libs/AppError');

/*
 * Classe de manipulation des actions vers trello 
*/


class teal {
	
	constructor() {
	
	}

	/*
	 * Récupération de tout les teams d'un utilisateur en particuler  
	*/
	async all( id ) : Promise <TeamAttributes>  {
		//récupération de l'utilisateur 
		let u = await user.findById( id ) ;
	    if (!u) 
	    	return null;
	    //récupération de tout les teams que l'utilisateur est connecter 
	    let [ err , data ] = await to(u.getTeams()) ;
	    if (err) 
	    	throw new AppError('T0001');
	    return data as TeamAttributes ;
	}

	async update( id , obj ){
		// ApplicationId : i.id
		let where = {} ;
		typeof(id)=="object"?where=id:where['id']=id;
		let { Team } = global['db'] as DBInterface ;
		//récupération de la team de l'utilisateur en question 
		let [ err , data ] = await to( Team.findOne({
		    where
	    })) ;
	    let T = data as TeamInstance; 
	    [ err , data ] = await to( T.update( obj ) ) ;
	    return data ;
	}

	/*
     * Création d'un team 
	*/
	async create( obj ){
		//Création de team de l'applications 
		let { Team } = global['db'] as DBInterface ;
		let [ err , data ] = await to(Team.create( { role : 'admin' , ...obj } )) 
	    if ( err ) 
	    	return null ; 
	    data as TeamInstance ;
	    return data;  
	}
}

module.exports = new teal() ; 