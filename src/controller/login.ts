import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';

module.exports = function ( req:Request, res:Response ) {
	res.render( 'login.ejs' ) 
};