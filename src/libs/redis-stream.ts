//ici on enregistre la liste des stream 
let allstream = {} ; 

//ouvrire un stream 
export function openStream( id , stream ) {

}

//stoper et supression un stream 
export function closeStream(argument) {

}

//récupération de stream s'il existe 
export function isStream(argument) {

}

//supression du stream s'il existe 
export function closeIsStream( key ) {
	//Vérifier si le stream existe et s'il existe, il faut le stoper 
	if ( allstream[key] ) {
		allstream[key].destroy();
	}
	//supression du key dans redis

}