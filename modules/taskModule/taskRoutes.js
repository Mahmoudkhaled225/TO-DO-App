import {Router} from "express";
import * as taskController from "./taskController.js";
import {auth} from "../../middleware/auth.js";
import {validation} from "../../middleware/validation.js";
import * as taskValidation from "./taskValidationSchema.js"

const taskRouter = Router();


taskRouter.post("/create",auth(),validation(taskValidation.createTaskValidatinon),taskController.createTask);
taskRouter.get("/all",auth(),validation(taskValidation.getAllTasksByUserValidatinon),taskController.getAllTasksByUser);
taskRouter.patch("/status",auth(),validation(taskValidation.updateTaskStatusValidatinon),taskController.updateTaskStatus);
taskRouter.patch("/updatename",auth(),validation(taskValidation.editTaskNameValidatinon),taskController.editTaskName);
taskRouter.post("/searchtask/:title",auth(),taskController.searchTask);
taskRouter.delete("/delete/:id",auth(),taskController.deleteTask);
taskRouter.delete("/deleteall/:id",auth(),taskController.clearAllTasks);

taskRouter.patch("/alldone/:id",auth(),taskController.markAllAsCompleted);


export default taskRouter;