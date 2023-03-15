var axios = require('axios')

var d = new Date().toISOString().substring(0, 10)

//Student list
module.exports.getTasks = () => {
    return axios.get('http://localhost:3000/tasks')
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

module.exports.getTask = (id) => {
    return axios.get('http://localhost:3000/tasks/' + id)
        .then(response => {
            console.log(id)
            return response.data
        })
        .catch(error => {
            return error
        })
}

module.exports.editTask = (task) => {
    return axios.put('http://localhost:3000/tasks/' + task.id, task)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

module.exports.deleteTask = (id) => {
    return axios.delete('http://localhost:3000/tasks/' + id)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

module.exports.checkTask = (a) => {
    return axios.put('http://localhost:3000/tasks/' + a.id, 
        {
            "id": a.id,
            "what": a.what,
            "who": a.who,
            "dueDate": a.dueDate,
            "done": 1,
            "date": d
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

module.exports.addTask = (task) => {
    return axios.post('http://localhost:3000/tasks', task)
        .then(response => {
            return response.data
        })
        .catch(error => {
            return error
        })
}

