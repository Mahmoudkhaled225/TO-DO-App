// Authentication middleware logic steps:

/**
 * Destruct token
 * Prefix for more security
 * Get the token again
 * Decode the token
 * Get user data
 * Store user data in the request to access it in the controller
 */

// import jwt from "jsonwebtoken";
import {userModel} from "../DB/models/userModel.js";
import {tokenFunction} from "../utlies/createToken.js";
export const auth = () => {
    return async (req, res, next) => {
        try {
            const { token } = req.headers;
            //   console.log(authorization);
            if (!token) {
                return res.json({ message: "please enter your token" });
            }
            //   console.log(token);
            // const decode = jwt.verify(token,"tokenGeneration");
            const decode = tokenFunction(token,"tokenGeneration",60*60);
            console.log(decode);
            if (!decode || !decode.id) {
                return res.json({ message: "in-valid token" });
            }
            const user = await userModel.findById(decode.id);
            if (user) {
                req.user = user;
                //  console.log(req.user);
                next();
            } else {
                res.json({ message: "in-valid userId" });
            }
        } catch (error) {
            console.log(error);
            res.json({ message: "catch error in authentication" });
        }
    };
};

