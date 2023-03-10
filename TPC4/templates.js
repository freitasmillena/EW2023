exports.toDoListPage = function(tasks, users, max, maxUser){
    var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>To do list</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body class="w3-2018-almost-mauve">
        <header class="w3-container w3-center w3-2021-amethyst-orchid">
            <h1><b>To do list</b></h1>
        </header>
        <main class="w3-center">
            <div class="w3-cell-row">
                <div class="w3-container w3-cell" style="width:50%">
                    <h3 class="w3-margin-top" style="color:rgb(130, 68, 164)"><b>Add Task</b></h3>
                <form action="/tasks/registo" class="w3-container  w3-center w3-margin" method="POST">
                    <input type="hidden" name="id" value=${max}>
                    <label><p class="w3-2021-amethyst-orchid w3-center w3-round" ><b>Task Description</b></p></label>
                    <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="what">
                     
                    <label><p class="w3-2021-amethyst-orchid w3-round"><b>Who is responsible</b></p></label>
                    <select class="w3-select w3-border w3-round" name="who">
                    <option class="w3-center" value="" disabled selected>Choose person</option>
                    `
        for(let i = 0; i<users.length;i++){
            pagHTML += `
            <option class="w3-center">${users[i].name}</option>
            `
        }
        pagHTML +=
                    `
                    </select>
                      

                    <label><p class="w3-2021-amethyst-orchid w3-round"><b>Due date</b></p></label>
                    <input class="w3-input w3-border w3-round w3-center" type="date" name="dueDate">
                    
                    <button class="w3-btn w3-round w3-2021-amethyst-orchid w3-margin-top" type="submit">Add Task</button>
                     
                    </form>
                </div>
                <div class="w3-container w3-cell" style="width:50%">
                    <h3 class="w3-margin-top" style="color:rgb(130, 68, 164)"><b>Add User</b></h3>
                    <form action="/users/registo" class="w3-container  w3-center w3-margin" method="POST">
                        <input type="hidden" name="id" value=${maxUser}>
                        <label><p class="w3-2021-amethyst-orchid w3-center w3-round" ><b>Name</b></p></label>
                        <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="name">
                         
                        <label><p class="w3-2021-amethyst-orchid w3-round"><b>Occupation</b></p></label>
                        <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="occupation">
                          
    
                        <label><p class="w3-2021-amethyst-orchid w3-round"><b>E-mail</b></p></label>
                        <input class="w3-input w3-border w3-round w3-center" type="email" name="email">
                        
                        <button class="w3-btn w3-round w3-2021-amethyst-orchid w3-margin-top" type="submit">Add User</a>
                         
                        </form>
                </div>
            </div>
            
            <div class="w3-cell-row w3-margin-top">
                <div class="w3-container w3-cell" style="width:50%">
                    <div class="w3-container w3-center w3-2021-amethyst-orchid w3-round w3-margin-bottom"><h3>Tasks to be done</h3></div>
                    `
        
        
        for(let i = 0; i < tasks.length; i++) {
            if(!("done" in tasks[i])){
                pagHTML +=`
                <!-- Each Task Info -->
                <div class="w3-container w3-center w3-2021-amethyst-orchid w3-round w3-margin-top">
                    <p class="w3-right-align">
                        <a href="/tasks/edit/${tasks[i].id}"><b>Edit</b></a>|<a href="/tasks/delete/${tasks[i].id}"><b>Delete</b></a>|<a href="/tasks/done/${tasks[i].id}"><b>Done</b></a>
                    </p>  
                    <p><b>Description:</b> ${tasks[i].what}</p>  
                    <p><b>Responsible:</b> ${tasks[i].who}</p> 
                    <p><b>Due date:</b> ${tasks[i].dueDate}</p>  
                </div>`
            }
        }

        pagHTML += `</div>
        <div class="w3-container w3-cell" style="width:50%">
                    <div class="w3-container w3-center w3-2021-amethyst-orchid w3-round w3-margin-bottom"><h3>Completed Tasks</h3></div>
                  `
        
        for(let i = 0; i < tasks.length; i++) {
            if("done" in tasks[i]){
                pagHTML +=`
                <div class="w3-container w3-center w3-2021-amethyst-orchid w3-round w3-round w3-margin-top">
                            <p class="w3-right-align">
                                <a href="/tasks/delete/${tasks[i].id}"><b>Delete</b></a>
                            </p>  
                            <p><b>Description:</b> ${tasks[i].what}</p>  
                            <p><b>Responsible:</b> ${tasks[i].who}</p> 
                            <p><b>Date:</b> ${tasks[i].date}</p> 
                                

                </div>
                `
            }
        }

        pagHTML += `</div>
                </div>
            </div>
            
        </main>

        <footer class="w3-container w3-center w3-2021-amethyst-orchid w3-margin-top">
            <h5>Created by <b>Millena Freitas</b></h5>
          </footer>
    </body>
</html>
    `

    return pagHTML
}

exports.editTaskPage = function (task, users){
    var pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>To do list</title>
        <link rel="stylesheet" href="./public/w3.css"/>
    </head>
    <body class="w3-2018-almost-mauve">
        <header class="w3-container w3-center w3-2021-amethyst-orchid">
            <h1><b>Edit Task</b></h1>
        </header>
        <main class="w3-center">
            
                <div class="w3-container w3-center" >
                    <h3 class="w3-margin-top" style="color:rgb(130, 68, 164)"><b>Edit Task</b></h3>
                <form class="w3-container  w3-center w3-margin" method="POST">

                    <label><p class="w3-2021-amethyst-orchid w3-center w3-round"  ><b>Task Description</b></p></label>
                    <input class="w3-input w3-border w3-margin-bottom w3-center w3-round" type="text" name="what" value="${task.what}">
                     
                    <label><p class="w3-2021-amethyst-orchid w3-round"><b>Who is responsible</b></p></label>
                    <select class="w3-select w3-border w3-round" name="who" value=${task.who}>
                        <option class="w3-center" value="" disabled selected>Choose person</option>
                        `
            for(let i = 0; i<users.length;i++){
                    pagHTML += `
                            <option class="w3-center">${users[i].name}</option>
                            `
            }

                pagHTML +=        `
                      </select>
                      

                    <label><p class="w3-2021-amethyst-orchid w3-round"><b>Due date</b></p></label>
                    <input class="w3-input w3-border w3-round w3-center" type="date" name="dueDate" value=${task.dueDate}>
                    
                    <button class="w3-btn w3-round w3-2021-amethyst-orchid w3-margin-top" type="submit">Edit Task</button>
                     
                    </form>
                </div>
                
           
            
         
            
        </main>

        <footer class="w3-container w3-center w3-2021-amethyst-orchid w3-margin-top">
            <h5>Created by <b>Millena Freitas</b></h5>
          </footer>
    </body>
</html>
    `

    return pagHTML
}