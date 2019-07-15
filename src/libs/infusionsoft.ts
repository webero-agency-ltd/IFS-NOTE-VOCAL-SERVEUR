var site = require('../config/site') ;
var request = require('../libs/request') ;
const querystring = require('querystring');
var AppError = require('../libs/AppError');
var application = require('../libs/application');
var team = require('../libs/team');
var json = require('../libs/json');
var cache = require('./cache');
var faker = require('faker');
import paginate from '../libs/paginate' ;  
/*
 * Classe de manipulation des actions vers trello 
*/

class infusionsoft {
	
	api : string  ;

	constructor() {
		this.api = 'https://api.infusionsoft.com/crm/rest/v1' ; 
	}

	async createUser( id ){
	    let app = await application.item( id )
	    let jsont = json( app.accessToken , {} ) 
	    let users = []

	    //name.lastName(), name.firstName(), and name.suffix()
	    for (var i = 0; i < 500 ; ++i) {
			users = [ ...users , {
			  "given_name": faker.name.lastName(),
			  "family_name": faker.name.firstName(),
			  "email_addresses": [
				    {
				      "email": faker.internet.email(),
				      "field": "EMAIL1"
				    },
				    {
				      "email": faker.internet.email(),
				      "field": "EMAIL2"
				    }
			  	],
			}] 
	    }

	    console.log( users ) ; 

	    for( let item of users ){
	    	let header = {
		    	'Accept': 'application/json',
            	'Content-Type': 'application/json'
	    	}
	    	var { error, info , body } = await request.post( this.api + '/contacts/?access_token='+jsont['access_token'] , item , header , true ) ; 
	    	console.log( item , error , body )
	    }
	    return true;
	}

	/*
	 * Récupération des membres d'infusionsoft 
	*/
	async membre( id ){
	    let app = await application.item( id )
	    let jsont = json( app.accessToken , {} ) 
		var { error, info , body } = await request.get( this.api + '/users/?access_token='+jsont['access_token'] ) ;
		if ( error && info.statusCode !== 200 ) 
	    	throw new AppError('IM0003');
	    let reponse = json( body , {} ) ; 
		return reponse['users']?reponse['users']:[];
	}

	/*
	 * Récupération des listes des contacts d'infusionsoft 
	*/
	async contacts( id , text ='' , size = 200 , page = 1 , contact = null ){
		let app = await application.item( id )
	    let token = json( app.accessToken , {} ) 
		let contacts = await cache.get( `infusionsoft_${id}_contacts_cache` , [] ) 
		if ( contacts.length == 0 ) {
			let offset = 0 ; 
		    let total = 1000 ; 
		    let stop = false ; 
		    let reponse = { contacts : [] } ; 
			do {
				console.log( this.api + '/contacts/?access_token='+token['access_token'] + `&offset=${offset}&limit=1000` )
				var { err, info , body } = await request.get( this.api + '/contacts/?access_token='+token['access_token'] + `&offset=${offset}&limit=1000` ) ; 
				if ( err && info.statusCode !== 200 )
			    	stop = true  
		    	reponse = json( body , {} ) ; 
		    	offset = offset + 1000 ;
		    	if ( reponse['contacts'].length ){
		    		let cts = reponse['contacts'].map( e => {
		    			return { ...e , text : e['given_name'] +' '+ e['family_name'] };
		    		})
		    		contacts = [...contacts , ...cts ] 
		    	}else
			    	stop = true  
			}while( stop === false ) ;
			await cache.set( `infusionsoft_${id}_contacts_cache` , contacts )
		}
		let defaultContact = {

		}; 
		contact = parseInt( contact );
		//ici on fait la filtre du contact maintenant 
		let contactsFilter = contacts.filter( (e) => {
			if ( e.id === contact ) {
				defaultContact = { ...e } ; 
				return false;
			}
            let existe = false ; 
            if ( e.given_name.toLowerCase().indexOf( text.toLowerCase() ) !== -1 ) {
                existe = true ; 
            }
            else if ( e.family_name.toLowerCase().indexOf( text.toLowerCase() ) !== -1 ) {
                existe = true ; 
            }
            else if ( e.email_addresses && e.email_addresses.length > 0 && e.email_addresses.filter( (e) => { 
                let existe = false ; 
                if ( e.email.toLowerCase().indexOf( text.toLowerCase() ) !== -1 ) {
                    existe = true ; 
                }
                return existe 
                //@todo : ICI on fait aussi la filtre des contacts par l'intèrmidiaire des numéros de téléphone 
            }).length !== 0 ) {
                existe = true ; 
            }
            return existe ;
        });  
        //ajoute default 
        contactsFilter = [ defaultContact , ...contactsFilter ] ; 
        //Ajoute de pagination 
		return paginate( contactsFilter , size , page ) ;

	}

