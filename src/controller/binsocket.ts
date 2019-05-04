let BinaryServer = require('binaryjs').BinaryServer;
let wav = require('wav');
let path = require('path') ; 
import { DBInterface } from '../interface/DBInterface'; 

module.exports = function ( server , db : DBInterface , str ) {
	let { Note , Vocaux } = db as DBInterface ; 
	let binsocket = BinaryServer({ server , port: 9001 });
	//lors du connexion au socket pour de transfère de fichier binaire 
	binsocket.on('connection', async function(client) {
		//récupération des différents paramètre de l'URL
		let { unique , type , typeId , contactId } = require('url').parse( "http://bin.fr/so/"+client._socket.upgradeReq.url,true).query;  
		if( !unique ) return ; 
		//ici si le stream est déja crée, on le supprime car si non impossible d'écrasé le fichier 
		str.closeIsStream( unique ) ; 
		//on recrée le fichier 
		let nameFile = unique+ '.wav' ; 
		let pathFile = path.join(__dirname, '../','/notes/') + nameFile ;  
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
				str.openFile( unique , pathFile )
		      	fileWriter = null ; 
		    });
		});
		client.on('close', async function() {
			if ( fileWriter && fileWriter.end) {
				//on stope le stream de trashpère de biniare 
				fileWriter.end();
		      	fileWriter = null ; 
			}
			str.closeIsFile( unique )
	  	});
	});
};