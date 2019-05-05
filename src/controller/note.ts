import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
const path = require('path') ; 
const fs = require('fs') ; 
const Busboy = require('busboy');

//liste de tout les notes d'un utilisateur en particulier 
//@todo : il faut bien avoire une session pour faire la recherche pour ne pas afficher tout les notes 
//d'un utilisateur qui n'est pas la votre
export function index( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id } = req.params  ;
	let { Infusionsoft , User } = this.db as DBInterface ;
	Infusionsoft.findOne({
	    where: { id }
    })
    	.then( i => {
	    	i.getNotes()
		    	.then( notes => {
			    	res.json(notes)
				})
				.catch(e => {
					console.log( e )
					res.json({ error : true } )
				});
		})
		.catch(e => res.json({ error : true } ));
}

//Récupération de informations d'un note en particuler 
export function item( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { Note , User } = this.db as DBInterface ;
	let { id } = req.params  ;
	let { token } = req.query ; 
	User.findOne({
	    where: { rememberToken : token }
    })
    	.then( u => {
	    	if ( u ) {
	    		Note.findOne({
				    where: { unique : id }
			    })
				    .then( n => {
				    	res.json( n )
					})
					.catch( e => res.json({ error : true } ) );
	    	}else{
	    		res.json({ error : true } )
	    	}
		})
		.catch(e => res.json({ error : true } ));
}

/*
* 	si le fichier dans l'URL n'est pas enregistré, on le suprime 
*/
export function close( req:Request, res:Response ) {
	let { id } = req.params ;  
	if ( id && this.str.closeIsFile( id ) ) {
		return res.json({success:true}) ;
	}
	res.json({error:true}) ;
}

//supression d'un note dque l'on vient juste d'enregistré 
export function deleteNote ( req:Request, res:Response ) {
	let lang = req.lang() ;
	let { id } = req.params ;  
	if ( id && this.str.closeIsStream( id ) ) {
		let nameFile =  id+'.wav' ;
		let filePath = path.join(__dirname, '../','/notes/') + nameFile ; 
		if (fs.existsSync( filePath ) && fs.unlinkSync( filePath )) {
		    return res.json({success:true}) ;
		}
	}
	res.json({error:true}) ;
}

//écouter un note en particuler 
export function listen( req:Request, res:Response ) {
	//@todo : bien entendue, il faut faire la vérification si vous avez le droit 
	//d'écouter ou non le contenu de cette notes 

	//écouter une note en particulier 
	let lang = req.lang() ; 
	let { id } = req.params ; 
	if ( id ) {
		//Le filename représente l'ID du fichier 
		let nameFile =  id+'.wav' ;
		let filePath = path.join(__dirname, '../','/notes/') + nameFile ; 
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

//enregistrement d'un note en particuler 
export function save( req:Request, res:Response ) {
	let { User, Note , Infusionsoft } = this.db as DBInterface ;
	let { id } = req.params ;  
	let { token , typeId } = req.query ; 
	let { title , text , type } = req.body ; 
	this.str.deleteFile( id )
	//check if note existe	
	//si c'est le cas, on selectionne la note, et on met a jour tout simplement les informations
	//comme la durée et la nouvelle format 
	Note.findOne( { where: { unique : id } } )
		.then(n => {
			if ( !n ) {
				Infusionsoft.find( { where: { urlid : typeId } } )
					.then(i => {
						if ( i ) {
							User.find({
							    where: { rememberToken : token } ,
							})
								.then(user => {
									Note.create({ title , text , unique :  id , type })
										.then(n => {
											n.setAuthor( user )
											n.setInfusionsoft( i ) ; 
											res.json({success:true})
										})
										.catch( e => res.json({error:true}) );
								})
								.catch( e => res.json({error:true}) );
						}else{
							res.json( {error : true} )
						}
					})
					.catch( e => res.json({ error : true }) );
			}else {
				n.update( { text } )
					.then(n => {
						res.json({success:true})
					})
				.catch( e => res.json({ error : true }) );
			}
		})
		.catch( e => res.json({ error : true }) );
}

//uploade d'un audion pour l'enregistré dans vos notes  
export function upload( req:Request, res:Response ) {
	let { unique , type , typeId , contactId } = req.query ; 
	if ( unique ) {
		this.str.closeIsStream( unique ) ;
	}
	let busboy = new Busboy({ headers: req.headers });
	let filePath = path.join(__dirname, '../' , '/notes/') + unique + '.wav' ; 
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
	    file.pipe(fs.createWriteStream(filePath)); 
	})
	busboy.on('finish', async () => {	
		this.str.openFile( unique , filePath )
        res.status(200).json({ 'message': "File uploaded successfully." });
    });
    return req.pipe(busboy);
}