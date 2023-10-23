const path = require("path");
const User = require("../models/user");
const Task = require("../models/task");

exports.taskPage = (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../public", "/task.html"));
};

exports.createTask = async (req, res) => {
  console.log(req.body);
  const { task, id } = req.body;
  try {
    const getUser = await User.findById(id);
    if (getUser) {
      const createdTask = await Task.create({
        username: getUser.username,
        email: getUser.email,
        task,
      });
      return res.status(200).json({
        success: true,
        data: createdTask
      })
    }
  } 
  catch (error) {
    return res.status(400).json({
        success: false,
        error: error.message
    })
  }
};

exports.allTask = async (req, res) => {
  const { id } = req.body;
  try {
    const getUser = await User.findById(id);
    if (getUser) {
      const allTasks = await Task.find({email: getUser.email});
      return res.status(200).json({
        success: true,
        data: allTasks,
        role: getUser.role
      })
    }
  } 
  catch (error) {
    return res.status(400).json({
        success: false,
        error: error.message
    })
  }
};

exports.editTask = async (req,res) => {
  try {  
    const taskId = req.params.id;
    const taskDetail = req.body.task;
    const task = await Task.findByIdAndUpdate(taskId,{task: taskDetail});
    if(task){
      return res.status(200).json({
        success: true.valueOf,
        data: task
      })
    }else{
      throw new Error("Task not updated");
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

exports.deleteTask = async (req,res) => {
  try {  
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    if(task){
      return res.status(200).json({
        success: true.valueOf,
        data: task
      })
    }else{
      throw new Error("Task not deleted");
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

exports.adminReq = async (req,res) => {
  const { id } = req.body;
  try {
    const getUser = await User.findById(id);
    if (getUser) {
      if(getUser.role !== 'regular'){
        const allTasks = await Task.find();
        return res.status(200).json({
          success: true,
          data: allTasks
        })
      }else{
        throw new Error("You don't have permission");
      }
    }else{
      throw new Error("Something went wrong");
    }
  } 
  catch (error) {
    return res.status(400).json({
        success: false,
        error: error.message
    })
  }
}