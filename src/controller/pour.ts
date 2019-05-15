import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
const url = require('url');
const request = require('request');
const site = require('../config/site') ;

export function index( req:Request, res:Response ) {	

	let lang = req.lang() ; 
	let { Pour , User } = this.db as DBInterface ;
	let userid = req.user.id;  
	let { name , appId , cardId } = req.body ; 

	User.findOne({
	    where: { id : userid }
    })
    	.then( u => {
    		u.getPours()
	    		.then( s => {
					return res.json( s );
			  	}) 
			  	.catch( e => {
			  		console.log( e )
					return res.json({error:lang['MessageAppGlobalErreur'], code : 'PU0017'});
			  	});
	  	}) 
	  	.catch( e => {
			return res.json({error:lang['MessageAppGlobalErreur'], code : 'PU0014'});
	  	});

}

export function delet( req:Request, res:Response ) {	

	let lang = req.lang() ; 
	let { Pour , User } = this.db as DBInterface ;
	let userid = req.user.id;  
	let { id } = req.params ; 

	Pour.findOne({
	    where: { id }
    })
    	.then( p => {
    		p.destroy() 
	    		.then( s => {
					return res.json( {success:true} );
			  	}) 
			  	.catch( e => {
					return res.json({error:lang['MessageAppGlobalErreur'], code : 'PU0017'});
			  	});
	  	}) 
	  	.catch( e => {
			return res.json({error:lang['MessageAppGlobalErreur'], code : 'PU0014'});
	  	});

}


export function create( req:Request, res:Response ) {	
	
	let lang = req.lang() ; 
	let { Pour , User } = this.db as DBInterface ;
	let userid = req.user.id;  
	let { name , appId , cardId , type } = req.body ; 

	Pour.create( { name , appId , cardId , type } )
	  	.then( p => {
	  		User.findOne({
			    where: { id : userid }
		    })
		    	.then( u => {
		    		if ( u ) {
		    			p.setAuthor( u )
			    			.then( u => {
					    		return res.json({ success : true });
						  	}) 
						  	.catch( e => {
								return res.json({error:lang['MessageAppGlobalErreur'], code : 'PU0012'});
						  	});
		    		}else{
						return res.json({error:lang['MessageAppGlobalErreur'], code : 'PU0013'})
		    		}
			  	}) 
			  	.catch( e => {
					return res.json({error:lang['MessageAppGlobalErreur'], code : 'PU0011'});
			  	});
	  	}) 
	  	.catch( e => {
			return res.json({error:lang['MessageAppGlobalErreur'], code : 'PU0010'});
	  	});

}