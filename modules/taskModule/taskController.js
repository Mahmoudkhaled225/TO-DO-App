import {taskModel} from "../../DB/models/taskModel.js";


export const createTask = async (req, res) => {
    try {
        const {title,content,addBy} = req.body;
        if (req.user.id === addBy) {
            const task = new taskModel({title, content, addBy});
            const savedTask = await task.save();
            if (savedTask) {
                res.json({message: "task created and it is pending by default but you can send it in body", savedTask});
            } else {
                res.json({message: "task not created"});
            }
        }
        else{
            res.json({message: "you are not authorized to create task for this user"});
        }
    }
    catch (error){
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};

export const getAllTasksByUser = async (req,res) => {
    try {
        const {addBy} = req.body;
        if (req.user.id === addBy) {
            const tasks = await taskModel.find({addBy});
            if (tasks) {
                res.json({message: `task add by ${addBy}`, tasks});
            } else {
                res.json({message: "no tasks found"});
            }
        }
        else{
            res.json({message: "you are not authorized to see task created by this user"});
        }
    }
    catch (error){
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};

export const updateTaskStatus = async (req,res) => {
    try {
        const {id, status, addBy} = req.body;
        if (req.user.id === addBy) {
            const task = await taskModel.findByIdAndUpdate({_id:id},{status}, { new: true });
            if (task) {
                    res.json({message: "task status changed", task});
                }
                else {
                    res.json({message: "task status not changed"});
                }
            }
            else {
                res.json({message: "you are not authorized to change task status of this user"});
            }
    }
    catch (error){
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};


//any update or edit will be as the updateTaskStatus
//for exapmle i will code just editTaskName
export const editTaskName = async (req,res) => {
    try {
        const {id, title, addBy} = req.body;
        if (req.user.id === addBy) {
            const task = await taskModel.findByIdAndUpdate({_id:id}, {title});
            if (task) {
                    res.json({message: "task title changed", task});
                }
                else {
                    res.json({message: "task title not changed"});
                }
            }
            else {
                res.json({message: "you are not authorized to change task name of this user"});
            }
        }
    catch (error){
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};


export const searchTask = async (req,res) => {
    try {
        const {title} = req.params;
        const {addBy} = req.body;
        if (req.user.id === addBy) {
            const task = await taskModel.findOne({title});
            if (task) {
                    res.json({message: "found it", task});
                }
                else {
                    res.json({message: "no task has such name"});
                }
            }
            else {
                res.json({message: "you are not authorized to search for this task "});
            }
    }
    catch (error){
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};

//does not matter its status
export const deleteTask = async (req,res) => {
    try {
        //msg obj_id of task
        const {id} = req.params;
        const {addBy} = req.body
        if (req.user.id === addBy) {
            const task = await taskModel.deleteOne({_id:id});
            if (task) {
                    res.json({message: "found it", task});
                }
                else {
                    res.json({message: "no task has such name"});
                }
            }
            else {
                res.json({message: "you are not authorized to search for this task "});
            }
        }
    catch (error){
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};


//clear all tasks by user
export const clearAllTasks = async (req,res) => {
    try {
        //obj_id of user
        const {id} = req.params;
        console.log(req.user.id === id);
        if (req.user.id === id) {
            const tasks = await taskModel.deleteMany({addBy:id});
            console.log(tasks);
            if (tasks.deletedCount) {
                res.json({message: `you deleted ${tasks.deletedCount} tasks`, tasks});
            } else {
                res.json({message: "user has no tasks"});
            }
        }
        else{
            res.json({message: "you are not authorized to see task created by this user"});
        }
    }
    catch (error){
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};

export const markAllAsCompleted = async (req,res) => {
    try {
        //obj_id of user
        const {id} = req.params;
        console.log(req.user.id === id);
        if (req.user.id === id) {
            const tasks = await taskModel.updateMany({addBy:id},{status:"done"});
            console.log(tasks);
            if (tasks.modifiedCount) {
                res.json({message: `you updated ${tasks.modifiedCount} tasks to complete`, tasks});
            } else {
                res.json({message: "user has no tasks"});
            }
        }
        else{
            res.json({message: "you are not authorized to see task created by this user"});
        }
    }
    catch (error){
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};