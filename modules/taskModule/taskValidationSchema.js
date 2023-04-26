import Joi from "joi";
import {createTask, editTaskName, getAllTasksByUser, searchTask, updateTaskStatus} from "./taskController.js";

export const createTaskValidatinon = {
    body: Joi.object().required().keys({
        title: Joi.string().min(1).max(100).alphanum().messages({
            "string.min": "tittle must contain at least 1 and up to 100 charachters",
        }),
        content: Joi.string().min(1).max(200).alphanum().messages({
            "string.min": "content must contain at least 1 and up to 200 charachters",
        }),
        addBy: Joi.required(),
    })
};

export const getAllTasksByUserValidatinon = {
    body: Joi.object().required().keys({
        addBy: Joi.required(),
    })
};


export const updateTaskStatusValidatinon = {
    body: Joi.object().required().keys({
        id: Joi.required(),
        status: Joi.string().required(),
        addBy: Joi.required(),
    })
};


export const editTaskNameValidatinon = {
    body: Joi.object().required().keys({
        id: Joi.required(),
        title: Joi.string().min(1).max(100).alphanum().messages({
            "string.min": "tittle must contain at least 1 and up to 100 charachters",
        }),
        addBy: Joi.required(),
    })
};

