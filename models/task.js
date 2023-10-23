const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    task: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('task',taskSchema);