import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
const url = require('url');
const request = require('request');
const site = require('../config/site') ;
const moment = require('moment') ;
import to from '../libs/promise';
import { UserAttributes, UserInstance } from '../models/user';
import { ExternalAttributes, ExternalInstance } from '../models/external';
import { PourAttributes, PourInstance } from '../models/pour';
import { ApplicationAttributes, ApplicationInstance } from '../models/application';

export async function index( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team , Pour } = this.db as DBInterface ;
	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as UserInstance ;
	[ err , data ] = await to(User.findOne({
	    where: { id : req.user.id }
    })) 
    if ( err ) {
    	return res.error('EI0001') ; 
    }
    let user = data ; 
    [ err , data ] = await to( user.getExternal() ) 
    if ( err ) {
    	return res.error('EI0002') ; 
    }
    if ( !data ) {
    	data = { infusionsoft : null , trello : null }
    }
    return res.success( data );

}

export async function create( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team , External } = this.db as DBInterface ;
	//récupération 
	let { infusionsoft , trello } = req.body ; 

	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as UserInstance ;
	[ err , data ] = await to(User.findOne({
	    where: { id : req.user.id }
    })) 
    if ( err ) {
    	return res.error('EC0001') ; 
    }
    let user = data ;
    //récupération externale si existe 
    data as ExternalInstance ;
	[ err , data ] = await to(External.findOne({
	    where: { UserId : req.user.id }
    })) 
    if ( err ) {
    	return res.error('EI0003') ; 
    }
    let externaleInstance = data ; 
    if ( externaleInstance ) {
    	//ici l'option external existe, donc on fait juste la mise a jour de celle ci 
    	externaleInstance.update( { infusionsoft , trello } )	
    	return res.success();
    }

    //Création de team de l'applications 
    data as ExternalInstance ;
	[ err , data ] = await to(External.create( { infusionsoft , trello } )) 
    if ( err ) {
    	return res.error('EI0004') ; 
    }
    externaleInstance = data ; 
 
    [ err , data ] = await to( user.setExternal( externaleInstance ) ) 
    if ( err ) {
    	return res.error('EC0002') ; 
    }
    return res.success( data );

}

export async function note( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team , Pour } = this.db as DBInterface ;
	//récupération 
	let { title , compteId , description , type , pour , prioriter , date , contactId } = req.body ; 
	let userid = req.user.id;  
	console.log( '---------------------------' )
	console.log( title , description , type , pour , prioriter , date , contactId , compteId ) ; 
	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as PourInstance ;
	[ err , data ] = await to(Pour.findOne({
	    where: { id : pour }
    })) 
    if ( err ) {
    	return res.error('EN0001') ; 
    }
    let p = data ; 

    data as ApplicationInstance ;
	[ err , data ] = await to(Application.findOne({
	    where: { id : compteId }
    })) 
    if ( err && !data ) {
    	return res.error('EN0002') ; 
    }
    let i = data ; 
    
	if ( type == 'trello' ) {
		//récupération de l'id du label s'il existe 
		data as PourInstance ;
		[ err , data ] = await to(Pour.findOne({
		    where: { id : prioriter }
	    })) 
	    let label = '' ; 
		if ( data ) {
			label = data.appId ; 
		}
		//création de note trello
	    let body = { idLabels : label , idList : p.cardId , name : title , desc : description , due : moment( date , 'YYYY-MM-DDTHH:mm:ssZ' ).clone().format('YYYY-MM-DD') } ; 
		if ( p.appId !== 'generale' ) {
			body['idMembers'] = p.appId ; 
		}
		request({
		    headers: {
			    'Accept': 'application/json',
                'Content-Type': 'application/json'
		    },
		    uri: 'https://api.trello.com/1/cards?token='+i.accessToken + '&key=' + site.trelloKey ,
		    body : JSON.stringify( body ) ,
		    method: 'POST'
		}, function (error, _res , body) {
			if (!error && _res.statusCode == 200) {
				let reponse : any; 
				try{
					reponse = JSON.parse( body ) ; 
				}catch( e ){
					reponse = {} ; 
				}
	        	return res.success( reponse );
			}
			console.log( body )
	    	return res.error('EN0003') ; 
		});

	}else if ( type == 'infusionsoft' && pour !== 'default' ) {
		
		console.log('--- TASK CREATE')
	    let token : any[]; 
		try{
			token = JSON.parse( i.accessToken ) ; 
		}catch( e ){
	    	return res.error('EN0004') ; 
		}

		request({
		    headers: {
			    'Accept': 'application/json',
                'Content-Type': 'application/json'
		    },
		    uri: 'https://api.infusionsoft.com/crm/rest/v1/tasks/?access_token='+token['access_token'] ,
		    body: JSON.stringify({ contact: { id : contactId } , description , due_date : date , title : title , priority : prioriter , user_id : p.appId }),
		    method: 'POST'
		}, function (error, _res , body) {
			if ( ! error && (_res.statusCode == 200 || _res.statusCode == 201) ) {
				let reponse : any; 
				try{
					reponse = JSON.parse( body ) ; 
				}catch( e ){
					reponse = {} ; 
				}
	        	return res.json({ success : true , data : reponse } );
			}else{
				console.log( body )
				console.log( { contact: { id : contactId } , description , due_date : date , title : title , priority : prioriter , user_id : p.appId } ) ; 
	    		return res.error('EN0005') ; 
			}
		});

	}else if ( type == 'infusionsoft' && pour == 'default') {
		console.log('--- NOTE CREATE')
		//selection de l'application a la quelle on veut ajouter la notes 
		let token : any[]; 
		try{
			token = JSON.parse( i.accessToken ) ; 
		}catch( e ){
	    	return res.error('EN0006') ; 
		}
		request({
		    headers: {
			    'Accept': 'application/json',
                'Content-Type': 'application/json'
		    },
		    uri: 'https://api.infusionsoft.com/crm/rest/v1/notes/?access_token='+token['access_token'] ,
		    body: JSON.stringify({ contact_id: contactId , body : description , title : title }),
		    method: 'POST'
		}, function (error, _res , body) {
			console.log( '----------' , body )
			if ( ! error && (_res.statusCode == 200 || _res.statusCode == 201) ) {
				let reponse : any; 
				try{
					reponse = JSON.parse( body ) ; 
				}catch( e ){
					reponse = {} ; 
				}
	        	return res.json({ success : true , data : reponse } );
			}
	    	return res.error('EN0007') ; 
		});
	}
}