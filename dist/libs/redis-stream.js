"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
//ici on enregistre la liste des stream 
var allstream = {};
//ouvrire un stream 
function openStream(id, stream) {
    if (!allstream[id]) {
        allstream[id] = stream;
    }
    return true;
}
exports.openStream = openStream;
function openFile(id, path) {
    id = 'file' + id;
    if (!allstream[id]) {
        allstream[id] = path;
    }
    return true;
}
exports.openFile = openFile;
//récupération de stream s'il existe 
function isStream(id, stream) {
    if (allstream[id]) {
        return true;
    }
    return false;
}
exports.isStream = isStream;
//supression du stream s'il existe 
function closeIsStream(id) {
    //Vérifier si le stream existe et s'il existe, il faut le stoper 
    if (allstream[id] && allstream[id].destroy) {
        allstream[id].destroy();
        allstream[id] = null;
        return;
    }
    else if (allstream[id] && allstream[id].close) {
        allstream[id].close();
        allstream[id] = null;
        return;
    }
    return true;
}
exports.closeIsStream = closeIsStream;
function deleteFile(id) {
    closeIsStream(id);
    id = 'file' + id;
    allstream[id] = null;
    delete allstream[id];
    return true;
}
exports.deleteFile = deleteFile;
function closeIsFile(id) {
    closeIsStream(id);
    id = 'file' + id;
    if (!allstream[id] || (allstream[id] && fs.existsSync(allstream[id]) && fs.unlinkSync(allstream[id]))) {
        return true;
    }
    return false;
}
exports.closeIsFile = closeIsFile;
