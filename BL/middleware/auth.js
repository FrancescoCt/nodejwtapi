const jwt = require('./jwt');

const checkAuth = (req, res, next) => {
    try {

        //Navigation between pages after login
        console.log("Check token method");
        console.log("Cookies: ", req.cookies);
        let token = req.cookies.jwtToken;
        if(token != null){
            console.log("Token client: "+token);
            jwt.checkToken(token);
            //req.user = jwt.getPayload(token);
            next();
        }
        else

        //Normal auth procedure via postman
        if(req.headers['authorization'] == null){ 
            res.sendStatus(401);
        }
        else{
            let token = req.headers['authorization'];
            token = token.slice(7, token.length);
            console.log("Token client: "+token);
            jwt.checkToken(token);
            //req.user = jwt.getPayload();
            next();
        }
    } catch (error) {
        //Exception handling: we read internally the error, than we send a generic 401 to client
        console.error(error.message);
        res.sendStatus(401);
    }
    
}

module.exports = {checkAuth};