const taskModel = require('../models/task');

class Tasks {
    async getTasks(req, res) {
        const tasks = await taskModel.getTasks();
        res.json(tasks) ;
    }

    async createTask(req, res) {
            const options = req.body;
            const newTask = await taskModel.createTask(options);
            
            res.status(200)
            
            res.json(newTask);   
    }

    async updateTask() {
        taskModel.updateTask();
    }

    async deleteTask(req, res) {
        const id = req.params.id
        res.json(taskModel.deleteTask(id));
    }


}

module.exports = new Tasks();