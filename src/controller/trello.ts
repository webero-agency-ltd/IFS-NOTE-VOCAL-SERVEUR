import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import to from '../libs/promise';

const url = require('url');
const request = require('request');
const site = require('../config/site') ;
const urlAPI = 'https://api.trello.com/1/' ; 

export function view( req:Request, res:Response ) {	
	res.render( 'trello.ejs' ) 
}

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
    	return res.error('TMBU001') ; 
    }
    let i = data ; 

	let url = urlAPI + '/boards/'+i.compteId+'/members/?token='+i.accessToken + '&key=' + site.trelloKey  ; 
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
			return res.success( reponse );  
        }
        return res.error('TMBU003') ;
	});
	
}

export async function boardsUpdate( req:Request, res:Response ) {

	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	let { compteId , url } = req.body ; 

	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.find({ where: { id } })) 
    if ( err ) {
    	return res.error('TMBU001') ; 
    }
    let i = data ; 

    [ err , data ] = await to(i.update({ compteId , url })) 
    if ( err ) {
    	return res.error('TMBU002') ; 
    }

	return res.success( i );  

}

//récupération de tout les cards de trello
export async function boards( req:Request, res:Response ) {

	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 

	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.find( { where: { id } } )) 
    if ( err ) {
    	return res.error('TMB001') ; 
    }
    let i = data ; 

    let url = urlAPI+'members/me/boards?key='+site.trelloKey+'&token='+i.accessToken; 
	console.log( url ) 
	request({
	    uri: url ,
	    method: 'GET'
	}, function (error, _res , body) {
		let data : any[]; 
		try{
			data = JSON.parse( body ) ; 
		}catch( e ){
			data = [] ; 
		}
		return res.success( data );
	});

}

export async function lists( req:Request, res:Response ) {

	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 

	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.find( { where: { id } } )) 
    if ( err ) {
    	return res.error('TML001') ; 
    }
    let i = data ; 

	let url = urlAPI+'boards/'+i.compteId+'/lists?key='+site.trelloKey+'&token='+i.accessToken; 
	console.log( url ) 
	request({
	    uri: url ,
	    method: 'GET'
	}, function (error, _res , body) {
		let data : any[]; 
		try{
			data = JSON.parse( body ) ; 
		}catch( e ){
			data = [] ; 
		}
		return res.success( data );
	});

}

export async function label( req:Request, res:Response ) {

	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 

	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.find( { where: { id } } )) 
    if ( err ) {
    	return res.error('TML001') ; 
    }
    let i = data ; 
    let url = urlAPI+'boards/'+i.compteId+'/labels?fields=all&key='+site.trelloKey+'&token='+i.accessToken ; 
	console.log( url ) 
	request({
	    uri: url ,
	    method: 'GET'
	}, function (error, _res , body) {
		console.log( body )
		let data : any[]; 
		try{
			data = JSON.parse( body ) ; 
		}catch( e ){
			data = [] ; 
		}
		return res.success( data );
	});

}