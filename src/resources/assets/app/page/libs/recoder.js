/* *traitement de l'enregistrement des micro  */
import timer from './timer';
import makeid from './makeid';
import { recoder , lecteurTpl } from './tpl'
import readydom from './readydom';
import pauseall from './pauseall';
import { recorder } from './DOM' ; 

let context = null ; 
class recordClass{

	constructor( baseURL ){
		this.NOTEID = null ; 
		this.baseURL = baseURL ; 
		//si cette valeur est = true, on fait l'enregistrement automatique des flux audio au serveur  	
		this.recording = false ; 
		this.chrono = false ;
		this.dom = {} ; 
		this.urlListen = null ; 
		//fonction callback action 
		this.connexion = null ; 
		this.saveStream = null ; 
		this.stream = null ; 
		this.close = null ; 
	}
	//on demande au serveur de commencer une enregistrement 
	//si le reserveur répond OK, le backend lance une evenement 
	//connexion-soket-note-vocaux
	start( NOTEID ){
		let { audioUpload , btnRun , btnDelete , noteSave , logoRecorder , listenContent } = this.dom ; 
		//transformation des buttons du recorder 
		listenContent.html(' ') ; 
		//supression de tout les audios controller qui existe X1, X2, avec l'élement audion en question 
		let el = listenContent.find('.audio-controller') ; 
		if (el.length) {
			el.remove() ; 
		}
		//changer le logos en active, pour le rendre de couleur rouge
		logoRecorder.addClass('active') ;  
		//transformation du btn star en btn stop qui va stoper l'enregistrement de vocaux 
		btnRun.val('stop enregistrement') ; 
		btnRun.removeAttr('disabled') ;
		//désactivé le button uploader 
		audioUpload.attr('desabled','desabled') ; 
		//desactiver le buttin qui va permerter de suprmimer les notes 
		btnDelete.attr('disabled','disabled') ;
		//desactiver le button de création de note ( validation de note d'infusionsoft ), et de couleur vert
		noteSave.attr('disabled','disabled') ;
		//demande de connexion au serveur 
		this.connexion( { NOTEID : this.NOTEID , type : 'native' , typeId : '' , contactId : '' } ) ; 
	}
	stop(){
		//stop l'enregistrement 
		this.chrono.stop() ; 
		let { btnRun , btnDelete , noteSave , logoRecorder , listenContent } = this.dom ; 
		logoRecorder.removeClass('active')
		btnDelete.removeAttr('disabled') ;
		btnRun.attr('disabled','disabled') ;
		btnRun.val('Enregistrer') ; 
		//affichage du préécoute 
		//PROT+'://'+URL+PORT
		let url = this.baseURL+'/audio/'+ this.NOTEID +'/?token='+makeid(60) ;
		let tpl = lecteurTpl( url , 'audio-liste-note-recordin' ) ; 
		listenContent.html( tpl ) ; 
		listenContent.show() ;
		noteSave.removeAttr('disabled') ;
		//demande au serveur de stoper l'enregistrement 
		this.recording = false;
		this.saveStream( null )
	}
	showNote( url ){
		let { btnRun , btnDelete , noteSave , logoRecorder , listenContent } = this.dom ; 
		let tpl = lecteurTpl( url , 'audio-liste-note-recordin' ) ; 
		listenContent.html( tpl ) ; 
		listenContent.show() ;
	}
	//supression du record enregistré actuelement 
	async delete( url ) {
		pauseall() ; 
		//cacher le préécoute 
		let { btnRun , btnDelete , noteSave , logoRecorder , listenContent } = this.dom ; 
		listenContent.hide() ; 
		btnDelete.attr('disabled','disabled') ;
		btnRun.removeAttr('disabled') ;
		//rendre de nouveaux inactive la button de création de notes 
		noteSave.attr('disabled','disabled') ;		
		//supression de ce fichier dans le serveur 
		return await fetch( url )  ;
	}
	//création de ID 
	makeid( ID ){
		if ( ID ) {
			return this.NOTEID = ID ; 
		}
		return this.NOTEID = makeid(8) ;
	}
	//ajout du template du recorder ICI
	recorder(){
		//écouter ici si les elements du recorder sont tout bien enregistré au DOM 
		readydom('#recorder-template', () => {
			this.dom = recorder() ;
			if ( this.urlListen ) {
				this.showNote( this.urlListen )
			}
			//lancement des utiles par le recorder en question 
			this.event() ; 
		})
		return recoder()  ; 
	}
	//envoyer le flux de traitement a la backend de l'application  
	recorderProcess(e) {	
	    if(!this.recording) return;
	  	let left = e.inputBuffer.getChannelData(0); 
		this.stream( [...left] )
	}
	//capture le flux audio qui vient du micro
	//et faire quelque traitement 
	initializeRecorder(stream) {  	
	    let audioContext = window.AudioContext;
		context = new audioContext();
		let audioInput = context.createMediaStreamSource(stream);
		let bufferSize = 2048;
		let recorder = context.createScriptProcessor(bufferSize, 1, 1);
		recorder.onaudioprocess = this.recorderProcess.bind(this);
		audioInput.connect(recorder);
		recorder.connect(context.destination);
	}
	//initialisation du composante d'enregistrement 
	init( ID , urlListen ){

		if ( urlListen ) {
			this.urlListen = urlListen ; 
		}
		//@todo : le button vert de création de note a ajouter un attribut desabled 
		//initialisation de micro recorder 
	    navigator.getUserMedia({audio:true}, ( stream ) => {
	    	this.initializeRecorder( stream )
	    } , function(e) {
	    	alert('une erreur est survenue');
	  	});
	  	//lancement de l'initialisation du timeur 
		this.chrono = timer() ;
		this.chrono.setcallback(function ( time ) {
			document.getElementById('counter-recorded').value = time ; 
		}) 
		return this.makeid( ID ) ; 
	}

