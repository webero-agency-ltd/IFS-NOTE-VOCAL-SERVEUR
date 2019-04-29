import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
const site = require('../config/site') ;

module.exports = function ( req:Request, res:Response ) { 
	let lang = req.lang() ; 
	res.render( 'index.ejs',{ lang:JSON.stringify(res.locals.lang), urlapplication:site.urlapp } ) 
};