const Router = require('express');
const tasks = require('../controllers/task');
const router = new Router();
const bodyParser = require("body-parser");

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res) => {
   tasks.getTasks(req, res)
})

router.post('/', urlencodedParser, (req, res) => {
   tasks.createTask(req, res);
    // tasks.createTask(req, res);
});

router.patch('/:id', (req, res) => {
    tasks.updateTask(req, res);
})

router.delete('/:id', (req, res) => {
    tasks.deleteTask(req, res);
})



module.exports = router;