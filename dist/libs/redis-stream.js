"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//ici on enregistre la liste des stream 
var allstream = {};
//ouvrire un stream 
function openStream(id, stream) {
}
exports.openStream = openStream;
//stoper et supression un stream 
function closeStream(argument) {
}
exports.closeStream = closeStream;
//récupération de stream s'il existe 
function isStream(argument) {
}
exports.isStream = isStream;
//supression du stream s'il existe 
function closeIsStream(key) {
    //Vérifier si le stream existe et s'il existe, il faut le stoper 
    if (allstream[key]) {
        allstream[key].destroy();
    }
    //supression du key dans redis
}
exports.closeIsStream = closeIsStream;
