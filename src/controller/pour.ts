import { Request , Response }  from 'express' ; 
import { DBInterface } from '../interface/DBInterface';
import makeid from '../libs/makeid';
const url = require('url');
const request = require('request');
const site = require('../config/site') ;
import { UserAttributes, UserInstance } from '../models/user';
import { PourAttributes, PourInstance } from '../models/pour';
import { ApplicationAttributes , ApplicationInstance } from '../models/application';
import to from '../libs/promise';

export async function index( req:Request, res:Response ) {	

	let lang = req.lang() ; 
	let { Pour , User , Application } = this.db as DBInterface ;
	let userid = req.user.id;  
	let { application } = req.params ; 
	let err = null ; 
	let data = null ;
	data as UserInstance ;
	[ err , data ] = await to(User.findOne({
	    where: { id : req.user.id }
    })) 
    let user = data ; 
    
    data as ApplicationInstance ;
	[ err , data ] = await to(Application.find( { where: { id : application } } )) 
	if ( err || !data ) {
    	return res.error('PC0001') ; 
    }
    let i = data ; 
    
    if ( err ) {
    	return res.error('PI001') ; 
    } 
    [ err , data ] = await to(user.getPours({
	    where: { ApplicationId : application }
    }))
	if ( err ) {
    	return res.error('PI002') ; 
    } 
    return res.success( data );

}

export async function delet( req:Request, res:Response ) {	

	let lang = req.lang() ; 
	let { Pour , User } = this.db as DBInterface ;
	let userid = req.user.id;  
	let { id } = req.params ; 
	let err = null ; 
	let data = null ;
	data as PourInstance ;
	[ err , data ] = await to(Pour.findOne({
	    where: { id }
    })) 
    let p = data ; 
    if ( err ) {
    	return res.error('PD001') ; 
    } 
    if (!p) {
    	return res.error('PD002') ; 
    }
    [ err , data ] = await to(p.destroy()) 
    if ( err ) {
    	return res.error('PD003') ; 
    } 
    return res.success();

}


export async function create( req:Request, res:Response ) {	
	
	let lang = req.lang() ; 
	let { Pour , User , Application } = this.db as DBInterface ;
	let userid = req.user.id;  
	let { name , appId , cardId , type , application } = req.body ; 

	let err : any ;  
	let data  ;
	data as UserInstance ;
	[ err , data ] = await to(User.findOne({
	    where: { id : userid }
    })) 
    let user = data ; 
    data as PourInstance ;
	[ err , data ] = await to(Pour.create( { name , appId , cardId , type } )) 
    if ( err ) {
    	return res.error('PC0002') ; 
    }
    let p = data ; 
	[ err , data ] = await to(p.setAuthor( user )) 
    if ( err ) {
    	return res.error('PC0003') ; 
    }
    data as ApplicationInstance ;
	[ err , data ] = await to(Application.find( { where: { id : application } } )) 
	if ( err || !data ) {
    	return res.error('PC0001') ; 
    }
    let i = data ; 
    [ err , data ] = await to(p.setApplication( i )) 
    if ( err ) {
    	return res.error('PC0004') ; 
    }
    console.log('--------------------------')
    return res.success();  

}