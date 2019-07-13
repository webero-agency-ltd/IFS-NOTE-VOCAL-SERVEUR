var application = require('../libs/application');
var path = require('path') ; 
var fs = require('fs') ; 
var AppError = require('../libs/AppError');
import { NoteInstance, NoteAttributes } from '../models/note';
import to from '../libs/promise';
var user = require('../libs/user');
import { DBInterface } from '../interface/DBInterface';

class note {
	/*
	 * Création de ID de note 
	*/
	async path( where , unique ){
		console.log( where )
	    let app = await application.item( where ) 
	    if ( !app )
	    	throw new AppError('N0001');
	    let dir = path.join(__dirname, '../' , '/notes/app_'+app.id+'/' ) ;
	    if (!fs.existsSync(dir)){
		    fs.mkdirSync(dir);
		}
		return dir + unique + '.wav' ;
	}
	
	async find( id ){
		let where = {} ;
		typeof(id)=="object"?where=id:where['id']=id;
		let { Note } = global['db'] as DBInterface ;
		let [ err , data ] = await to(Note.findOne({
		    where 
	    })) 
		data as NoteInstance ;
	    return data ;  
	}

	async update( id , object ){
	    let where = {} ;
		typeof(id)=="object"?where=id:where['id']=id;
		let { Note } = global['db'] as DBInterface ;
		let [ err , data ] = await to(Note.findOne({
		    where 
	    })) 
	    console.log( '__________________' )
	    console.log( where )
	    console.log( err )
	    console.log( data )
		data as NoteInstance ;
		if ( data ) {
			console.log( 'update note ici avec les donner suivant : ' , object )  ;
			data.update( object )
		}
	    return data ;  
	}

	async delete( id ){
	    let where = {} ;
		typeof(id)=="object"?where=id:where['id']=id;
		let { Note } = global['db'] as DBInterface ;
		let [ err , data ] = await to(Note.findAll({
		    where 
	    })) 
	    if ( err )
    		throw new AppError('ND0001');
	    for( let item of data ){
	    	let [ err , data ] = await to( item.destroy() ) 
	    }
	    return true ;
	}

	/*
	 * Création de note ICI 
	*/
	async create( id , title , text , appId , type , userwhere , attache , nativeId ){

		console.log( '--CREATE NOTE IN WHERE' , id )
		let { Note } = global['db'] as DBInterface ;
		let note = await this.find( id ) ; 
		if ( !note ) {
			let where = null ; 			
			let app = await application.item( appId ) ;
		    if ( !app )  
		    	throw new AppError('N0005');
			//récupération des utilisateur courant 
			let u = await user.find( userwhere ) ;
		    if ( !u ) 
		    	throw new AppError('N0006');
		    //création du note en question et attacher le note au différent element 
		    let [ err , data ] = await to( Note.create({ title , text , unique : id.unique , type , attache , nativeId }) ) ;
		    console.log( '______________' )
		    console.log( err )
		    if ( err || !data )  
		    	throw new AppError('N0007');
		    note = data as NoteInstance ; 		
		    [ err , data ] = await to( note.setAuthor( u ) ) ;
		    [ err , data ] = await to( note.setApplication( app ) ) ;
		}else {
			console.log( 'Update de note' )
			let [ err , data ] = await to( note.update({ text }) ) ;
		    if ( err )  
		    	throw new AppError('N0004');
		    note = data ; 
			console.log( 'End Update de note' )
		}
		return note ;

	}

}

module.exports = new note() ; 