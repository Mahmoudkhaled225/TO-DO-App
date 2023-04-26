import bcrypt from "bcryptjs";

export const hashFunction = ({
                                 payload = "",
                                 saltRounds = 8
                             }) => {
    const hashedPass = bcrypt.hashSync(payload, saltRounds);
    return hashedPass;
};

