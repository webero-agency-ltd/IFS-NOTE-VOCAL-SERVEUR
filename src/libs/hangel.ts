import { Request , Response }  from 'express' ; 

export async function hangel ( req:Request, res:Response ) {
	let { func } = this ; 
	try {
		await func( req ,res )
	}catch(e) {
		console.log( e )
		res.error( e.name )
    }
}