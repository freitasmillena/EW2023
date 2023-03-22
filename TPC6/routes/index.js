var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa');

/* GET home page. */
router.get('/pessoas', function(req, res, next) {
  Pessoa.getPessoas()
    .then(pessoas => {
      res.status(200).json(pessoas)
    })
    .catch(err => {
      res.status(601).json({erro: err})
    })
});

/* GET pessoa page. */
router.get('/pessoas/:idPessoa', function(req, res, next) {
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.json(pessoa)
    })
    .catch(err => {
      res.status(602).json({erro: err})
    })
});


/* GET Pessoa Delete . */
router.delete('/pessoas/:idPessoa', function(req, res, next) {
  Pessoa.deletePessoa(req.params.idPessoa)
    .then(pessoa => {
      res.json(pessoa)
    })
    .catch(err => {
      res.status(605).json({erro: err})
    })
});


router.post('/pessoas', (req,res) => {
  Pessoa.addPessoa(req.body)
  .then(pessoa => {
    res.status(201).json(pessoa)
  })
  .catch(err => {
    res.status(600).json({erro: err})
  })
})

router.put('/pessoas/:idPessoa', (req,res) => {
  Pessoa.updatePessoa(req.body)
  .then(pessoa => {
    res.json(pessoa)
  })
  .catch(err => {
    res.status(604).json({erro: err})
  })
})

module.exports = router;
