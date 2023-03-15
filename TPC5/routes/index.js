var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')
var User = require('../controllers/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.getTasks().then(tarefas =>{
    var max = 0;
    for(let i = 0; i < tarefas.length; i++){
      if(parseInt(tarefas[i].id) > max) max = parseInt(tarefas[i].id);
    }
    max++;

    User.getUsers().then(users => {
      var maxUser = 0;
      for(let i = 0; i < users.length; i++){
          if(parseInt(users[i].id) > maxUser) maxUser = parseInt(users[i].id);
      }
      maxUser++;
      users.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
      });
      res.render('index', {t: tarefas, u: users, mT: max, mU: maxUser});
    }).catch(erro =>{
      res.render('error', {error: erro, message: "Erro na obtenção da lista de usuários"})
    })
  })
  .catch(erro =>{
    res.render('error', {error: erro, message: "Erro na obtenção da lista de tarefas"})
  })
});


/* Get edit task page*/
router.route('/tasks/edit/:id').get(function(req,res,next) {
  Task.getTask(req.params.id)
    .then(t => {
      
      User.getUsers().then(u => {    
        res.render('editTask', {task: t, users: u});
      }).catch(erro =>{
        res.render('error', {error: erro, message: "Erro na obtenção da lista de usuários"})
      })
      
    })
    .catch(erro =>{
      res.render('error', {error: erro, message: "Erro na obtenção da tarefa"})
    })
  
}).post(function(req,res,next) {
  Task.editTask(req.body).then(task => {
    res.redirect('/')
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro na atualização da tarefa"})
  })
});

router.get('/tasks/delete/:id', function(req,res,next) {
    Task.deleteTask(req.params.id)
    .then(task =>{
      res.redirect('/');
    })
    .catch(erro =>{
      res.render('error', {error: erro, message: "Erro na obtenção do registo do aluno"})
    })
})

router.get('/tasks/done/:id', function(req,res,next) {
  Task.getTask(req.params.id).then(task =>{
    Task.checkTask(task).then(task => {
      res.redirect('/');
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao completar tarefa"})
    })
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro na obtenção da tarefa"})
  })
})

router.post('/tasks/registo', function(req,res,next) {
  Task.addTask(req.body)
  .then(task =>{
    res.redirect('/');
  })
  .catch(erro =>{
    res.render('error', {error: erro, message: "Erro ao adicionar tarefa"})
  })
})

router.post('/users/registo', function(req,res,next) {
  User.addUser(req.body)
  .then(user =>{
    res.redirect('/');
  })
  .catch(erro =>{
    res.render('error', {error: erro, message: "Erro ao adicionar usuário"})
  })
})


module.exports = router;
