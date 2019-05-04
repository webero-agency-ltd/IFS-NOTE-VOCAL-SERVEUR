import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
import forearch from '../libs/forearch';
const site = require('../config/site') ;
const request = require('request');
const querystring = require('querystring');
const urlAPI = 'https://api.infusionsoft.com/crm/rest/v1' ; 
const limite = 6 ;

function allContact( url ) : Promise<any[]> {
	return new Promise<any[]>( async (resolve) => { 
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
					reponse = reponse['contacts'].map( e => e.id )
				}catch( e ){
					reponse = [] ; 
				}
				resolve( reponse )
	        }else{
				resolve( [] )
	        }
		});
	});
}

//récupération des notes 
function allNotes( url , contacts ) : Promise<any[]> {
	let allcontacts = [] ; 
	let i = 0 ; 
	return new Promise<any[]>( async (resolve) => {
		let findnotes = forearch( contacts , function ( data, next ) {
			request({
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    uri:url+'&contact_id='+data,
			    method: 'GET'
			}, function (error, _res, body) {	
				console.log( '----- CHARGEMENT DE : ' + (i+1) + ' SUR ' + contacts.length , ' ... ID USER : ' + data ) ; 
				let reponse : any[]; 
				if (!error && _res.statusCode == 200) {
					try{
						reponse = JSON.parse( body ) ; 
					}catch( e ){
						reponse = [] ; 
					}	
		        }
		        if ( reponse && reponse['notes'] && reponse['notes'].length ) {
		        	allcontacts = [...reponse['notes']] ; 
		        }
		        if ( reponse && reponse['tasks'] && reponse['tasks'].length ) {
		        	allcontacts = [...reponse['tasks']] ; 
		        }
		        i++ ; 
		        next() ; 
			});
		}) ; 
		findnotes.end(function (argument) {
			resolve( allcontacts )
		})
		findnotes.run() ; 
	});
}

//Récupération de tout les taches vocal
function vocal_all( notes ) {
	notes = notes.filter(function (e,i) {
		if ( e.body&&e.body.indexOf('NOTEID::') >= 0 ) {
			return true
		}
		if ( e.description&&e.description.indexOf('NOTEID::') >= 0 ) {
			return true
		}
		return false;
	})
	notes = notes.map((e)=>{
		let repl = e.body.replace(new RegExp('\r?\n','g'), '<br />'); ; 
		let sdsd = /NOTEID::(.*)::NOTEID(.*)/gi;
		let s = sdsd.exec(repl);
		let ID = '' ; 
		let html = '' ; 
		if ( s[1] ) {
			ID = s[1] ; 
		}
		return { ID , contact_id : e.contact_id , title : e.title, body : e.body } ;
	})
	return  notes;
}

//transvase note
export function notes( req:Request, res:Response ) {
	let { Infusionsoft , User } = this.db as DBInterface ;
	let lang = req.lang() ; 
	let { id } = req.params ; 
	//récupération des info en utilisant l'API infusionsoft et l'accessToken 
	Infusionsoft.find({ where: { id } })
    	.then( async i => {
    		let token : any[]; 
			try{
				token = JSON.parse( i.accessToken ) ; 
			}catch( e ){
				token = [] ; 
			}
    		if ( i && token && token['access_token']) {
    			let contacts = await allContact( urlAPI + '/contacts/?limit='+limite+'&access_token='+token['access_token'] ) ; 
    			let notes = await allNotes( urlAPI + '/notes/?limit=100000&access_token='+token['access_token'] , contacts ) ; 
				let wat = await vocal_all( notes ) ; 
				console.log(' ------------------------------------ ' , wat ) ; 
				return res.json( wat )  
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
    	.then( async i => {
    		let token : any[]; 
			try{
				token = JSON.parse( i.accessToken ) ; 
			}catch( e ){
				token = [] ; 
			}
    		if ( i && token && token['access_token']) {
    			let contacts = await allContact( urlAPI + '/contacts/?limit='+limite+'&access_token='+token['access_token'] ) ; 
    			let notes = await allNotes( urlAPI + '/tasks/?limit=100000&access_token='+token['access_token'] , contacts ) ; 
				let wat = await vocal_all( notes ) ; 
				console.log(' ------------------------------------ ' , wat ) ; 
				return res.json( wat )  
		    }else{
		    	res.json( { error : lang['MessageAppGlobalErreur'] } ) 
		    }
		})
		.catch( e => res.json( { error : lang['MessageAppGlobalErreur'] } ) );
}