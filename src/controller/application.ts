import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import to from '../libs/promise';

/*
 * Importation de tout les elements de modele a utiliser 
*/
import * as Sequelize from 'sequelize';
import { TeamInstance , TeamAttributes } from '../models/team';
import { UserAttributes, UserInstance } from '../models/user';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
/////////////////

const site = require('../config/site') ;
const request = require('request');
const application = require('../libs/application');
const infusionsoft = require('../libs/infusionsoft');
const trello = require('../libs/trello');


export async function check( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id , type } = req.params  ;
	let { token } = req.query ; 
	return res.success( await application.chackuser( token , id , type ) );			
}

//récupération d'un infusionsoft en particuler avec tout ces statistique 
export async function item( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id } = req.params  ;
	return res.success( await application.item( id ) ); 
}

//récupération de tout les compte infusionsoft d'un utilisateur en question 
export async function index( req:Request, res:Response ) {
	let lang = req.lang() ;
	return res.success( await application.all( req.user.id ) ); 
}

//ici on a un redirection qui vien d'infusionsoft
export async function redirect( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id , code } = req.query ; 
	//@todo : ici, on ferme juste l'application et actualisé automatiquement tout les 
	//soket ouvert de l'application 
	if ( await infusionsoft.findtoken( { id , code } ) ) {
		res.redirect('/');
	}
	//@todo:ici s'il y a une erreur, on affiche une page avec les erreurs mais pas un simple json
}

//re-Récupération des url pour l'obtention des token API infusionsoft et API trello 
export async function reauthorize( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { type , id } = req.params ; 
	return res.success( await application.reauthorize( id ) );			
}

//création d'URL d'authentification dans fusedesk 
export async function create( req:Request, res:Response ) {
	let lang = req.lang() ; 
	//récupération 
	let { name , compteId , type } = req.body ; 
	let userid = req.user.id;  
	let app = await application.create( { name , compteId , type , url : '' } , req.user.id ) ;
	if ( app ) {
		return res.success( app );
	}
}

export async function redirectTrello( req:Request, res:Response ) {
	let { Application , User , Team } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	let { token } = req.query ; 
	if ( token ){
		if ( await trello.findtoken( { id , token } ) ) {
			return res.redirect('/');
		}
	}else{
		res.render( 'trello_r.ejs' ) ; 
	}
}