	//écoute si le backend lance une evenement connexion-soket-note-vocaux
	//cette evenement veut dire que le serveur a répondu OK et on peut commencer 
	//l'enregistrement 
	connexionSoketNoteVocaux(){
		console.log('--- START CHRONO ' , this.chrono )
		//lancement du chrono
		if ( this.chrono ) {
			this.chrono.start() ;
		}
		this.recording = true;
	}

	event(){
		let { noteSave , btnRun , btnDelete , audioUpload , audioUploadBtn , listenContent } = this.dom ; 
		btnRun.on( 'click' , async () => {
			//écouter le clique de l'enregistrement des notes vocaux 
			if ( this.recording ) 
				this.stop() ; 
			else
				this.start() ; 
		})
		btnDelete.on( 'click' , async () => {
			this.chrono.reset() ;
			let url = this.baseURL+'/audio/delete/'+ this.NOTEID ;
			this.delete( url ) ;
		})
		audioUpload.on( 'change' , async (ev) => {
			if ( ev.target.files.length ) {
				listenContent.html('') ; 
				//désactivé la button 
				audioUploadBtn.attr('disabled','disabled') ;
				//désactivé le button delete 
				btnDelete.attr('disabled','disabled') ;
				//désactivé le boutton reocerd 
				btnRun.attr('disabled','disabled') ;
				//éfacer l'enregistrement précedement fait 
				this.chrono.reset() ;
				//désactivé le button de création de note
				noteSave.attr('disabled','disabled') ;
				let formData = new FormData();
				formData.append('file', ev.target.files[0] );
				//faire l'uploade automatiquement 
				let url = this.baseURL+'/upload?unique='+this.NOTEID+'&type=infusionsoft&typeId='+config.CONFIG_PAGE.typeId+'&contactId='+config.CONFIG_PAGE.contactId  ;
				this.close( this.baseURL+'/close/'+this.NOTEID ) ; 
				let uploadResponse = await fetch( url , {
				    method: 'POST',
				    headers: {
				      	//'Content-Type': 'multipart/form-data'
				    },
				    body: formData
				})
				if ( uploadResponse.ok ) { 
					let data = await uploadResponse.json() ; 
			    	//écoute l'audio qui é été Enregistrer  
			    	let url = this.baseURL+'/audio/'+ this.NOTEID +'/?token='+makeid(60) ;
					listenContent.html(lecteurTpl( url , 'audio-liste-note-upload' )) ;
					listenContent.show() ;
					noteSave.removeAttr('disabled') ; 
			    }
			    //Tout les button son de nouveaux clicable 
				setTimeout(function () {
					//désactivé la button 
					audioUploadBtn.removeAttr('disabled') ;
					//désactivé le button delete 
					btnDelete.removeAttr('disabled') ;
					//désactivé le boutton reocerd 
					//btnRun.removeAttr('disabled') ;
				}, 1000);
			}
		})
		//ICI on veut faire l'upload de fichier 
		audioUploadBtn.on('click',function () {
			audioUpload.trigger('click') ; 
		})

	}
}
export default function recorderinstance( baseURL = '' ) {
	return new recordClass( baseURL ) ; 
}