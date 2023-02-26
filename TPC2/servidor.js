var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
    var pedido = url.parse(req.url,true).pathname
    if(pedido === "/"){
        fs.readFile('index.html', (err, html) => {

            if (err) {
                res.writeHead(500);
                res.write("Erro na leitura do ficheiro " + err)
            }

            else {

                fs.readFile('style.css', (err, css) => {

                    if (err) {
                        res.writeHead(500);
                        res.write("Erro na leitura do ficheiro " + err)
                    }

                    else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(html);
                        res.write(`<style>${css}</style>`);
                        res.end();
                    }
                })
            }
        })
    }
    else{
        var cidade = pedido.slice(1)
        console.log(cidade)

        
        fs.readFile("./cidades/" + cidade +'.html', function(err, html) {
            //erro ou se correr td bem tem os dados
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            if(err){
                res.writeHead(500);
                res.write("Erro na leitura do ficheiro " + err)
            }
            else {
                fs.readFile('stylecities.css', (err, css) => {

                    if (err) {
                        res.writeHead(500);
                        res.write("Erro na leitura do ficheiro " + err)
                    }

                    else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(html);
                        res.write(`<style>${css}</style>`);
                        res.end();
                    }
                })
            }
            
        })

    }
}).listen(8888);

console.log("Servidor à escuta na porta 8888...");