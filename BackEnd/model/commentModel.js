'user strict';
var sql = require('./db');

var Comment = function (comment) {
    this.title = comment.title;
    this.body = comment.body;
    this.email = comment.email;
    this.post_id = comment.post_id;
};

Comment.createComment = function (newComment, result) {
    sql.query("INSERT INTO comment (title, body, email, post_id) VALUES ('" +
        newComment.title + "', '" +
        newComment.body + "', '" +
        newComment.email + "', '" +
        newComment.post_id + "')",
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        });
};

Comment.getAllComments = function (postId, result) {
    sql.query("SELECT c.id, c.post_id, c.title, c.body, c.email, DATE_FORMAT(c.date, '%d/%m/%Y às %H:%i') AS date FROM comment c INNER JOIN post p ON c.post_id = p.id WHERE p.id = ? ORDER BY c.date", postId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Comment.getCommentById = function (commentId, result) {
    sql.query("SELECT * FROM comment WHERE id = ?", commentId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Comment.delete = function (commentId, result) {
    sql.query("DELETE FROM comment WHERE id = ?", commentId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = Comment;