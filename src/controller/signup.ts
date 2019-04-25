import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';

//afficher la page signup
export function page( req:Request, res:Response ) {
	res.render( 'signup.ejs' ) 
}

//création de nouvelle utilisateur 
export function create( req:Request, res:Response ) {
	res.render( 'signup.ejs' ) 
}