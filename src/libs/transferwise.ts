var site = require('../config/site') ;
var request = require('../libs/request') ;
var AppError = require('../libs/AppError');
var application = require('../libs/application');
var team = require('../libs/team');
var user = require('../libs/user');
var json = require('../libs/json');
import paginate from '../libs/paginate' ;  
import { DBInterface } from '../interface/DBInterface';
import to from '../libs/promise';
import { TransferwiseAttributes , TransferwiseInstance } from '../models/transferwise';

/*
 * Classe de manipulation des actions vers trello 
*/
class transferwise {

	api : string  ;

	constructor() {
		this.api = 'https://api.sandbox.transferwise.tech/v1/' ; 
	}

	/*
	 * Récupération de tout les informations de transwise 
	*/
	async find( u ){
		let { Transferwise } = global['db'] as DBInterface ;
		let usr = await user.find( u ) ;
	    if (!usr) 
	    	throw new AppError('EI0001');
	    let [ err , data ] = await to( usr.getTransferwise() ) 
	    if ( err ) 
	    	throw new AppError('TWP0005');
	    data as TransferwiseInstance ;
	    return data?data:{ success:'' } ;  
	}

	/*
	 * Création de Token 
	*/
	async create( userid , name , token ){
		let usr = await user.find( userid ) ;
	    if (!usr) 
	    	throw new AppError('TWP0006');
		let { Transferwise } = global['db'] as DBInterface ;
	    //récupération externale si existe 
		let [ err , data ] = await to( Transferwise.findOne({
		    where: { UserId : userid }
	    }) ) 
	    if ( err ) 
	    	throw new AppError('TWP0007');
	    let trasferwise = data as TransferwiseInstance ;
	    if ( trasferwise ) {
	    	//ici l'option external existe, donc on fait juste la mise a jour de celle ci 
	    	return trasferwise.update( { name , token } )	
	    }
		[ err , data ] = await to( Transferwise.create( { name , token } ) ) 
	    if ( err ) 
	    	throw new AppError('TWP0008');
	   	trasferwise = data as TransferwiseInstance ; 
	    [ err , data ] = await to( usr.setTransferwise( trasferwise ) ) 
	    if ( err )
	    	throw new AppError('TWP0009');
	    return trasferwise ;
	}

	/*
	 * Récupération des profiles transferwise
	*/
	async profiles( id ){
		let headers = {
	     	'Authorization': 'Bearer ' + id
	   	}
		var { error, info , body } = await request.get( this.api + 'profiles/' , headers ) ; 
		if ( error && info.statusCode !== 200 )
	    	throw new AppError('TWP0001');
	    let reponse = json( body , {} ) ; 
		return reponse ;
	}

	/*
	 * Récupération des transfers transferwise
	*/
	async transfers( id , page = 1 ) {
		let headers = {
	     	'Authorization': 'Bearer ' + id
	   	}
		var { error, info , body } = await request.get( this.api + 'transfers' , headers ) ; 
		if ( error && info.statusCode !== 200 )
	    	throw new AppError('TWP0002');
	    let reponse = json( body , [] ) ;
	    let count = reponse.length ; 
	    let pageSize = 10 ; 
	    reponse = paginate( reponse , pageSize , page )
	    let transfers = [] ; 
	    for( let item of reponse ){
	    	let user = await this.users( id , item.user )
	    	let target = await this.accounts( id , item.targetAccount )
	    	let source = await this.accounts( id , item.sourceAccount )
	    	transfers = [ { ...item , user , source , target } ] ; 
	    } 
	    //console.log( transfers ) ; 
		return { listes : transfers , pagination : { total : count , current : page , pageSize } } ;
	}
	
	async accounts( token , id ){
		let headers = {
	     	'Authorization': 'Bearer ' + token
	   	}
		var { error, info , body } = await request.get( this.api + 'accounts/'+id , headers ) ; 
		if ( error && info.statusCode !== 200 )
	    	throw new AppError('TWP0004');
	    let reponse = json( body , {} ) ; 
		return reponse ;
	}

	async users( token , id ){
		let headers = {
	     	'Authorization': 'Bearer ' + token
	   	}
		var { error, info , body } = await request.get( this.api + 'users/'+id , headers ) ; 
		if ( error && info.statusCode !== 200 )
	    	throw new AppError('TWP0003');
	    let reponse = json( body , {} ) ; 
		return reponse ;
	}

}

module.exports = new transferwise() ; 