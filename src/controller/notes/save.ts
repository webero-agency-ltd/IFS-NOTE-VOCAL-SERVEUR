import { Request , Response }  from 'express' ; 
import { DBInterface } from '../../interface/DBInterface';

module.exports = function ( req:Request, res:Response ) {
	
	let { User, Note } = this.db as DBInterface ;
	// Récumération des informations de l'utilisateur 

	/*
	Note.create({
		title : 'TEXT ELEMENTAIRE SELECT ICI TITLE' , 
		text : 'TEXT ELEMENTAIRE SELECT ICI DESCRIPTION' ,
	})
	*/

	User.find({
	    where: { id: 1 } ,
	    include: [{
		    model: Note,
		}]
	})
	.then(user => {
		console.log( user ) ; 
		console.log( '-----------------------' ) ; 
		console.log( '-----------------------' ) ; 
		console.log( '-----------------------' ) ; 
		user.getNotes().then(notes => {
			console.log( notes[0].id )
		});

		return ;
		Note.find({ where: { id: 1 } })
		.then(note => {
			user.addNote( note )
			
		})
		 
	  	res.render( 'index.ejs' ) 
	})
	.catch( e => res.render( 'index.ejs' ) );

	//création des vocaux 

	//création des notes et association des notes au vocaux 
};

