var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
    var pedido = url.parse(req.url,true).pathname
    if(pedido === "/"){
        fs.readFile('index.html', function(err, data){
            //erro ou se correr td bem tem os dados
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            if(err){
                res.write("Erro na leitura do ficheiro " + err)
            }
            else {
                res.write(data)
            }
            res.end()
        })
    }
    else{
        var cidade = pedido.slice(1)
        console.log(cidade)

        fs.readFile("./cidades/" + cidade +'.html', function(err, data) {
            //erro ou se correr td bem tem os dados
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            if(err){
                res.write("Erro na leitura do ficheiro " + err)
            }
            else {
                res.write(data)
            }
            res.end()
        })

    }
}).listen(8888);

console.log("Servidor à escuta na porta 8888...");