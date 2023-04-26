import mongoose from "mongoose";

export const connection = async () => {
    return await mongoose
            .connect("mongodb://127.0.0.1:27017/todoapp")
            .then(()=>{console.log("connection done")})
            .catch((error)=>console.log({message:"connection failed",error}))
};

mongoose.set("strictQuery",true);
