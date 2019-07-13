var site = require('../config/site') ;
var request = require('../libs/request') ;
var AppError = require('../libs/AppError');
var application = require('../libs/application');
var team = require('../libs/team');
var json = require('../libs/json');
var user = require('../libs/user');
import to from '../libs/promise';
import { DBInterface } from '../interface/DBInterface';
import { PourAttributes, PourInstance } from '../models/pour';

class pour {

	async item( id )  : Promise <PourInstance>  {
		let { Pour } = global['db'] as DBInterface ;
		let [ err , data ] = await to(Pour.findOne({
		    where: { id }
	    })) 
	    if ( err ) 
	    	throw new AppError('EN0001');
		data as PourInstance ;
	    return data ;  
	}
	/*
	 * Récupération de tout les pours de l'utilisateur 
	*/
	async find( u , app ){
		let usr = await user.find(  u ) ;
	    if (!usr) 
	    	throw new AppError('EI0001');
	    let i = await application.item( app ) ;  
	    console.log( app )
	    if ( !i )  
	    	throw new AppError('PC0001');
	    let [ err , data ] = await to(usr.getPours({
		    where: { ApplicationId : app }
	    }))
		if ( err ) 
	    	throw new AppError('PI002');
	    return data;
	}

	/*
	 * Création de pour 
	*/
	async create( u , body ){
		let { name , appId , cardId , type } = body ; 
		//récupération de l'utilisateur 
	    let usr = await user.find( u ) ;
	    if (!usr) 
	    	throw new AppError('PC0001');
		let { Pour } = global['db'] as DBInterface ;
		//création du pour
		let [ err , data ] = await to(Pour.create( { name , appId , cardId , type } )) 
	    if ( err ) 
	    	throw new AppError('PC0002');
	  	let p = data as PourInstance ;
	  	//attacher le pour a l'utilisateur courant 
		[ err , data ] = await to(p.setAuthor( usr )) 
	    if ( err ) 
	    	throw new AppError('PC0003');
	    //attacher le pour a l'application 
	    let i = await application.item( body.application ) ;
	    if (!usr) 
	    	throw new AppError('PC0001');
	    [ err , data ] = await to(p.setApplication( i )) 
	    if ( err ) 
	    	throw new AppError('PC0004');
	    console.log('--------------------------')
	    return data ;  
	}

	/*
	 * Supression d'un pour 
	*/
	async destroy( id ){
		let { Pour } = global['db'] as DBInterface ;
		let [ err , data ] = await to(Pour.findOne({
		    where: { id }
	    })) 
	    let p = data as PourInstance; 
	    if ( err || !p ) 
	    	throw new AppError('PD001');
	    [ err , data ] = await to(p.destroy()) 
	    if ( err )
	    	throw new AppError('PD003'); 
	}

}

module.exports = new pour() ; 