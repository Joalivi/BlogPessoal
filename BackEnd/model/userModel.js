'user strict';
var sql = require('./db');

var User = function (user) {
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.adm = user.adm;
};

User.createUser = function (newUser, result) {
    sql.query("INSERT INTO user (name, username, email, adm) VALUES ('" +
        newUser.name + "', '" +
        newUser.username + "', '" +
        newUser.email + "', '" +
        newUser.adm + "')",
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        });
};

User.getAllUsers = function (result) {
    sql.query("SELECT * FROM user", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

User.getAllAdmUsers = function (result) {
    sql.query("SELECT * FROM user WHERE adm=1",  function (err, res){ 

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

//SELECT * FROM user WHERE MATCH(adm) AGAINST(1)
module.exports = User;