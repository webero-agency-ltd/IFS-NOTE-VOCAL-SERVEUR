module.exports = function json( data , place = {} ) : any {
	let jsont : any; 
	try{
		jsont = JSON.parse( data ) ; 
	}catch( e ){
		jsont = place ; 
	}
	return jsont ;
}