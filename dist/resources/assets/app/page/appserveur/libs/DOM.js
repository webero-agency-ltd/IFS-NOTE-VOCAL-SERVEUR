"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function edittask() {
    //selection du boutton qui permet d'ajouter des notes dans ifs
    return {
        taskcontent: $('#Task0ActionDescription_data'),
        noteSave: $('#Save'),
        SaveAndNew: $('#SaveAndNew'),
        notesCreation: $('#Task0CreationNotes'),
    };
}
exports.edittask = edittask;
//selction des dom qui est relier au recorder 
function editnote() {
    //selection du boutton qui permet d'ajouter des notes dans ifs
    return {
        btnAddNote: $('#template').parents('.fieldContainer'),
        actionType: $('#actionType'),
        sujet: $('#subject'),
        noteSave: $('#noteSave'),
    };
}
exports.editnote = editnote;
//selection des dom de l'élement recorder 
function recorder() {
    //selection du boutton qui permet d'ajouter des notes dans ifs
    return {
        btnRun: $('#run-recorded'),
        btnDelete: $('#delete-recorded'),
        noteSave: $('#noteSave'),
        logoRecorder: $('#logo-recorded'),
        listenContent: $('#pre-ecoute-vocaux'),
        audioUpload: $('#audio-upload'),
        audioUploadBtn: $('#upload-file-btn'),
    };
}
exports.recorder = recorder;
