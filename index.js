import express from "express";
import fs from "fs/promises";

const app = express();

app.get('/', async (request, response) => {
const fileBuf = await fs.readFile('index.html');
response.type('html');
response.send(fileBuf);

});


app.get('/*', async (request, response) => {
    try {
    const fileName = request.path;
    const fileBuf = await fs.readFile(`./${fileName}`);
    const type = fileName.split('.')[1];
    response.type(type);
    response.send(fileBuf);
    } catch (err) {
        response.status(404).end();
    }
});

/*app.get('/src/js/pages/:fileName', async (request, response) => {
   
    console.log(request.params.name);
    const fileName = request.params.fileName;
    const fileBuf = await fs.readFile(`./src/js/pages/${fileName}`);
    const type = fileName.split('.')[1];
    response.type(type);
    response.send(fileBuf);
    
});

app.get('/img/:fileName', async (request, response) => {
   
    console.log(request.params.name);
    const fileName = request.params.fileName;
    const fileBuf = await fs.readFile(`./img/${fileName}`);
    const type = fileName.split('.')[1];
    response.type(type);
    response.send(fileBuf);
    
});*/

app.listen(5080);
