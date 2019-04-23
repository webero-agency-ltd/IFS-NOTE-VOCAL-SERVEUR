import Serveur from './serveur' ; 
//@TODO : on change le port si on fait npm run dev ou prod
const serv = new Serveur(3000) ; 
serv.start() ; 