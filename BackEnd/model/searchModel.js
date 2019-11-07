'user strict';
var sql = require('./db');

var Search = function (search) {
    this.string = search.string;
};

Search.getSearch = function (searchString, result) {
    sql.query("SELECT post_id, title, body FROM comment WHERE MATCH (title, body) AGAINST (?) UNION ALL SELECT id, title, body FROM post WHERE MATCH (title, body) AGAINST (?)", [searchString, searchString], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Search;