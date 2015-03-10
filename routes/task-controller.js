var ObjectID = require('mongodb').ObjectID;
var async = require('async');
module.exports = function(app){

    app.get('/tasks', function(req, res){
        if (req.isAuthenticated()) {
            var db = req.db;
            var modelUser = req['user'];
            var TaskDAO = db.get('tasks');
            var taskList = [];

            async.each(modelUser.tasks, function(entry, callback){
                TaskDAO.findById(entry._id, function(err, doc){
                    taskList.push(doc);
                    callback();
                })
            }, function(err){
                res.json(taskList);
            });

        } else {}
    });

    app.post('/tasks/add', function(req, res){
        var db = req.db;
        var user = req['user'];
        var taskCollection = db.get('tasks');
        var userCollection = db.get('users');
        var id = new ObjectID;
        taskCollection.insert({
            "_id":id,
            "title":req.body.title,
            "task":req.body.task
        });
        user.tasks.push({
            "_id":id
        });
        userCollection.update(
            user.id,
            {
                $set: {
                    tasks:user.tasks
                }
            }
        );

        res.send("/#tasks");

    });

    app.get('/tasks/add', function(req, res){
        if (req.isAuthenticated()){
            var user = req["user"];
            res.render('modals/newtask', {
                title: 'Add New Task',
                user: user
            });
        }

    })

};