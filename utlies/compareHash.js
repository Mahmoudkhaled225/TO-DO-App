import bcrypt from "bcryptjs";

export const compareFuncion = ({ payload = "", referenceData = "" }) => {
    const match = bcrypt.compareSync(payload, referenceData);
    return match;
};