import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
const site = require('../config/site') ;
const request = require('request');
const querystring = require('querystring');
const urlAPI = 'https://api.infusionsoft.com/crm/rest/v1' ; 

//transvase note
export function notes( req:Request, res:Response ) {
	let { Infusionsoft , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	//récupération des info en utilisant l'API infusionsoft et l'accessToken 
	Infusionsoft.find({ where: { id } })
    	.then(i => {
    		let token : any[]; 
			try{
				token = JSON.parse( i.accessToken ) ; 
			}catch( e ){
				token = [] ; 
			}
    		if ( i && token && token['access_token']) {
    			let url = urlAPI + '/merchants/?access_token='+token['access_token']  ; 
				request({
				    headers: {
				      'Content-Type': 'application/json'
				    },
				    uri:url,
				    method: 'GET'
				}, function (error, _res, body) {	
					if (!error && _res.statusCode == 200) {
						let reponse : any[]; 
						try{
							reponse = JSON.parse( body ) ; 
						}catch( e ){
							reponse = [] ; 
						}
						res.json( reponse )
			        }else{
			        	res.json( { error : lang['InfusionsoftAPINull'] } ) 
			        }
				});
		    }else{
		    	res.json( { error : lang['MessageAppGlobalErreur'] } ) 
		    }
		})
		.catch( e => res.json( { error : lang['MessageAppGlobalErreur'] } ) );
}

//transvase tache 
export function tasks( req:Request, res:Response ) {
	let { Infusionsoft , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	//récupération des info en utilisant l'API infusionsoft et l'accessToken 
	Infusionsoft.find({ where: { id } })
    	.then(i => {
    		let token : any[]; 
			try{
				token = JSON.parse( i.accessToken ) ; 
			}catch( e ){
				token = [] ; 
			}
    		if ( i && token && token['access_token']) {
    			let url = urlAPI + '/merchants/?access_token='+token['access_token']  ; 
				request({
				    headers: {
				      'Content-Type': 'application/json'
				    },
				    uri:url,
				    method: 'GET'
				}, function (error, _res, body) {	
					if (!error && _res.statusCode == 200) {
						let reponse : any[]; 
						try{
							reponse = JSON.parse( body ) ; 
						}catch( e ){
							reponse = [] ; 
						}
						res.json( reponse )
			        }else{
			        	res.json( { error : lang['InfusionsoftAPINull'] } ) 
			        }
				});
		    }else{
		    	res.json( { error : lang['MessageAppGlobalErreur'] } ) 
		    }
		})
		.catch( e => res.json( { error : lang['MessageAppGlobalErreur'] } ) );
}