var http = require('http');
var axios = require('axios');
var url = require('url');
var myPage = require('./mypages');
var fs = require('fs');

http.createServer(function(req, res) {
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
        res.end(myPage.genOptionsPage(d))
    }
    else if(req.url === '/pessoas'){
        //http://localhost:3000/pessoas?_sort=name&_order=asc ordenado
        axios.get('http://localhost:3000/pessoas?_sort=nome')
        .then(function(resp){
            var pessoas = resp.data //lista
            
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end(myPage.genMainPage(pessoas,d))    
        })
        .catch((err)=>{
            console.log("Erro: " + err + " :(")
    
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end("<p>Erro: " + err + "</p>")
        })
    }
    else if(req.url.match(/[a-zA-Z]*w3\.css/)){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                res.write("Erro")
            }
            else {
                res.write(data)
            }
            res.end()
        })
       
    }
    else if(req.url.match(/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
        .then(function(resp){
            var pessoa = resp.data //lista
            
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end(myPage.genPessoaPage(pessoa,d))
    
        })
        .catch((err)=>{
            console.log("Erro: " + err + " :(")
    
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end("<p>Erro: " + err + "</p>")
        })
    }
    else if(req.url === '/pessoas/ordDesc'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data //lista
            let pessoasOrd = pessoas.sort(
                (p1,p2) => (p1.nome < p2.nome) ? 1 : -1
            )
            
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end(myPage.genMainPage(pessoasOrd,d))
    
        })
        .catch((err)=>{
            console.log("Erro: " + err + " :(")
    
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end("<p>Erro: " + err + "</p>")
        })
    }
    else if(req.url.match(/sexo\/[a-z]+/)){
        axios.get('http://localhost:3000/pessoas?sexo=' + req.url.substring(6))
        .then(function(resp){
            var pessoas = resp.data //lista
            
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end(myPage.genMainPage(pessoas,d))    
        })
        .catch((err)=>{
            console.log("Erro: " + err + " :(")
    
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end("<p>Erro: " + err + "</p>")
        })
    }
    else if(req.url === '/dist/sexo'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data //lista
            
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end(myPage.distSexo(pessoas,d))
    
        })
        .catch((err)=>{
            console.log("Erro: " + err + " :(")
    
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end("<p>Erro: " + err + "</p>")
        })
    }
    else if(req.url === '/dist/desporto'){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data //lista
            
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end(myPage.distDesporto(pessoas,d))
    
        })
        .catch((err)=>{
            console.log("Erro: " + err + " :(")
    
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end("<p>Erro: " + err + "</p>")
        })
    }
    else if(req.url.match(/desporto\/[a-zA-Z]+/)){
        
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data //lista
            var desporto = decodeURIComponent(req.url.substring(10))
            var lista = new Array()
            
            pessoas.forEach((p) => {
                if(p.desportos.includes(desporto)) lista.push(p)
            })
            
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end(myPage.genMainPage(lista,d))    
        })
        .catch((err)=>{
            console.log("Erro: " + err + " :(")
    
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end("<p>Erro: " + err + "</p>")
        })
    }
    else if(req.url === '/top/profissoes'){
        console.log("aqui")
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data //lista
            
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end(myPage.top10Profissoes(pessoas,d))
    
        })
        .catch((err)=>{
            console.log("Erro: " + err + " :(")
    
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end("<p>Erro: " + err + "</p>")
        })
    }
    else if(req.url.match(/profissoes\/[a-zA-Z]+/)){
        var profissao = decodeURIComponent(req.url.substring(12))
        console.log(profissao)
        axios.get('http://localhost:3000/pessoas?profissao=' + profissao)
        .then(function(resp){
            var pessoas = resp.data //lista            
            
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end(myPage.genMainPage(pessoas,d))    
        })
        .catch((err)=>{
            console.log("Erro: " + err + " :(")
    
            res.writeHead(200, {'Content-Type': 'text/html; charset: utf8'})
            res.end("<p>Erro: " + err + "</p>")
        })
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset: utf8'})
            res.end("Operação não suportada!")
    }
    
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");