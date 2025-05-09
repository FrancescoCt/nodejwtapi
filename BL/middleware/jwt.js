var jwt = require('jsonwebtoken');
const secret = process.env.ADMIN_PASS;
const options = {algorithm: "HS256", expiresIn: "8h"} //shared key alghoritm, no certificate

let setToken = (id, username) => {
    //Define token properties
    let payload = {id: id , username: username};
    var token = jwt.sign(payload, secret, options);
    return token;
}

let getPayload = (token) =>{
    //No need for secret here, the payload is the clear part, any site can read it
    //No token validation here
    const optionsDecode = {complete: true};
    var decoded = jwt.decode(token, optionsDecode);
    return decoded.payload;
}

let checkToken = (token) => {
    return jwt.verify(token, secret, options);
}

module.exports = {
    setToken,
    getPayload,
    checkToken
};
//Continua seguendo le istruzioni dal video:
//https://www.youtube.com/watch?v=NikBvN7XDq4&t=1247s