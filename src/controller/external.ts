import { Request , Response }  from 'express' ; 
import makeid from '../libs/makeid';
const url = require('url');
const request = require('request');
const site = require('../config/site') ;
const moment = require('moment') ;
import to from '../libs/promise';
import { PourAttributes, PourInstance } from '../models/pour';
import { ApplicationAttributes, ApplicationInstance } from '../models/application';
import { DBInterface } from '../interface/DBInterface';

var external = require('../libs/external') ;
var application = require('../libs/application') ;
var trello = require('../libs/trello') ;
var infusionsoft = require('../libs/infusionsoft') ;
var Pour = require('../libs/pour');

/*
 *	Récupération de la configuration externat pour un utilisateur en particulier  
*/
export async function index( req:Request, res:Response ) {
	let lang = req.lang() ; 
	return res.success( await external.find( req.user.id ) );			
}

export async function create( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { infusionsoft , trello } = req.body ;
	return res.success( await external.create( req.user.id , { infusionsoft , trello } ) );			
}

export async function note( req:Request, res:Response ) {

	let lang = req.lang() ; 
	//récupération 
	let { title , compteId , description , type , pour , prioriter , date , contactId } = req.body ; 
	let userid = req.user.id;  
	console.log( '---------------------------' )
	console.log( title , description , type , pour , prioriter , date , contactId , compteId ) ; 
    let p = await Pour.item( pour ) ; 
    let i = await application.item( compteId ) ;
    if (!i) 
    	throw new AppError('EN0002');
	if ( type == 'trello' ) {
		//récupération de l'id du label s'il existe
	    let data = await Pour.item( prioriter ) ;
	    let label = '' ; 
		if ( data ) {
			label = data.appId ; 
		}
		//création de note trello
	    let body = { idList : p.cardId , name : title , desc : description , due : moment( date , 'YYYY-MM-DDTHH:mm:ssZ' ).clone().format('YYYY-MM-DD') } ; 
		if ( label ) {
			body['idLabels'] = label ; 
		}
		if ( p.appId !== 'generale' ) {
			body['idMembers'] = p.appId ; 
		}
	    return res.success( await trello.createCards( body , i.accessToken ) );
	}else if ( type == 'infusionsoft' && pour !== 'default' ) {
		let body = { contact: { id : contactId } , description , due_date : date , title : title , priority : prioriter , user_id : p.appId } ; 
	    return res.success( await infusionsoft.createTasks( body , i.accessToken ) );
	}else if ( type == 'infusionsoft' && pour == 'default') {
		let body = { contact_id: contactId , body : description , title : title } ; 
	    return res.success( await infusionsoft.createNotes( body , i.accessToken ) );
	}
	
}