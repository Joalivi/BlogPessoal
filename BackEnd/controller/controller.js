'use strict';

var Post = require('../model/postModel');
var User = require('../model/userModel');
var Comment = require('../model/commentModel');
var Search = require('../model/searchModel');



exports.list_all_posts = function (req, res) {
    Post.getAllPosts(function (err, post) {
        if (err)
            res.send(err);
        res.send(post);
    });
};

exports.read_a_post = function (req, res) {
    Post.getPostById(req.params.id, function (err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.create_a_post = function (req, res) {
    var new_post = new Post(req.body);
    Post.createPost(new_post, function (err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.update_a_post = function (req, res) {
    Post.updateById(req.params.id, new Post(req.body), function (err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
}

exports.delete_a_post = function (req, res) {
    Post.delete(req.params.id, function (err, post) {
        if (err)
            res.send(err);
        res.json({
            message: 'Post sucessfully deleted'
        });
    });
}



exports.list_all_users = function (req, res) {
    User.getAllUsers(function (err, user) {
        if (err)
            res.send(err);
        res.send(user);
    });
};

exports.list_all_adm_users = function (req, res) {
    User.getAllAdmUsers(function (err, user) {
        if (err)
            res.send(err);
        res.send(user);
    });
};


exports.create_a_user = function (req, res) {
    var new_user = new User(req.body);
    User.createUser(new_user, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};



exports.list_all_comments = function (req, res) {
    Comment.getAllComments(req.params.post_id, function (err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};

exports.create_a_comment = function (req, res) {
    var new_comment = new Comment(req.body);
    Comment.createComment(new_comment, function (err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};

exports.read_a_comment = function (req, res) {
    Comment.getCommentById(req.params.id, function (err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.delete_a_comment = function (req, res) {
   
    Comment.delete(req.params.post_id, function (err, post) {
        if (err)
            res.send(err);
        res.json({
            message: 'Comment sucessfully deleted'
        });
    });
}



exports.get_search = function (req, res) {
    Search.getSearch(req.params.string, function (err, search) {
        if (err)
            res.send(err);
        res.json(search);
    });
}




