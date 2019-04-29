const site = require('./config/site') ;
import Serveur from './serveur' ; 
//@TODO : on change le port si on fait npm run dev ou prod
const serv = new Serveur(site.port) ; 
serv.start() ; 