var axios = require('axios');

const dataJson = require('./dataset-extra1.json');
for (pessoa in dataJson['pessoas']){
    axios.post('http://localhost:7777/pessoas', dataJson['pessoas'][pessoa])
        .then(resp => {
        console.log(resp.data);  
        })
        .catch(error => {
            console.log('Erro: ' + error);
        }) 
}
