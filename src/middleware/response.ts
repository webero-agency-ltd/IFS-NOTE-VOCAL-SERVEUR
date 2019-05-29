import { Request , Response , NextFunction }  from 'express' ; 
module.exports = function ( req : Request , res : Response , next : NextFunction ) {
	
	let lang = req.lang() ; 
	res.error = function ( id:string , code = 200 , data = {} ) {
		return res.status(code).json({
			id , 
			message : lang['errors'][id] ? lang['errors'][id] : id ,
			data , 
			type : 'ERROR' ,
		});
	} 

	res.success = function ( data , id = '' ) {
		return res.status(200).json({
			id , 
			message : lang['success'][id] ? lang['success'][id] : '' ,
			data : data?data:{ success:true } , 
		}); 
	} 

	next() ;

} 