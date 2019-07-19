import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import to from '../libs/promise'; 

const url = require('url');

var site = require('../config/site') ;
var note_application = require('../libs/note');
var external = require('../libs/external') ;
var application = require('../libs/application') ;
var trello = require('../libs/trello') ;
var infusionsoft = require('../libs/infusionsoft') ;
var Pour = require('../libs/pour');
const moment = require('moment') ;

export async function view( req:Request, res:Response ) {	
	res.render( 'trello.ejs' ) 
}

export async function cardUpdate( req:Request, res:Response ) {
	let lang = req.lang() ; 
	//récupération 
	let { title , compteId , description , type , pour , prioriter , date , contactId } = req.body ; 
	let userid = req.user.id;  
	console.log( '---------------------------' )
	console.log( 'cardUpdate' )
	console.log( '---------------------------' )
	console.log( title , description , type , pour , prioriter , date , contactId , compteId ) ; 
    let p = await Pour.item( pour ) ; 
    let i = await application.item( compteId ) ;
    if (!i) 
    	throw new AppError('EN0002');
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
	console.log( body ) ; 
    return res.success( await trello.createCards( body , i.accessToken ) );
} 

export async function cardAdd( req:Request, res:Response ) {
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
	console.log( body ) ; 
    return res.success( await trello.createCards( body , i.accessToken ) );
} 

export async function membre( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { id } = req.params ; 
	let i = await application.item( id ) ; 
	if ( !i ) 
    	return res.error('TMBU001') ; 
    if ( !i.compteId ) 
    	return res.error('TMBU004') ; 
    let { success , error } = await trello.membres({ board : i.compteId , token : i.accessToken }) ; 
	if ( success ) 
		return res.success( success );  
    return res.error('TMBU003') ;
} 

export async function event( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id } = req.params ; 
	if ( req.body.action.type !== 'createCard' ) 
	 	return res.success();  
	//on fait l'upldate de tout les cards de l'application ici :) 
	let app = await application.item( id ) ; 
	if ( !app ) 
	 	return res.success();  
	let cards = await trello.cards({ board : app.compteId , token : app.accessToken })
	let boards = await trello.board({ token : app.accessToken , id : app.compteId }) ; 
	if ( !boards.success || !boards.success.url ) 
	 	return res.success();  
	let url = boards.success.url ;
	cards.success.push({ url })
	let cardstring = cards.success.map(({ url })=>{
		return decodeURIComponent(url.replace('https://trello.com', ''))  ;
	}).join() ; 
	console.log( cardstring ) ; 
	return res.success( await application.update( id , { url : cardstring } ) );
} 

export async function boardsUpdate( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { id } = req.params ; 
	let { compteId , url } = req.body ; 
	//récupération des cars de trello 
	let app = await application.item( id ) ; 
	let cards = await trello.cards({ board : compteId , token : app.accessToken })
	cards.success.push({ url })
	let cardstring = cards.success.map(({ url })=>{
		return decodeURIComponent(url.replace('https://trello.com', ''))  ;
	}).join() ; 
	//suppression de l'ancien webhook 
	await trello.deleteWebhook( { board : app.compteId , token : app.accessToken } )
	//ajout de webhook 
	await trello.webhook( { board : compteId , token : app.accessToken , app : app.id } )
	return res.success( await application.update( id , { compteId , url : cardstring } ) );
}

/*
 * Récupération des bord dans un application trello, 
 * et qui correspond a l'utilisateur trello qui a crée le token  
*/
export async function boards( req:Request, res:Response ) {
	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	let i = await application.item( id ) ; 
	if ( !i ) {
    	return res.error('TMB001') ; 
    }
    let { success , error } = await trello.boards({ token : i.accessToken }) ; 
	if ( success ) {
		return res.success( success );  
    }
    return res.error('TMB002') ; 
}

/*
 * Récupèration des cards de trello 
*/
export async function cards( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id } = req.params ; 
	let { appId } = req.query ; 
    let i = await application.item( appId ) ; 
	if ( !i ) {
    	return res.error('TML001') ; 
    }
    let { success , error } = await trello.card({ card : id , token : i.accessToken }) ; 
	if ( success ) {
		console.log( success )
		return res.success( success );  
    }
    console.log( error )
    return res.error('TML002') ;
}

/*
 * Récupération des Listes dans un application trello
*/
export async function lists( req:Request, res:Response ) {
	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
    let i = await application.item( id ) ; 
	if ( !i ) {
    	return res.error('TML001') ; 
    }
    let { success , error } = await trello.lists({ board : i.compteId , token : i.accessToken }) ; 
	if ( success ) {
		return res.success( success );  
    }
    console.log( error )
    return res.error('TML002') ; 
}


/*
 * Récupération des label dans un application trello
*/
export async function label( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id } = req.params ;
	let i = await application.item( id ) ; 
	if ( !i ) {
    	return res.error('TML001') ; 
    }
    let { success , error } = await trello.labels({ board : i.compteId , token : i.accessToken }) ; 
	if ( success ) {
		return res.success( success );  
    }
}