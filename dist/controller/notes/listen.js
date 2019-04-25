"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var fs = require('fs');
var stream = require('../../libs/redis-stream');
module.exports = function (req, res) {
    /*
    //écouter une note en particulier
    if (  req.param("filename") ) {
        //Le filename représente l'ID du fichier
        let nameFile =  req.param("filename")+'.wav' ;
        let filePath = path.join(__dirname, '/notes/') + nameFile ;
        if ( ! fs.existsSync( filePath ) ) {
            return res.send('Fichier pas trouver');
        }
        ////////////////////////////////////////////////////
        let stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;
        const id = req.param("filename") ;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;
            const chunksize = (end - start) + 1;
            let readStream = fs.createReadStream(filePath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            stream.openStream( id , readStream )
            readStream.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            let stream = fs.createReadStream(filePath)
            stream.openStream( id , stream )
            stream.pipe(res);
        }
        ////////////////////////////////////////////////////
        return true;
    }
    // ici le fichier n'est pas trouver
    return res.send('Fichier pas trouver');
    */
};
