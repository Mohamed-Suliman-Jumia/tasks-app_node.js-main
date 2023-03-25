const TaskModel = require('../models/Task')


function getAllTasks(req, res) {
    TaskModel.find({}, (err, tasks) => {
        if (!err) return res.json(tasks)
        res.status(500).send("DB Err")
    })
}

function getTaskById(req, res) {
    const id = req.params.id
    TaskModel.findById(id, (err, task) => {
        if (!err) return res.json(task);
        res.status(500).send("DB Err")
    })
}

function addTask(req, res) {
    const task = new TaskModel(req.body)
    task.save((err, savedTask) => {
        if (!err) return res.json(savedTask)
        res.status(500).send("DB Err")
    })
}

function updateTask(req, res) {
    const newTaskData = { ...req.body }
    TaskModel.findByIdAndUpdate(req.params.id,
        {
            $set: newTaskData,
        },
        (err, editedTask) => {
            if (!err) return res.json(editedTask);
            res.status(500).send("DB Err")
        }
    )
}

function deleteTask(req, res) {
    const id = req.params.id
    TaskModel.findByIdAndDelete(id, (err, deletedTask) => {
        if (!err) return res.status(200).json({ msg: data });
        res.status(500).send("DB Err")
    })
}

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask }