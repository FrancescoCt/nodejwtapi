const db = require('../utilities/db');
const tableName = "Users";

class User {
    constructor(id, username, password, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    add(callback) {
        const query = 'INSERT INTO '+tableName+' (username, password, email) VALUES (?, ?, ?)';
        db.query(query, [this.username, this.password, this.email], (err, results) => {
            if (err) {
                return callback(err);
            }
            this.id = results.insertId;
            callback(null, { id: this.id, username: this.username, password : this.password, email: this.email });
        });
    }

    static get(id, callback) {
        const query = 'SELECT * FROM '+tableName+' WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                const user = new User(results[0]["Id"], results[0]["Username"], results[0]["Password"], results[0]["Email"]);
                callback(null, user);
            } else {
                callback(null, null);
            }
        });
    }

    static getByCredentials(username, password, callback) {
        const query = 'SELECT * FROM '+tableName+' WHERE username = ? AND password = ?';
        db.query(query, [username, password], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                const user = new User(results[0]["Id"], results[0]["Username"], results[0]["Password"], results[0]["Email"]);
                callback(null, user);
            } else {
                callback(null, null);
            }
        });
    }

    static getAll(callback) {
        const query = 'SELECT * FROM '+tableName+' ORDER BY id';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            const users = results.map(row => new User(row["Id"], row["Username"], row["Password"], row["Email"]));
            callback(null, users);
        });
    }

    update(callback) {
        const query = 'UPDATE '+tableName+' SET username = ?, password = ?, email = ? WHERE id = ?';
        db.query(query, [this.username, this.password, this.email, this.id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.id, username: this.username, password : this.password, email: this.email });
        });
    }

    delete(callback) {
        const query = 'DELETE FROM '+tableName+' WHERE id = ?';
        db.query(query, [this.id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.affectedRows > 0);
        });
    }

    static async deleteAll(){
        const query = 'DELETE FROM '+tableName;

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error deleting '+tableName+':', err);
                return;
            }
        });
    }

    static async restoreSamples(){
        const query = "INSERT INTO "+tableName+" (Username, Password, Email) VALUES ('admin', 'admin', 'admin@gmail.com'), ('develop', 'develop', 'develop@gmail.com')";

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error restoring '+tableName+':', err);
                return;
            }
        });
    }
}

module.exports = User;