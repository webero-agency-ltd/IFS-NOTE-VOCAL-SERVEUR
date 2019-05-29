import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
const site = require('../config/site') ;

export function index( req:Request, res:Response ) {
	let lang = req.lang() ; 
	res.render( 'index.ejs',{ lang:JSON.stringify(res.locals.lang), urlapplication:site.urlapp, portapplication:site.port } )
}

export function vocalNote( req:Request, res:Response ) {
	let lang = req.lang() ; 
	res.render( 'noteVocal.ejs' ,{ lang:JSON.stringify(res.locals.lang), urlapplication:site.urlapp, portapplication:site.port } ) 
}
