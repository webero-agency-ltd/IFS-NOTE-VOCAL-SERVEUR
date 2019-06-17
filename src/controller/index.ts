import { Request , Response }  from 'express' ; 
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import to from '../libs/promise';
import { DBInterface } from '../interface/DBInterface';
const site = require('../config/site') ;
const request = require('request');
const querystring = require('querystring');
const basic = require('basic-authorization-header');
const fs = require('fs');
const moment = require('moment');
const path = require('path') ;
const execSync = require('child_process').execSync;
import forearch from '../libs/forearch';

export function index( req:Request, res:Response ) {
	let lang = req.lang() ; 
	res.render( 'index.ejs',{ lang:JSON.stringify(res.locals.lang), urlapplication:site.urlapp, portapplication:site.port, chromeId:site.chromeId } )
}

export function vocalNote( req:Request, res:Response ) {
	let lang = req.lang() ; 
	res.render( 'noteVocal.ejs' ,{ lang:JSON.stringify(res.locals.lang), urlapplication:site.urlapp, portapplication:site.port } ) 
}

//actualisation de token infusionsoft 
export async function refreshToken( req:Request, res:Response ) {

	let { Application , User , Team } = this.db as DBInterface ;
	//récupération de tout les token application infusionsoft du system 
	//tout sans exeption d'utilisateur en partuculier 
	let err : any ;  
	let data  ;
	//récupération des utilisateur courant 
	data as ApplicationInstance ;
	[ err , data ] = await to(Application.findAll({ where: { type : 'infusionsoft' } })) 
    if ( err || !data ) {
    	return res.error('IXR0001') ; 
    }
    let i = data ; 
    let application = [] ; 
    let findnotes = forearch( i , function ( data, next ) {
		let token : any ; 
		try{
			token = JSON.parse( data.accessToken ) ; 
		}catch( e ){
			token = null ; 
		}
		if ( !token || !token['access_token']) {
			//@todo : en temps normale, on doivent ajouter ici un sytem qui va permètre de
			//d'envoyer un email a l'amin route pour indiquer que la refresh token 
			//a eu une erreur 
			application = [ { id : data.id , status : 'error' , code : 'IXD0001' } , ...application]
			return next() ;
		}
		//formatage de ces token infuionsoft 
		let url = 'https://api.infusionsoft.com/token' ; 
		let form = {
	    	grant_type: 'refresh_token', 
	    	refresh_token : token['refresh_token'] 
		}; 
		let formData = querystring.stringify(form);
		let contentLength = formData.length;
		let Authorization = basic(site.clientId,site.clientSecret)
		request({
		    headers: {
		      	'Content-Length': contentLength,
		      	'Content-Type': 'application/x-www-form-urlencoded',
		      	'Authorization': Authorization , 
		    },
		    uri: url ,
		    body: formData,
		    method: 'POST'
		}, async function ( error, _res , body ) {
			console.log( body )
	        if (!error && _res.statusCode == 200) {
				application = [ { id : data.id , status : 'success' } , ...application ]
	        	await to( data.update({ accessToken: body }) ) ;
	        }else{
				application = [ { id : data.id , status : 'error' , code : 'IXD0002' , body } , ...application ]
	        }
	        next() ; 
		});
	});

	findnotes.end(function () { 
		//création du fichier log et qui serait visible seulement par l'adinistrateur 
		fs.writeFile( path.join(__dirname , '../token/'+moment().format("MM_ddd_YYYY_hh_mm_ss_a")+'_log.json' ) , JSON.stringify( application ) , 'utf8', (err)=>{
			let cmd = `echo "curl ${site.urlapp}/refresh-token" | at now + 180 minutes`;
			let options = {
			  	encoding: 'utf8'
			};
			let command = execSync(cmd, options) ; 
			console.log( '______________________________' );
			console.log( command );
			res.success( i ) ; 
		});
	})
	
	findnotes.run() ; 

}