import express from 'express';
import {connection} from "./DB/connection.js";
import userRouter from "./modules/userModule/userRoute.js";
import taskRouter from "./modules/taskModule/taskRoutes.js";
const app =express();
app.use(express.json());
connection();

app.use("/user", userRouter);
app.use("/task", taskRouter);


app.listen(3000, () => {
    console.log("server is running on port 3000");
});