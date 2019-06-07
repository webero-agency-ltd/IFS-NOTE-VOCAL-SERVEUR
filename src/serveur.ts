import { Request , Response }  from 'express' ; 
import express from 'express' ;  
import { createModels } from './models';
import { DBInterface } from './interface/DBInterface';
import hash from './libs/hash' ;
const path = require('path') ;    
const http = require('http') ;
const https = require('https') ;
const fs = require('fs');
const str = require('./libs/redis-stream');
const site = require('./config/site') ; 
const app = express() ;  

app.set('views', path.join(__dirname, 'resources/views'));
app.set('view enginer','ejs') ;

let { env } = site ; 
let openfile = [] ; 

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
	    	global['db'] = db ; 
	      	// si l'utilisateur admin n'existe pas alors on le crée 
	      	if (!dbUser) {
		        let fullname = 'admin' ; 
				let email = 'admin@gmail.com' ; 
				let role = 'admin' ; 
				let password = await hash('-Paspgkksyh@shgsp.kjhsn') ; 
				User.create({fullname,email,password,role})
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
		await require('./middleware/index')(app,db) ; 
	}
	async route(){
		//initialisation des différents routes de l'applications 
		let route = await require('./route/index')(app,db,str) ; 
		let server ; 
		if ( env !=='prod' ) {
			server = http.createServer( app ).listen(this.port, () => {
				console.log('le serveur dev sur le port',this.port)
			});
		}else{
			//création du serveur en http et redirection a https si on essayer d'accer a cette url 
			http.createServer(function(req, res) {   	
			    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
			    res.end();
			}).listen(80);
			let options = {
				key: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/privkey1.pem"),
			    cert: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/fullchain1.pem"),
			    ca: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/chain1.pem"),
			    /*
					key: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/privkey1.pem"),
				    cert: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/fullchain1.pem"),
				    ca: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/chain1.pem"),
				*/
			};
			server =  https.createServer(options, app).listen(443, () => {
				console.log('----- le serveur prod sur le port',443)
			});
		}
		this.socket( server ) ; 
	}
	//lancement d'un serveur de websoket 
	socket( server ){
		//require('./controller/binsocket')( server , db , str ) ; 
	}
} 
