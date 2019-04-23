import { Request , Response }  from 'express' ; 
import express from 'express' ; 
import { createModels } from './models';
import { DBInterface } from './interface/DBInterface';
import hash from './libs/hash' ;
const path = require('path') ; 
const http = require('http') ;
const https = require('https') ;
const fs = require('fs');

//ICI on lance le serveur en local ou en prod suivant le donner du varriable env 
let env = 'local' ; 
const app = express() ; 

app.set('views', path.join(__dirname, 'resources/views'));
app.set('view enginer','ejs') ;

var openfile = [] ; 

const db = createModels(require('./config/sequelize'));
db.sequelize.sync({ force: false })
	//création d'utilisateur admin lors de l'instanciation de l'application 
	.then(()=>{
		let { User } = db as DBInterface ; 
		//recherche d'abord si l'utilisateur admin n'existe pas 
		db.User.findOne({
		    where: {
		        role: 'admin'
		    }
	    }).then( async function(dbUser) {
	      	// si l'utilisateur admin n'existe pas alors on le crée 
	      	if (!dbUser) {
		        let full_name = 'admin' ; 
				let email = 'admin@gmail.com' ; 
				let role = 'admin' ; 
				let password = await hash('admin@gmail.com') ; 
				User.create({full_name,email,password,role})
					.then(user => {
						console.log('ADMIN OK')
					})
					.catch( e => console.log('ADMIN PAS OK') )
		    }
	    });
	}); 

export default class Serveur{
	readonly port: number
	constructor(port: number){
		this.port = port ;  
	}
	async start(){
		//initialisation des middleware de l'applications 
		await this.middleware();
		this.route() ; 
	}
	//Initialisation des tout les middleware de l'application 
	async middleware(){
		let cbl = require('./middleware/index') ; 
		let middleware = await cbl(app,db) ; 
	}
	async route(){
		//initialisation des différents routes de l'applications 
		let route = await require('./route/index')(app,db) ; 
		let server ; 
		if ( env =='local' ) {
			server = http.createServer(function(req, res) {   
			    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
			    res.end();
			}).listen(this.port, () => {
				console.log('le serveur dev sur le port',this.port)
			});
		}else{
			//création du serveur en http et redirection a https si on essayer d'accer a cette url 
			http.createServer(function(req, res) {   
			    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
			    res.end();
			}).listen(80);
			var options = {
				key: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/privkey1.pem"),
			    cert: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/fullchain1.pem"),
			    ca: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/chain1.pem"),
			};
			server =  https.createServer(options, app).listen(this.port, () => {
				console.log('le serveur prod sur le port',this.port)
			});
		}
		this.socket( server ) ; 
	}
	//lancement d'un serveur de websoket 
	socket( server ){
		let BinaryServer = require('binaryjs').BinaryServer;
		let binsocket = BinaryServer({ server , port: 9001 });
		//lors du connexion au socket pour de transfère de fichier binaire 
		binsocket.on('connection', async function(client) {

			//récupération des différents paramètre de l'URL
			let { id , type , typeId , contactId } = require('url').parse( "http://css.fr/socket/"+client._socket.upgradeReq.url,true).query;  
			console.log('new connection---', id , type , typeId , contactId  );
			if( !id ) return ; 
			let index = null ;
			
			let deletefile = openfile.filter( function ( e , i ) {
				index = i ; 
				return e.id==id?true:false;
			});

			if ( deletefile.length ) {
				console.log('------------DELETE STREAM');
				deletefile[0].stream.destroy();
				openfile.splice(index, 1);
			}

		});
	}
} 
