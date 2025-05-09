const jwt = require('../middleware/jwt'); //Json web token, for authenticated pages by token
const {isValidUser, hashString} = require("../utilities/loginUtilities");
const User = require('../models/user');

const { domainName, port, mainPages, currentYear, getUsername} = require("../utilities/pageUtilities");

//Login 
exports.loginPage = (req, res) => {
    //Setting active mainPages
    mainPages.forEach(page => {
        page.title == "Login" ? page.active = true : page.active = false;
    });
    res.render("login", { 
        //These parameters are standard and should be used in every page
        motto: "Please login with your credentials",
        linksNavbar: mainPages.slice(1), //I take every page but not the home page, required from header and footer
        home: mainPages[0], 
        current: mainPages[2],
        currentYear: currentYear,
        username: getUsername(req.cookies.jwtToken) ?? '',
    });
};

exports.loginPost = async (req, res) => {
    //Note: I use both username and password to ensure the proper access
    //Use the isValidAdmin if you don't want to use the table for auth
    let validation = await isValidUser(req.body.username, req.body.password)
    if(validation)
    {
        console.log("Login as admin, the credentials are: ")
        console.log(req.body.username, req.body.password);
        const idToken = 1;
        let token = jwt.setToken(idToken, req.body.username);
        let payload = jwt.getPayload(token);
        console.log("Token obtained from Login: ", token);

        //Cookie to retrieve token for page navigation
        res.cookie('jwtToken', token, {
            path: '/',
            httpOnly: true, 
            maxAge: 3600000, 
            sameSite: 'Lax' 
        }).send({ message: 'Login ok', status: 'success', token: token, payload: payload });

        //console.log("Cookie impostato: ", res.cookies)
        //res.send({ message: 'Login ok', status: 'success', token: token, payload: payload });
    }
    else
    {
        console.log("Utente non registrato");
        res.send({ message: 'Not registered user', status: 'failure' });
    }
};

//Sign in
exports.signInPage = (req, res) => {

    //Setting active mainPages
    mainPages.forEach(page => {
        page.title == "Sign In" ? page.active = true : page.active = false;
    });
    const signInTitle = mainPages[3].title;
    const forms = [
        {
            id : "1", 
            title: signInTitle,
            type: "Create",
            method: "POST",
            url: `${domainName}:${port}/signin`,
            okMessage: "User created. Go to login to confirm your credentials and get the token.",
            fields: [
                { id: "a", name: "Username", type: "text", placeholder: "New username", formValue: "username" },
                { id: "b", name: "Password", type: "text", placeholder: "New password", formValue: "password" },
                { id: "c", name: "Email", type: "text", placeholder: "test@gmail.com", formValue: "email" },
            ]
        }
    ]

    res.render("signIn",
        //These parameters are standard and should be used in every page
        { 
            motto: "If you are new and need access credentials, you shoul login here first",
            linksNavbar: mainPages.slice(1), //I take every page but not the home page, required from header and footer
            home: mainPages[0], 
            current: mainPages[3],
            currentYear: currentYear,
            username: getUsername(req.cookies.jwtToken) ?? '',
            //These parameters on the other hand, are some extra and depend on the components you want to add to the page
            itemsAPIForms: forms,
        }
    );
};

exports.createUser = (req, res) => {
    const username = hashString(req.body.username);
    const password = hashString(req.body.password);
    const email = req.body.email;
    const user = new User(null, username, password, email);
    user.add((err, newUser) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({message: "User created. Go to login to confirm your credentials and get the token.", data: newUser});
    });
};

//Sign out
exports.signOut = (req, res) => {
    // Cancella tutti i cookie impostandoli con una data di scadenza passata
    Object.keys(req.cookies).forEach(cookieName => {
        res.clearCookie(cookieName);
    });

    res.send({ message: 'Sign Out ok', status: 'success'});
};