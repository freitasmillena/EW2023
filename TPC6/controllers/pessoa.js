var Pessoa = require('../models/pessoa')

// GET /pessoas
module.exports.getPessoas = () => {
    return Pessoa.find()
        .then(dados => {
            return dados
        })
        .catch(erro => {
            return erro
        })

}

//GET /pessoas/:id
module.exports.getPessoa = id => {
    return Pessoa.findOne({_id: id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

//POST /pessoas
module.exports.addPessoa = a => {
    return Pessoa.collection.insertOne(a)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

//PUT /pessoas/:id
module.exports.updatePessoa = a => {
    return Pessoa.updateOne({_id: a._id}, a)
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

//DELETE /pessoas/:id
module.exports.deletePessoa = id => {
    return Pessoa.collection.deleteOne({_id: id})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}