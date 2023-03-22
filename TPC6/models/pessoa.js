var mongoose = require("mongoose");

var pessoaSchema = new mongoose.Schema({
        nome: String,
        idade: Number,
        morada: {
            type: Map,
            of: String
        },
        BI: String,
        CC: String,
        profissao: String,
        partido_politico: {
            type: Map,
            of: String
        },
        religiao: String,
        desportos: [String],
        animais: [String],
        figura_publica_pt: [String],
        marca_carro: String,
        destinos_favoritos: [String],
        atributos: {
            type: Map,
            of: String
        },
        _id: String
});

module.exports = mongoose.model('pessoa', pessoaSchema);


    