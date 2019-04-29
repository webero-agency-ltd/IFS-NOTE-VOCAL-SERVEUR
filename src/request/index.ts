const costvalidate = require( 'validate.js' ) ; 

//validation des formulaires a partire des controllers 
module.exports = function ( body , rull ) {
	let constraints = require( './' + rull ) ;
	let checked = costvalidate( body , constraints ) ; 
	if ( checked && Object.keys( checked ).length > 0 ) {
		return checked 
	}else{
		return true;
	}
};