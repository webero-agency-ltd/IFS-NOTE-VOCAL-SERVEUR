import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import forearch from '../libs/forearch';
const path = require('path') ; 
const fs = require('fs') ; 
const Busboy = require('busboy'); 
var note = require('../libs/note'); 
var user = require('../libs/user'); 
var application = require('../libs/application'); 
var AppError = require('../libs/AppError');

export async function itemNativeId( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id , attache } = req.params  ;
	console.log( '--- itemNativeId ' ,  id  , attache )
	return res.success( await note.find( { nativeId : id , attache } ) );
}

export async function itenUnique( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { unique } = req.params  ;
	console.log( '--- itenUnique ' )
	return res.success( await note.find( { unique } ) );
}

//liste de tout les notes d'un utilisateur en particulier 
//@todo : il faut bien avoire une session pour faire la recherche pour ne pas afficher tout les notes 
//d'un utilisateur qui n'est pas la votre
export function index( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id } = req.params  ;
	let { Application , User } = this.db as DBInterface ;
	Application.findOne({
	    where: { id }
    })
    	.then( i => {
	    	i.getNotes()
		    	.then( notes => {
			    	res.success(notes)
				})
				.catch(e => {
					console.log( e )
					res.json({ error : true } )
				});
		})
		.catch(e => res.json({ error : true } ));
}

//Récupération de informations d'un note en particuler 
export async function item( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { Note , User } = this.db as DBInterface ;
	let { id } = req.params  ;
	let { apiKey } = req.query ; 
	let u = await user.find( { rememberToken : apiKey } ) ; 
	if ( !u && !req.user )
		throw new AppError('EN0009');
	console.log( { unique : id } )
	return res.success( await note.find( { unique : id } ) );
}

//écouter un note en particuler 
export async function listen( req:Request, res:Response ) {
	//@todo : bien entendue, il faut faire la vérification si vous avez le droit 
	//d'écouter ou non le contenu de cette notes 
	//écouter une note en particulier 
	let lang = req.lang() ; 
	let { id } = req.params ; 
	if ( id ) {
		//application
		let n = await note.find( { unique : id } ) ;
		if ( !n ) 
		    throw new AppError('EN0008');
		let filePath = await note.path( { id : n.ApplicationId } , id ) ;
		if ( ! fs.existsSync( filePath ) ) {
			return res.send(lang['filesnoteimpty']);
		}
	    ////////////////////////////////////////////////////
	    let stat = fs.statSync(filePath);
	    const fileSize = stat.size;
	    const range = req.headers.range;
	    if (range) {
		    const parts = range.replace(/bytes=/, "").split("-");
		    const start = parseInt(parts[0], 10);
		    const end = parts[1] 
		        ? parseInt(parts[1], 10)
		        : fileSize - 1;
		    const chunksize = (end - start) + 1;
		    let readStream = fs.createReadStream(filePath, { start, end });
		    const head = {
		        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
		        'Accept-Ranges': 'bytes',
		        'Content-Length': chunksize,
		        'Content-Type': 'video/mp4',
		    };
		    res.writeHead(206, head);
		    this.str.openStream( id , readStream )
		    readStream.pipe(res);
	    } else {
		    const head = {
		        'Content-Length': fileSize,
		        'Content-Type': 'video/mp4',
		    };
	      	res.writeHead(200, head);
	      	let stream = fs.createReadStream(filePath)
		    this.str.openStream( id , stream )
	      	stream.pipe(res);
	    }
	    ////////////////////////////////////////////////////
	    return true; 
	}
	// ici le fichier n'est pas trouver 
	return res.send(lang['filesnoteimpty']);
}

export async function check( req:Request, res:Response ) {
	let { id } = req.params ;  
	let where = { $like: '%' + decodeURIComponent( id ) + '%' } ; 
	let n = await note.find({ where })
	if ( n ) {
		return  res.success( n )
	}
	return  res.success([]) ;
}

//uploade d'un audion pour l'enregistré dans vos notes  
export async function upload( req:Request, res:Response ) {
	 
	let { NOTEID , update , file , type , appId , newId , title , text, apiKey , attache , nativeId } = req.query ; 
	let busboy = new Busboy({ headers: req.headers });
	console.log( 'upload : ---------------------------------' , file , NOTEID )
	let filePath = await note.path( { id : appId } , NOTEID ) ;
	console.log( filePath )
	//récupération token utilisateur 
	let userwhere = {}
	if ( apiKey ) {
		userwhere = { rememberToken : apiKey }
	}else if ( req.user.id ) {
		let id = req.user.id ;
		userwhere = { id }
	}else{
		return res.error('N0002')
	}
	//si on veut faire des mise a jour et qu'il ny a pas de note vocal a modiffier mais jute 
	//des formulaire 
	console.log( '+++++++++++++++++++++++++++++' )
	console.log( update && (file == false || file == 'false') , update , file )
	if ( update && (file == false || file == 'false') ) {
		//on fait la selection des notes et on retour tout siplement cette valur
		let n = await note.create( { unique : NOTEID } , title , text , appId , type , userwhere , attache , nativeId ) 
		return res.success( n )  ;
	}

    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
		console.log( 'Pipe Upload files' )
	    file.pipe(fs.createWriteStream(filePath)); 
	})
    
	busboy.on('finish', async () => {	
		console.log( 'FINISH Upload files' )
		//upload terminer, on fait maintenant la 
		//Pour la création de notes depuis la page mobile mais spécialement pour trello  
		if ( newId && newId !== '' && newId !== null && newId !== 'null' ) {
			let newPath = await note.path( { id : appId } , newId ) ;
			let rename = await this.str.renameFile( filePath , newPath ) ; 
			if ( ! rename ) 
				return res.error('N0003')
			NOTEID = newId ; 
		}
		let y = await note.create( { unique : NOTEID , attache } , title , text , appId , type , userwhere , attache , nativeId )
        res.success( y )
    });

    return req.pipe(busboy);
}