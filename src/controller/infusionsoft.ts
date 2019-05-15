import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
const site = require('../config/site') ;
const request = require('request');
const querystring = require('querystring');
const urlAPI = 'https://api.infusionsoft.com/crm/rest/v1' ; 

export function membre( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { id } = req.params ; 
	Application.find({ where: { id } })
    	.then(i => {
    		if (i) {
    			let token : any ; 
				try{
					token = JSON.parse( i.accessToken ) ; 
				}catch( e ){
					token = null ; 
				}
				if ( !token || !token['access_token']) {
					return res.json( { error : lang['InfusionsoftTokenError'] , code : 'MI0003'} ) ;
				}
    			let url = urlAPI + '/users/?access_token='+token['access_token']  ; 
				return request({
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
						if (reponse['users']) {
							res.json( reponse['users'] )
						}
						else{
							res.json( [] )
						}
			        }else{
			        	res.json( { error : lang['MessageAppGlobalErreur'] , code : 'MI0002'} ) 
			        }
				});
		      	 
		    }
		    res.json( [] )
		})
		.catch( e => res.json( { error : lang['MessageAppGlobalErreur'] , code : 'MI0001' } ) );
	
}

export function contacts( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { id } = req.params ; 
	Application.find({ where: { id } })
    	.then(i => {
    		if (i) {
    			let token : any ; 
				try{
					token = JSON.parse( i.accessToken ) ; 
				}catch( e ){
					token = null ; 
				}
				if ( !token || !token['access_token']) {
					return res.json( { error : lang['InfusionsoftTokenError'] , code : 'MI0003'} ) ;
				}
    			let url = urlAPI + '/contacts/?access_token='+token['access_token']  ; 
				return request({
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
						if (reponse['contacts']) {
							res.json( reponse['contacts'].map( function (e) {
								return { text : e.family_name + ' ' + e.given_name , value : e.id , ...e }
							}))
						}
						else{
							res.json( [] )
						}
			        }else{
			        	res.json( { error : lang['MessageAppGlobalErreur'] , code : 'MI0002'} ) 
			        }
				});
		      	 
		    }
		    res.json( [] )
		})
		.catch( e => res.json( { error : lang['MessageAppGlobalErreur'] , code : 'MI0001' } ) );
	
}