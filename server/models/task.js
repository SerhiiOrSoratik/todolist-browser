const model = require('../modelsDb');

class TasksModel {

     getTasks() {
        return model.Browser_tasks.findAll();
    }

    createTask(options) {
        const {title, due_date, description} = options;
        return model.Browser_tasks.create({title, done: false, due_date, description})
    }
    
    updateTasks() {

    }

    deleteTasks(id) {
        model.Browser_tasks.destroy({
            where: {
                id: id
            }
        })
    }

}

module.exports = new TasksModel()