const fs = require('fs') ; 

//ici on enregistre la liste des stream 
let allstream = {} ; 

//ouvrire un stream 
export function openStream( id , stream ) {
	if ( !allstream[id] ) {
		allstream[id] = stream ; 
	}
	return true;
}

export function openFile( id , path ) {
	id = 'file'+id
	if ( !allstream[id] ) {
		allstream[id] = path ; 
	}
	console.log( '_________ openFile ' )
	console.log( allstream[id] )
	return true;
}

//récupération de stream s'il existe 
export function isStream( id , stream ) {
	if ( allstream[id] ) {
		return true;
	}
	return false;
}

//supression du stream s'il existe 
export function closeIsStream( id ) {
	//Vérifier si le stream existe et s'il existe, il faut le stoper 
	if ( allstream[id] && allstream[id].destroy ) {
		allstream[id].destroy();
		allstream[id] = null ; 
		delete allstream[id] ;
		return 
	}else if (  allstream[id] && allstream[id].close ) {
		allstream[id].close();
		allstream[id] = null ;
		delete allstream[id] ; 
		return 
	}
	return true ;
}

//rename fichier 
export function renameFile( ord , newf ) : Promise <boolean> {
	return new Promise<boolean>( async (resolve) => { 
		fs.rename( ord , newf , (err) => {
			if (err)
				resolve(false);
			resolve(true);
		});
	});
}

export function deleteFile( id ) {
	closeIsStream( id )
	id = 'file'+id;
	allstream[id] = null ; 
	delete allstream[id] ;
	console.log( '_________ deleteFile ' )
	console.log( allstream[id] )
	return true ;
}

export function closeIsFile( id ) {
	closeIsStream( id )
	id = 'file'+id;
	console.log( '_________ closeIsFile ' )
	console.log( allstream[id] )
	if ( !allstream[id] || (allstream[id] && fs.existsSync( allstream[id] ) && fs.unlinkSync( allstream[id] )) ) {
	    return true ;
	}
	return false;
}
