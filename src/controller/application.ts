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
var note = require('../libs/note');
var application = require('../libs/application');
var infusionsoft = require('../libs/infusionsoft');
var trello = require('../libs/trello');
var trello = require('../libs/trello');
var team = require('../libs/team');


export async function check( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id , type } = req.params  ;
	let { apiKey } = req.query ; 
	return res.success( await application.chackuser( apiKey , id , type ) );			
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


export async function destroy( req:Request, res:Response ) {
	let { id } = req.params ; 
    let i = await application.item( id ) ;
    if (!i) 
    	throw new AppError('AD0002');
    //@todo : voire si on surpimme les notes dans infusionsoft ou pas 
    await note.delete( { ApplicationId : id } ) ;
    await team.delete( { ApplicationId : id } ) ;
    let [ err , data ] = await to( i.destroy() ) 
    if ( err ) {
    	throw new AppError('AD0003');
    } 
	//@ lancer une évenement pour le suprimer plus tard
	return res.success( true )
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


export async function redirectTransferwise( req:Request, res:Response ) {
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