// function generate
// function decode

//function generate || decode
import jwt from "jsonwebtoken";


export const tokenFunction = (
                                  payload = {} || "",
                                  signature = "tokenGeneration",
                                  expiresIn = 60,
                                  generate = true,
                              ) => {
    if (typeof payload == "object") {
        if (Object.keys(payload).length && generate) {
            const token = jwt.sign(payload, signature, { expiresIn });
            return token;
        }
        return false;
    }

    if (typeof payload == "string") {
        if (payload == "" && generate) {
            return false;
        }
        const decode = jwt.verify(payload, signature);
        return decode;
    }
};