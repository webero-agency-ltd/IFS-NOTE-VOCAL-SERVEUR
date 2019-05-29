import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import to from '../libs/promise';
const site = require('../config/site') ;
const request = require('request');
const querystring = require('querystring');
const urlAPI = 'https://api.infusionsoft.com/crm/rest/v1' ; 

export async function membre( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { id } = req.params ; 
	
	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.find({ where: { id } })) 
    if ( err ) {
    	return res.error('IM0001') ; 
    }
    let i = data ; 

	let token : any ; 
	try{
		token = JSON.parse( i.accessToken ) ; 
	}catch( e ){
		token = null ; 
	}
	if ( !token || !token['access_token']) {
		return res.error('IM0002') ;
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
			res.success(reponse['users']?reponse['users']:[])
        }else{
        	return res.error('IM0003') 
        }
	});
	
}

export async function contacts( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { id } = req.params ; 

	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.find({ where: { id } })) 
    if ( err ) {
    	return res.error('IC0001') ; 
    }
    let i = data ; 

	let token : any ; 
	try{
		token = JSON.parse( i.accessToken ) ; 
	}catch( e ){
		token = null ; 
	}
	if ( !token || !token['access_token']) {
		return res.error('IC0002') ;
	}
	let url = urlAPI + '/contacts/?access_token='+token['access_token'] ;
	console.log( url ) 
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
				res.success( reponse['contacts'].map( function (e) {
					return { text : e.family_name + ' ' + e.given_name , value : e.id , ...e }
				}))
			}
			else{
				res.success( [] )
			}
        }else{
        	return res.error('IC0003') 
        }
	});
	
}

/*
	//Récupération des différent information d'Infusionsoft 
	export function infos( req:Request, res:Response ) {
		let { Application , User } = this.db as DBInterface ;
		let lang = req.lang() ; 
		let { id } = req.params ; 
		//récupération des info en utilisant l'API infusionsoft et l'accessToken 
		Application.find({ where: { id } })
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
				        	res.json( { error : lang['InfusionsoftAPINull'] , code : '0011'} ) 
				        }
					});
			    }else{
			    	res.json( { error : lang['MessageAppGlobalErreur'] , code : '0012'} ) 
			    }
			})
			.catch( e => res.json( { error : lang['MessageAppGlobalErreur'] , code : '0013'} ) );
	}
*/