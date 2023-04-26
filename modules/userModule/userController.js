import {userModel} from "../../DB/models/userModel.js";
import {hashFunction} from "../../utlies/generateHash.js";
import {compareFuncion} from "../../utlies/compareHash.js";
import {tokenFunction} from "../../utlies/createToken.js";
import {alter} from "../../utlies/alter.js";



export const signUp = async (req, res) => {
    try {
        const {name, email, password,confirmtionPassword, age} = req.body;
        if(password === confirmtionPassword){
            const checkUserExist = await userModel.findOne({email});
            if(checkUserExist){
                res.json({ message: "email is already registered" });
            }
            else{
                const hashedPass = hashFunction({ payload: password });
                const newUser = new userModel({name, email, password:hashedPass, age});
                const savedUser = await newUser.save();
                if(savedUser){
                    res.json({ message: "Sign up success", savedUser })
                }
                else{
                    res.json({ message: "sign up fail" })
                }
            }
        }
        else{
            res.json({ message: "password must match the confirmation password" });
        }
    }
    catch (error){
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};


export const logIn = async (req, res) => {
    try {
        const{email,password} = req.body;
        const checkUser = await userModel.findOne({email});
        if(checkUser){
            const isPasswordValid = compareFuncion({
                payload: password,
                referenceData: checkUser.password
            });

            if(isPasswordValid){
                const token1 = tokenFunction({email: checkUser.email, id: checkUser._id},"tokenGeneration",60*60)
                res.json({ message: "login success", checkUser ,token1});
            }
            else{
                res.json({ message: "password is not valid" });
            }
        }
        else{
            res.json({ message: "email is not registered" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({"msg":"catch error",error});
    }
};



export const updateNameAndEmail = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { token } = req.headers;
        console.log(token);
        const decoded = tokenFunction(token,"tokenGeneration");
        console.log(decoded);
        if(!decoded||!decoded.id){
            res.json({ message: "decoded fail" });
        }
        else{
            const user = await userModel.findByIdAndUpdate(
                decoded.id,
                {
                    name,
                    email,
                },
                { new: true }
            );
            if (user) {
                res.json({ message: "Done", user });
            } else {
                res.json({ message: "fail" });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Catch error in update" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { _id } = req.user;
            const user = await userModel.findByIdAndDelete(_id);
            if (user) {
                res.json({ message: "Done" });
            } else {
                res.json({ message: "fail" });
            }
        }
        catch (error) {
        console.log(error);
        res.json({ message: "Catch error in delete" });
    }
};



export const logOut = async (req, res) => {
    try {
        let { token } = req.headers;
        console.log(token)
        console.log(typeof (token));
        const decoded = tokenFunction(token,"tokenGeneration");
        if(!decoded||!decoded.id){
            res.json({ message: "decoded fail" });
        }
        else{
            req.headers.token = alter(token);
            console.log(req.headers.token)
            res.json({msg:"in-valied token you loged out",});

        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Catch error in update" });
    }
};












