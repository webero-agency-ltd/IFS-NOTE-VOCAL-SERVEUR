export default function base_url( location ){
   	var base_url = location.origin;
	var host = location.host;
	var pathArray = location.pathname.split( '/' );
	return pathArray.filter( e => e )
}