	/*
	 * Récupération des listes des contacts d'infusionsoft 
	*/
	async notes( id , note ) {
	    let app = await application.item( id )
	    let token = json( app.accessToken , {} ) 
	    console.log( this.api + '/notes/'+note+'/?access_token='+token['access_token'] )
	    var { error, info , body } = await request.get( this.api + '/notes/'+note+'/?access_token='+token['access_token'] ) ; 
		if ( error && info.statusCode !== 200 )
	    	throw new AppError('IC0007');
	    let reponse = json( body , {} ) ;
		return reponse.id?reponse:{};
	}

	async tasks( id , note ) {
	    let app = await application.item( id )
	    let token = json( app.accessToken , {} ) 
	    console.log( this.api + '/tasks/'+note+'/?access_token='+token['access_token'] )
	    var { error, info , body } = await request.get( this.api + '/tasks/'+note+'/?access_token='+token['access_token'] ) ; 
	   	let task = json( body , {} )
	   	if ( task && task.id ) {
	   		return task ;
	   	}
	    console.log( task );
	    var { error, info , body } = await request.get( this.api + '/users?access_token='+token['access_token'] ) ; 
	    let users = json( body , {} )	
	    let itemTask = null ;
	    if ( users['users'] &&  users['users'].length ) {
	    	for( let item of users['users'] ){
	    		if ( item.id ) {
	  				let { error, info , body } = await request.get( this.api + '/tasks/?access_token='+token['access_token'] + '&user_id=' + item.id ) ; 
	    			let task = json( body , {} )
	    			if ( task && task['tasks'] )  {
	    				let data = task['tasks'].filter( e => e.id == note )
	    				if ( data.length ) {
	    					itemTask = data[0] ;
	    				}
	    			}
	    		}
	    	}
	    }
		return itemTask && itemTask.id?itemTask:{};
	}

	/*
	 * Récupération de l'access toke  
	*/
	async findtoken( { id , code } ){
	    let redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id='+id  ;
		let url = 'https://api.infusionsoft.com/token' ; 
		let form = {
			client_id: site.clientId , 
	    	client_secret: site.clientSecret, 
	    	code , 
	    	grant_type: 'authorization_code', 
	    	redirect_uri : redirect_uri 
		};
		var { error, info , body } = await request.post( url , form ) ;
		if ( error && info.statusCode !== 200 ) 
	    	throw new AppError('ARE002')
	    await application.update( id , { accessToken: body } )
	    //récupération de l'id de l'utilisateur qui a crée le token, pour l'enregistrer 
	    //dans la base de donner des contact
	    let jsont = json( body , {} ) 
		var { error, info , body } = await request.get( this.api + '/users/?access_token='+jsont['access_token'] ) ;
		if ( error && info.statusCode !== 200 ) 
	    	throw new AppError('ARE004');
	    let reponse = json( body , {} )
		if ( reponse['users'] ) {
			await team.update( { ApplicationId : id } , { contactid: reponse['users'][0].id } ) ; 
			//apres on selectionne si cette application a un hook, si pas, on le crée
			console.log( '_____________________________________' )
			console.log( this.api + '/hooks/?access_token='+jsont['access_token'] )
			var { error, info , body } = await request.get( this.api + '/hooks/?access_token='+jsont['access_token'] ) ;
			let hooks = json( body , {} ) ; 
			let reverified = [] ; 
			let existed = [] ; 
			for( let { hookUrl , eventKey , key , status } of hooks ){
				if ( hookUrl == `https://therapiequantique.net/infusionsoft/on/${id}` && status== 'Verified' ) {
					existed = [ ...existed , { hookUrl , eventKey , key , status }]
				}else if( hookUrl == `https://therapiequantique.net/infusionsoft/on/${id}` ){
					reverified = [ ...reverified , { hookUrl , eventKey , key , status }]
				}
			}
			//revériffie 
			if ( reverified.length ) {
				console.log('-----VERIFICATION DE STATUS EN COURS------')
				for( let { hookUrl , eventKey , key , status } of reverified ){
					let form = {};
					let headers = { 'Content-Type': 'application/json' } ; 
					var { error, info , body } = await request.post( this.api + `/hooks/${key}/verify/?access_token=`+jsont['access_token'] , form , headers ) ;
					console.log( '--' , hookUrl )
				}	
			}
			console.log( existed.length , reverified.length )
			console.log( '===========================================' )
			if ( existed.length || reverified.length ) {
				console.log('-----HOOK EXISTE------')
				return true ;
			}
			let events = [
				//"appointment.add",
				//"appointment.delete",
				//"appointment.edit",
				//"company.add",
				//"company.delete",
				//"company.edit",
				"contact.add",
				"contact.delete",
				"contact.edit",
				"contact.redact",
				//"contactGroup.add",
				//"contactGroup.applied",
				//"contactGroup.delete",
				//"contactGroup.edit",
				//"contactGroup.removed",
				//"invoice.add",
				//"invoice.delete",
				//"invoice.edit",
				//"invoice.payment.add",
				//"invoice.payment.delete",
				//"invoice.payment.edit",
				//"leadsource.add",
				//"leadsource.delete",
				//"leadsource.edit",
				"note.add",
				"note.delete",
				"note.edit",
				//"opportunity.add",
				//"opportunity.delete",
				//"opportunity.edit",
				//"opportunity.stage_move",
				//"order.add",
				//"order.delete",
				//"order.edit",
				//"product.add",
				//"product.delete",
				//"product.edit",
				//"subscription.add",
				//"subscription.delete",
				//"subscription.edit",
				"task.add",
				"task.delete",
				"task.edit",
				//"user.activate",
				//"user.add",
				//"user.edit"
			]
			for( let e of events ){
				let form = {
					hookUrl: `https://therapiequantique.net/infusionsoft/on/${id}` , 
			    	eventKey: e , 
				};
				console.log( e )
				let headers = { 'Content-Type': 'application/json' } ; 
				var { error, info , body } = await request.post( this.api + '/hooks/?access_token='+jsont['access_token'] , form , headers , true ) ;
			}
			//var { error, info , body } = await request.destroy( this.api + '/hooks/8/?access_token='+jsont['access_token'] , form , headers , true ) ;
			
			console.log( body )
			console.log( json( body , {} ) ) 
			console.log( '_____________________________________' )
			return true;
		}
	    throw new AppError('ARE005');
	}

