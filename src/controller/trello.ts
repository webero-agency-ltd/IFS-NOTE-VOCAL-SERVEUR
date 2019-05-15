import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
const url = require('url');
const request = require('request');
const site = require('../config/site') ;
const urlAPI = 'https://api.trello.com/1/' ; 

export function view( req:Request, res:Response ) {	
	res.render( 'trello.ejs' ) 
}

export function membre( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { id } = req.params ; 
	Application.find({ where: { id } })
    	.then(i => {
    		if (i) {
				if ( !i.accessToken ) {
					return res.json( { error : lang['TrelloTokenError'] , code : 'MT0003'} ) ;
				}
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
						res.json( reponse )
			        }else{
			        	res.json( { error : lang['MessageAppGlobalErreur'] , code : 'MT0002'} ) 
			        }
				});
		      	 
		    }
		    res.json( [] )
		})
		.catch( e => res.json( { error : lang['MessageAppGlobalErreur'] , code : 'MT0001' } ) );
	

}

export function boardsUpdate( req:Request, res:Response ) {

	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	let { compteId } = req.body ; 
	Application.find({ where: { id } })
    	.then(i => {
    		if (i) {
    			return i.update({ compteId })
			      	.then(t => {
    					res.json({ success : true })
					})
					.catch( e => res.send( lang['TrelloNull'] ) );
    		}
    		res.json({error:lang['TrelloNull'], code : '0003'})
		})
		.catch( e => res.json({error:lang['TrelloNull'], code : '0001'}) );

}

//récupération de tout les cards de trello
export function boards( req:Request, res:Response ) {

	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	Application.find({ where: { id } })
    	.then(i => {
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
	    		res.json( data )
			});
		})
		.catch( e => res.json({error:lang['InfusionsoftNull'], code : '0001'}) );

}

export function lists( req:Request, res:Response ) {

	let { Application , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	Application.find({ where: { id } })
    	.then(i => {
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
	    		res.json( data )
			});
		})
		.catch( e => res.json([]) );

}

