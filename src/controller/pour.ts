import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
const url = require('url');
const request = require('request');
const site = require('../config/site') ;
import { UserAttributes, UserInstance } from '../models/user';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import to from '../libs/promise';

var pour = require('../libs/pour') ;

export async function index( req:Request, res:Response ) {	
	let lang = req.lang() ; 
	let { Pour , User , Application } = this.db as DBInterface ;
	let userid = req.user.id;  
	let { application } = req.params ; 
    return res.success( await pour.find( req.user.id , application ) );  
}

export async function delet( req:Request, res:Response ) {	
	let lang = req.lang() ; 
	let { id } = req.params ; 
    return res.success( await pour.destroy( id ) ); 
}


export async function create( req:Request, res:Response ) {	
	let lang = req.lang() ; 
    return res.success( await pour.create( req.user.id , req.body ) ); 
}