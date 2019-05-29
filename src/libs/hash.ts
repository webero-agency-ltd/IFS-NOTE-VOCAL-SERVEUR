const bcrypt = require('bcrypt-nodejs') ; 

export default function hash( pass ) : Promise <string> {
	return new Promise<string>( async (resolve) => { 
		var hash = bcrypt.hashSync( pass );
		resolve( hash )
	});
}