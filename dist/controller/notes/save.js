"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (req, res) {
    var _a = this.db, User = _a.User, Note = _a.Note;
    // Récumération des informations de l'utilisateur 
    /*
    Note.create({
        title : 'TEXT ELEMENTAIRE SELECT ICI TITLE' ,
        text : 'TEXT ELEMENTAIRE SELECT ICI DESCRIPTION' ,
    })
    */
    User.find({
        where: { id: 1 },
        include: [{
                model: Note,
            }]
    })
        .then(function (user) {
        console.log(user);
        console.log('-----------------------');
        console.log('-----------------------');
        console.log('-----------------------');
        user.getNotes().then(function (notes) {
            console.log(notes[0].id);
        });
        return;
        Note.find({ where: { id: 1 } })
            .then(function (note) {
            user.addNote(note);
        });
        res.render('index.ejs');
    })
        .catch(function (e) { return res.render('index.ejs'); });
    //création des vocaux 
    //création des notes et association des notes au vocaux 
};
