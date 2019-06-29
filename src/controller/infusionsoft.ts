import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import to from '../libs/promise';
const site = require('../config/site') ;
const request = require('request');
const querystring = require('querystring');
const infusionsoft = require('../libs/infusionsoft');
const application = require('../libs/application');
const note_application = require('../libs/note');

export async function membre( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { id } = req.params ; 
	res.success( await infusionsoft.membre( id ) ) ; 

}

export async function notes( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { token , appId } = req.query ; 
	let { id } = req.params ; 
	res.success( await infusionsoft.notes( appId , id ) ) ; 

}

export async function tasks( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { token , appId } = req.query ; 
	let { id } = req.params ; 
	res.success( await infusionsoft.tasks( appId , id ) ) ; 

}

export async function contacts( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { id } = req.params ; 
	res.success( await infusionsoft.contacts( id ) ) ; 
	
}

export async function setnote( req:Request, res:Response ) {
	let { unique , nativeId , attache } = req.params ; 
	console.log(  { unique , nativeId , attache } )
	//on selectionne d'abord que le note avec l'unique existe 
	//si oui, on fait la mise a jour, si non, on resourne juste un success sant ID 
	return res.success( await note_application.update( { unique , attache : { $not: (attache=='task'?'note':'task') } } , { nativeId } ) ) ; 
}

export async function event( req:Request, res:Response ) {
	
	let { id } = req.params ; 
	if ( req.body.event_key == 'note.add' && req.body.object_keys ) {
      	let n = req.body.object_keys[0].id ; 
      	let app = await application.item( id )
      	if ( !app ) 
	  		return !1;
		//récupération des informations de cette note 
		let note = await infusionsoft.notes( id , n ) ;
		//récupération des notes qui correspond a l'url qui a été enregistre dans le contenue si existe 
		//si l'url existe, on fait le raprochement entre les deux et on fait l'update dans la base de donner 
		//si c'est pas le cas , on laise tout simplement passer 
		if ( !note.id ) 
	  		return !1;
	  	let { body } = note ; 
		console.log( note )  
		if ( body.indexOf('https://therapiequantique.net/note/u/') >= 0 ) {
			let repl = body.replace(new RegExp('\r?\n','g'), ''); ; 
			let sdsd = /https:\/\/therapiequantique.net\/note\/u\/(.*)/gi;
			let s = sdsd.exec(repl);
			if ( s[1] ) {
				console.log( 'update note ici' )  ;
				note_application.update( { unique : s[1] , type : 'note' } , { nativeId : note.id } )
			}
		}
	 	return res.success( true ) ; 
	}
	res.set('X-Hook-Secret', req.get('X-Hook-Secret') );
	res.success( true ) ; 
}

/*
 * Supression de tout les hook qui existe 
*/
export async function destroyHook( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id } = req.params ; 
	res.success( await infusionsoft.destroyHook( id ) ) ; 
}
