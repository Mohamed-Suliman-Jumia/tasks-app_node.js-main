const createError = require("http-errors");
const express = require('express');
const { getAllTasks, getTaskById, deleteTask, updateTask, addTask } = require('../controllers/task');

const router = express.Router();


router.get("/", (req, res) => {
    getAllTasks(req, res)
})

router.get("/:id", (req, res) => {
    getTaskById(req, res)
})

router.post("/", (req, res, next) => {
    const { title, body } = req.body;
    if (!(title, body)) {
        return next(createError(400, 'All inputs(title, body) is required'))
    }
    addTask(req, res, next)
})

router.delete("/:id", (req, res) => {
    deleteTask(req, res)
})

router.put("/:id", (req, res) => {
    updateTask(req, res)
})

module.exports = router;

