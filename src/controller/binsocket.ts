let BinaryServer = require('binaryjs').BinaryServer;
let stream = require('../libs/redis-stream');
let wav = require('wav');
let path = require('path') ; 
import { DBInterface } from '../interface/DBInterface';

module.exports = function ( server , db : DBInterface ) {
	let { Note , Vocaux } = db as DBInterface ; 
	let binsocket = BinaryServer({ server , port: 9001 });
	//lors du connexion au socket pour de transfère de fichier binaire 
	binsocket.on('connection', async function(client) {
		//récupération des différents paramètre de l'URL
		let { md5 , type , typeId , contactId } = require('url').parse( "http://bin.fr/so/"+client._socket.upgradeReq.url,true).query;  
		console.log('new connection---', md5 , type , typeId , contactId  );
		if( !md5 ) return ; 
		//ici si le stream est déja crée, on le supprime car si non impossible d'écrasé le fichier 
		stream.closeIsStream( md5 ) ; 
		//on recrée le fichier 
		let nameFile = md5+ '.wav' ; 
		let pathFile = path.join(__dirname, '/notes/') + nameFile ; 
		//écrire le fichier base wav dans la quelle le note serait enregistré 
		var fileWriter = new wav.FileWriter( pathFile , {
	    	channels: 1,
	    	sampleRate: 48000,
	    	bitDepth: 16
	  	});
		//si l'utilisateur recoive un stream audio cette évenement est lancer  
		client.on('stream', function(stream, meta) {
			stream.pipe(fileWriter);
		    stream.on('end', async function() {
		      	fileWriter.end();
		      	console.log('Close file End file ' + nameFile);
				//création du note vocaux apres avoire stoper correctement l'enregistrement  
				Vocaux.create({
					path : pathFile , 
					size : '10 000 ko' ,
					md5 
				})
		    });
		});
		client.on('close', async function() {
			//on stope le stream de trashpère de biniare 
			fileWriter.end();

	  	});
	});
};