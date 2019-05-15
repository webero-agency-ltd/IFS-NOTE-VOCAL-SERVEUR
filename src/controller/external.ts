import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
const url = require('url');
const request = require('request');
const site = require('../config/site') ;

export function index( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User } = this.db as DBInterface ;
	let { id } = req.user; 
	User.findOne({
	    where: { id }
    })
    	.then( u => {
	    	if ( u ) {

	    	}else{
	    		res.json( { error : true } )
	    	}
		})
		.catch(e => res.json({ error : true } ));
}

export function create( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team , Pour } = this.db as DBInterface ;
	//récupération 
	let { title , compteId , description , type , pour , prioriter , date , contactId } = req.body ; 
	let userid = req.user.id;  

	console.log( title , description , type , pour , prioriter , date , contactId , compteId ) ; 
	
	if ( type == 'trello' ) {
		//création de note trello
		Pour.findOne({
		    where: { id : pour }
	    })
	    	.then( e => {
		  		if ( e ) {
		  			//selection de l'application a la quelle on veut ajouter la notes 
		  			Application.findOne({
					    where: { compteId }
				    })
				    	.then( i => {
				    		if ( !i ) {
				    			return res.json({ error : true , code : 'EC0004' } );
				    		}
				    		request({
							    headers: {
								    'Accept': 'application/json',
		                            'Content-Type': 'application/json'
							    },
							    uri: 'https://api.trello.com/1/cards?token='+i.accessToken + '&key=' + site.trelloKey ,
							    body: JSON.stringify({ idList : e.cardId , name : title , desc : description , due : date , idMembers : e.appId }),
							    method: 'POST'
							}, function (error, _res , body) {
								if (!error && _res.statusCode == 200) {
									let reponse : any; 
									try{
										reponse = JSON.parse( body ) ; 
									}catch( e ){
										reponse = {} ; 
									}
						        	return res.json({ success : true , data : reponse } );
								}else{
						        	return res.json({ error : true , code : 'EC0004' } );
								}
							});
				    	})
				    	.catch( e => res.json({ error : true , code : 'EC0005'} ) );
		  		}else{
		  			res.json({ error : true , code : 'EC0003'} )
		  		}
		  	})
	    	.catch( e => res.json({ error : true , code : 'EC0001'} ) );
	}else if ( type == 'infusionsoft' ) {
		res.json({ error : true , code : 'EC0003'} )
	}else if ( type == 'infusionsoft' ) {
		res.json({ error : true , code : 'EC0003'} )
	}
}