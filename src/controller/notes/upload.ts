import { Request , Response }  from 'express' ; 
import { DBInterface } from '../../interface/DBInterface';

module.exports = function ( req:Request, res:Response ) {
	/*
	var { id , type , typeId , contactId } = req.query ; 
	var index = null ; 
	let deletefile = openfile.filter( function ( e , i ) {
		index = i ; 
		return e.id==id?true:false;
	}); 
	console.log( deletefile , openfile , id );
	if ( deletefile.length ) {
		deletefile[0].stream.destroy();
		openfile.splice(index, 1);
	}
	var busboy = new Busboy({ headers: req.headers });
	var filePath = path.join(__dirname, '/notes/') + id + '.wav' ; 
	console.log('--- START UPLOAD');
	await stores.createNote( id , filePath , type , typeId , contactId ) ; 
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
	    file.pipe(fs.createWriteStream(filePath)); 
	})
	busboy.on('finish', async function () {	
    	await stores.endNote( id ) ;
        res.status(200).json({ 'message': "File uploaded successfully." });
    });
    return req.pipe(busboy);
	*/
};