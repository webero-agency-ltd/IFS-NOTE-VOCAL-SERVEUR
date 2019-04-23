"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (req, res) {
    //écouter une note en particulier 
    if (req.param("filename")) {
        //Le filename représente l'ID du fichier 
        var nameFile = req.param("filename") + '.wav';
        var filePath = path.join(__dirname, '/notes/') + nameFile;
        if (!fs.existsSync(filePath)) {
            return res.send('Fichier pas trouver');
        }
        ////////////////////////////////////////////////////
        stat = fs.statSync(filePath);
        var fileSize = stat.size;
        var range = req.headers.range;
        var id_1 = req.param("filename");
        if (range) {
            var parts = range.replace(/bytes=/, "").split("-");
            var start = parseInt(parts[0], 10);
            var end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;
            var chunksize = (end - start) + 1;
            var readStream = fs.createReadStream(filePath, { start: start, end: end });
            var head = {
                'Content-Range': "bytes " + start + "-" + end + "/" + fileSize,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            var is = openfile.filter(function (e) { return e.id == id_1 ? true : false; });
            if (is.length == 0) {
                openfile.push({ id: id_1, stream: readStream });
            }
            readStream.pipe(res);
        }
        else {
            var head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            var stream = fs.createReadStream(filePath);
            var is = openfile.filter(function (e) { return e.id == id_1 ? true : false; });
            if (is.length == 0) {
                openfile.push({ id: id_1, stream: stream });
            }
            stream.pipe(res);
        }
        ////////////////////////////////////////////////////
        return true;
    }
    // ici le fichier n'est pas trouver 
    return res.send('Fichier pas trouver');
};
