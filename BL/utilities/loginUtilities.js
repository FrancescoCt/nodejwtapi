//#region methods for hashing or sanitize
const crypto = require('crypto');
const User = require('../models/user');

function hashString(input) {
    return crypto.createHash('sha256').update(input).digest('hex'); // Usa SHA-256 per l'hashing
}
//#endregion

const adminUser = process.env.ADMIN_USER;
const adminPass = process.env.ADMIN_PASS;

//Use this if you don't have a database but just an env file
function isValidAdmin(username, password) {
    var valid = false;
    //Check username not null
    if (typeof username !== 'string' || username.trim().length === 0) {
        return false;
    }

    // Check Hash: we don't store the credentials directly, but we use their hash values for more privacy
    
    if( hashString(username) == hashString(adminUser) && hashString(password) == hashString(adminPass))
    {
        valid = true;
    }
    return valid;
}

async function isValidUser(username, password) {
    return new Promise((resolve, reject) => {
        // Check username not null
        if (typeof username !== 'string' || username.trim().length === 0) {
            return resolve(false);
        }

        console.log("Username hashed: " + hashString(username) + " Password hashed:" + hashString(password));

        // Check Hash: we don't store the credentials directly, but we use their hash values for more privacy
        User.getByCredentials(hashString(username), hashString(password), (err, user) => {
            if (err) {
                console.error("Errore nel recupero delle credenziali:", err);
                return reject(err);
            }
            resolve(!!user);
        });
    });
}

module.exports = {isValidAdmin, hashString, isValidUser};