	/*
	 * Update de tache 
	*/
	async updateTasks( body , t ){
		let header = {
		    'Accept': 'application/json',
            'Content-Type': 'application/json'
	    }
	    let token = json( t , {} );
	    var { error, info , body } = await request.post( this.api + '/tasks/?access_token='+token['access_token'] , body , header , true ) ; 
		if ( error && ( info.statusCode !== 200 || info.statusCode !== 201 ) )
	    	throw new AppError('EN0005');
	    return json( body , {} );
	}

	/*
	 *	Création de tache infusionsoft 
	*/
	async createTasks( body , t ){
		let header = {
		    'Accept': 'application/json',
            'Content-Type': 'application/json'
	    }
	    let token = json( t , {} );
	    var { error, info , body } = await request.post( this.api + '/tasks/?access_token='+token['access_token'] , body , header , true ) ; 
		if ( error && ( info.statusCode !== 200 || info.statusCode !== 201 ) )
	    	throw new AppError('EN0005');
	    console.log( json( body , {} ) )
	    return json( body , {} );
	}

	/*
	 * Update des notes infusionsoft
	*/
	async updateNotes( body , t ){
		let header = {
		    'Accept': 'application/json',
            'Content-Type': 'application/json'
	    }
	    let token = json( t , {} );
	    var { error, info , body } = await request.post( this.api + '/notes/?access_token='+token['access_token'] , body , header , true ) ; 
		if ( error && ( info.statusCode !== 200 || info.statusCode !== 201 ) )
	    	throw new AppError('EN0007');
	    return json( body , {} );
	}
	
	/*
	 *	Création de notes infusionsoft 
	*/
	async createNotes( body , t ){
		let header = {
		    'Accept': 'application/json',
            'Content-Type': 'application/json'
	    }
	    let token = json( t , {} );
	    var { error, info , body } = await request.post( this.api + '/notes/?access_token='+token['access_token'] , body , header , true ) ; 
		if ( error && ( info.statusCode !== 200 || info.statusCode !== 201 ) )
	    	throw new AppError('EN0007');
	    return json( body , {} );
	}

	async destroyHook( id ){
		let app = await application.item( id )
	    let token = json( app.accessToken , {} ) 
		var { error, info , body } = await request.get( this.api + '/hooks/?access_token='+token['access_token'] ) ; 

	    let reponse = json( body , {} ) ; 
	    for( let { hookUrl , eventKey , key , status } of reponse ){
	    	var { error, info , body } = await request.destroy( this.api + '/hooks/'+key+'/?access_token='+token['access_token'] ) ; 
		}
	    return true ;
	}

}

module.exports = new infusionsoft() ; 