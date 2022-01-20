"use strict";

const fs = require('fs');
const path = require('path');
const http = require('http');
const staticBasePath = './';
const PORT = process.env.PORT || 5500;

const staticServe = function (req, res) {
    let resolvedBase = path.resolve(staticBasePath);
    let safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    let fileLoc = path.join(resolvedBase, safeSuffix);
    fs.readFile(fileLoc, function (err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }
    res.statusCode = 200;
    res.write(data);
    return res.end();
    });
};

const httpServer = http.createServer(staticServe);

httpServer.listen(PORT, () => {
    console.log("server listening on port " + PORT);
});