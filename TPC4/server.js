// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux function to process body

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

async function getUsers(){
    var users
    await axios.get("http://localhost:3000/users")
    .then(response => {
        
        users = response.data
        
    })
    .catch(function(erro){
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        res.write("<p>Não foi possível obter a lista de usuários... Erro: " + erro)
        res.end()
    })

    
    return users
}




// Server creation

var todolistServer = http.createServer(async function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 10)
    console.log(req.method + " " + req.url)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /tasks --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks?_sort=dueDate")
                        .then(async response => {
                            var tasks = response.data
                            var max = 0
                            for(let i = 0; i < tasks.length; i++){
                                if(parseInt(tasks[i].id) > max) max = parseInt(tasks[i].id)
                            }
                            max++

                            // Render page with to do list
                            var users = await getUsers()
                            var maxUser = 0
                            for(let i = 0; i < users.length; i++){
                                if(parseInt(users[i].id) > maxUser) maxUser = parseInt(users[i].id)
                            }
                            maxUser++

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.toDoListPage(tasks,users, max.toString(), maxUser.toString()))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                            res.end()
                        })
                }
                else if(/\/tasks\/done\/[0-9]+$/i.test(req.url)){
                    //Get task record
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let a = response.data
                            axios.put("http://localhost:3000/tasks/" + idTask, {
                                "id": a.id,
                                "what": a.what,
                                "who": a.who,
                                "dueDate": a.dueDate,
                                "done": 1,
                                "date": d,
                            }).then(resp => {
                                console.log(resp.data)
                                res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8', 'Location': '/tasks'});
                                res.end()
                                
                            }).catch(error => {
                                console.log('Erro: ' + error);
                                res.end()
                            })

                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível obter o registo da tarefa ${idTask}... Erro: ${erro}`)
                            res.end()
                        })
                                    }
                // GET /tasks/edit/id
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    //Get task record
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( async response => {
                            let a = response.data
                            console.log(a.what)
                            var users = await getUsers()
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.editTaskPage(a, users)) 
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível buscar a tarefa ${idTask}... Erro: ${erro}`)
                            res.end()
                        })
                    
                }
                else if(/\/tasks\/delete\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/tasks/' + idTask)
                    .then(resp => {
                            console.log(resp.data);
                            res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8', 'Location': '/tasks'});
                            res.end();
                    })
                    .catch(error => {
                            console.log('Erro: ' + error);
                            res.write(`<p>Não foi possível apagar o registo da tarefa ${idTask}... Erro: ${erro}`)
                            res.end()
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == "/tasks/registo"){

                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/tasks', {
                                "id": result.id,
                                "what": result.what,
                                "who": result.who,
                                "dueDate": result.dueDate,
                            }).then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(302, {'Location': '/tasks'});
                                    res.end()
                            })
                            .catch(error => {
                                console.log(result.what)
                                console.log('Erro: ' + error);
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to update task record..</p>")
                                res.end()
                            }) 
                        }
                    })
                    
                }
                else if(req.url == "/users/registo"){

                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/users', {
                                "id": result.id,
                                "name": result.name,
                                "occupation": result.occupation,
                                "email": result.email,
                            }).then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8','Location': '/tasks'});
                                    res.end()
                            })
                            .catch(error => {
                                console.log(result.what)
                                console.log('Erro: ' + error);
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to update task record..</p>")
                                res.end()
                            }) 
                        }
                    })
                    
                }
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    var idTask = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if(result){
                            
                            axios.put('http://localhost:3000/tasks/' + idTask, result)
                            .then(resp => {
                                    console.log(resp.data);
                                    res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8','Location': '/tasks'});
                                    res.end()
                            })
                            .catch(error => {
                                console.log('Erro: ' + error);
                                console.log(result)
                                console.log(result.id)
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to update task record..</p>")
                                res.end()
                            }) 
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
           
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

todolistServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



