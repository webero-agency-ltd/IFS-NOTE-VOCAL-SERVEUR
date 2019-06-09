import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import to from '../libs/promise'; 

const url = require('url');
const trello = require('../libs/trello');
const application = require('../libs/application');


export function view( req:Request, res:Response ) {	
	res.render( 'trello.ejs' ) 
}

export async function membre( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { id } = req.params ; 
	let i = await application.item( id ) ; 
	if ( !i ) {
    	return res.error('TMBU001') ; 
    }
    let { success , error } = await trello.membres({ board : i.compteId , token : i.accessToken }) ; 
	if ( success ) {
		return res.success( success );  
    }
    return res.error('TMBU003') ;
} 

export async function boardsUpdate( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id } = req.params ; 
	let { compteId , url } = req.body ; 
	//récupération des cars de trello 
	let app = await application.item( id ) ; 
	let cards = await trello.cards({ board : app.compteId , token : app.accessToken })
	console.log( cards.success.map(({ url , shortUrl })=>{
		return { url , shortUrl }  ;
	}) )
	cards.success.push({ url })
	let cardstring = cards.success.map(({ url })=>{
		return decodeURIComponent(url.replace('https://trello.com', ''))  ;
	}).join() ; 
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