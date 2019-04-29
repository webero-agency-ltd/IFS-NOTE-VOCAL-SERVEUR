import { Request , Response , NextFunction }  from 'express' ; 
module.exports = function ( req : Request , res : Response , next : NextFunction ) {
	if( req.session.flash ){
		res.locals.flash = req.session.flash ;  
		req.session.flash  = undefined ; 
	}
	req.flash = function ( type:string , content:any ) {
		if (req.session.flash === undefined ) {
			req.session.flash = {} ; 
		}
		req.session.flash[ type ] = content
	}
	next() ;
} 