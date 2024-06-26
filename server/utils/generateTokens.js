const jwt = require("jsonwebtoken");

const generateAccessToken = async (id) => {

    const token = await jwt.sign({ userId: id }, process.env.SECRET_KEY, {
        expiresIn: "15d",
    });
    console.log("token", token);
    return token
    
};

module.exports = generateAccessToken;
