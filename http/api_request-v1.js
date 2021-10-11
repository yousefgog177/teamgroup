let express = require('express')
let http = require('http')
let wss = require('ws')
let bodyParser = require('body-parser');
let fs = require('fs')
let app = express()
const server = new http.createServer(app);
let ws = new wss.Server({ server });

server.listen(3000)
app.use(bodyParser.json());

let Eris = require('eris')
        const requests = fs.readdirSync(`./api_requests-1/`).filter(file => file.endsWith(".js"));


    fs.readdirSync("./api_requests-1/").forEach(dir => {
        const requests = fs.readdirSync(`./api_requests-1/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of requests) {
            let request = require(`../api_requests-1/${dir}/${file}`);
if(request.method && request.path){
app[request.method](request.path , (req , res) =>{
return request.run(req , res)
})
}} 

})
