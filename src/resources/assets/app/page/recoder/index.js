import recoder from '../libs/recoder'
import { BinaryClient } from 'binaryjs-client';
import { wav } from 'wav';
import recordRTC from 'recordRTC';
import makeid from '../libs/makeid';

//récupération des elements on on ajoute l'enregistreur 
let serveur = 'localhost' ; 
let url = 'http://'+serveur+':3000';
/*
function convertFloat32ToInt16(buffer) {
    let l = buffer.length;
    let buf = new Int16Array(l);
    while (l--) {
        buf[l] = Math.min(1, buffer[l])*0x7FFF;
    }
    return buf.buffer;
}

jQuery(document).ready(function($) { 

	let rec = recoder( url ) ; 
	let stream = null ;
	let client = null ; 
	let listeAfter = false ; 
	let onupload = false ; 

	rec.connexion = function ( data ) {

		if( listeAfter )
			return true

		listeAfter = true ; 
		//on veut connecter au serveur pour commencer un nouvelle notes 
    	let {
	        NOTEID , 
	        type , 
	        typeId , 
	        contactId
	    } = data  ;  
	    setTimeout(function () {
	    	client = new BinaryClient( 'ws://'+serveur+':9001?unique='+NOTEID+'&type='+type+'&typeId='+typeId+'&contactId='+contactId ) ; 
	        client.on('open', function() {
	        	stream = client.createStream();
	            rec.connexionSoketNoteVocaux() ;
	            return listeAfter = false 
	        })
	    }, 1000 );
	}

	rec.saveStream = function ( data ) {
		stream.end();
        stream = null ; 	
       
	}

	rec.stream = function ( data ) {
		let arr = new Float32Array(  data );
        stream.write(convertFloat32ToInt16( arr )); 
	}

	rec.close = function ( data ) {
		onupload = data ; 
	}

	let btnAddNote = $('#recoder-vocal-templ')
	btnAddNote.before( rec.recorder() ) ; 
	//initialisation du recoder 
	rec.init() ; 

	$(window).on("beforeunload", function() { 
		if ( !client ) 
			return false ; 
		//enregistrement avant close client 
		client.close() ;
        client = null ; 
	})

	noteSave.on('click', () => {

		let formData = new FormData();
		//@todo : récupération de tout les notes et enregistrement se fait ici. 
		let url = config.PROT+'://'+config.URL+config.PORT+'/save/'+NOTEID+'?token='+navigator.userCookie + '&typeId='+config.CONFIG_PAGE.typeId  ; 
		console.log( url ) ; 
		fetch(url , {
		    method: 'POST',
		    headers: {
		      	'Accept': 'application/json',
                'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({ type : 'note', text : generaleNote , title : generaleTitle })
		}) ;
	})

});

*/