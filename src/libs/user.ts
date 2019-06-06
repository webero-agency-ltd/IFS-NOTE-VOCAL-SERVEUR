var site = require('../config/site') ;
var request = require('../libs/request') ;
import { UserAttributes, UserInstance } from '../models/user';
import { DBInterface } from '../interface/DBInterface';
import to from '../libs/promise';

/*
 * Classe de manipulation des actions vers trello 
*/

class user {
	
	constructor() {
	
	}

	/*
	 * Récupération d'un utilisateur en fonction de son ID 
	*/
	async findById( user )  : Promise <UserInstance>  {
		let { User } = global['db'] as DBInterface ;
		let [ err , data ] = await to(User.findOne({
		    where: { id : user }
	    })) 
		data as UserInstance ;
	    return data ;  
	}
}

module.exports = new user() ; 