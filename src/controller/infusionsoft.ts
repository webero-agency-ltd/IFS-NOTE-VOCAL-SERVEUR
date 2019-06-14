import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import to from '../libs/promise';
const site = require('../config/site') ;
const request = require('request');
const querystring = require('querystring');
const infusionsoft = require('../libs/infusionsoft');

export async function membre( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { id } = req.params ; 
	res.success( await infusionsoft.membre( id ) ) ; 

}

export async function notes( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { token , appId } = req.query ; 
	let { id } = req.params ; 
	res.success( await infusionsoft.notes( appId , id ) ) ; 

}

export async function contacts( req:Request, res:Response ) {

	let lang = req.lang() ; 
	let { Application , User , Team } = this.db as DBInterface ;
	let { id } = req.params ; 
	res.success( await infusionsoft.contacts( id ) ) ; 
	
}

