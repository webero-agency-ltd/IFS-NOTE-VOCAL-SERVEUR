var site = require('../config/site') ;
var request = require('../libs/request') ;
var user = require('../libs/user');
var team = require('../libs/team');
import to from '../libs/promise';
import { PourAttributes , PourInstance } from '../models/pour';
import * as Sequelize from 'sequelize';
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
var AppError = require('../libs/AppError');
var note = require('../libs/note');

/*
 * Classe de manipulation des actions vers trello 
*/

class app {
	
	/*
	 * Création et attachement d'un formulaire a une notes 
	*/
	async create( n , data ){
		let { Form } = global['db'] as DBInterface ;
		//varéfier si le note existe 
		let itemNote = await note.find( n )
		if( !itemNote )
		    throw new AppError('F0001');
		let traits = data.filter( e => e.type && e.name && e.value ) ; 
		console.log( traits )
		for( const i of traits ){
			let { type , name , value } = i ;
			//if faut checker d'abord si le formilaire n'existe pas encore,
			//s'il existe, on fait la mise a jour de ca valeur  
			let [ err , data ] = await to(Form.findOne({
			    where : { name , NoteId : n }
		    })) 
			let f = data as PourInstance ;
			if ( f ) {
				//ici on fait la mise a jour de la valeur car la formulaire existe déja
				[ err , data ] = await to(f.update( { type , name , value } )) 
			    if ( err )  
			    	throw new AppError('F0004');
			}else{
				//ici on crée le formulaire car il n'existe pas encore 
				[ err , data ] = await to(Form.create( { type , name , value } )) 
			    if ( err )  
			    	throw new AppError('F0002');
			}
		    //on ratache ensuite cette formulaire au note que l'on a selectionner avant 
		    [ err , data ] = await to(itemNote.setForms( data )) 
		    if ( err )  
		    	throw new AppError('F0003');
		}
		
		return data;
	}

	/*
	 * 	Récupération d'une formulaire d'une note en question 
	*/
	async find( n ){
		let { Form } = global['db'] as DBInterface ;
		//varéfier si le note existe 
		let itemNote = await note.find( n )
		if( !itemNote )
		    throw new AppError('F0001');
		let [ err , data ] = await to(itemNote.getForms()) 
	    if ( err )  
	    	throw new AppError('F0003');
	    return data ;
	}

}

module.exports = new app() ; 