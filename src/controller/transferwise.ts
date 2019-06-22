import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import to from '../libs/promise';

const site = require('../config/site') ;
const transferwise = require('../libs/transferwise') ;

/*
 * Manipulation de tout l'application de transferwise 
*/
export async function profiles( req:Request, res:Response ) {
	return res.success( await transferwise.profiles( site.transferwise ) );			
}

/*
 * Récupération du token transwise de l'utilisateur en cour 
*/
export async function find( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let userid = req.user.id;   
	return res.success( await transferwise.find( userid ) );			
}

/*
 * Création de l'api token de l'utilisateur 
*/
export async function create( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let userid = req.user.id;   
	let { name , token } = req.body ; 
	return res.success( await transferwise.create( userid , name , token ) );			
}

/*
 * Récupération des tout les transfers de transferwise
*/
export async function transfers( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { page } = req.query ; 
	let userid = req.user.id;  
	let data  = await transferwise.find( userid ) ; 
	if ( !data.token ) 
		return res.error('');
	return res.success( await transferwise.transfers( data.token , parseInt( page ) ) );			
}


export async function transfers_create( req:Request, res:Response ) {
	return res.success( await transferwise.transfers_create( site.transferwise ) );			
}
