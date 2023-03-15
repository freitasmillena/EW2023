var axios = require('axios')

//Student list
module.exports.getUsers = () => {
    return axios.get('http://localhost:3000/users')
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

module.exports.addUser = (user) => {
    return axios.post('http://localhost:3000/users', user)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}