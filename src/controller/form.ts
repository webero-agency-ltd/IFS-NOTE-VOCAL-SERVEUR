import { Request , Response }  from 'express' ; 
import to from '../libs/promise';

var form = require('../libs/form');

/*
 *	Création du formulaire s'il n'existe pas 
 * 	et modification des valeurs s'il existe 
*/
export async function create( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { data } = req.body ; 
	let { id } = req.params  ;
	//vérification d'abord que les donners que vous avez etrer correspond bien au spécification 
	return res.success( await form.create( id , data ) );			
}

/*
 *	Récupération de formulaire d'un note donner 
*/
export async function index( req:Request, res:Response ) {
	let lang = req.lang() ; 
	let { id } = req.params  ;
	return res.success( await form.find( id ) );			
}

