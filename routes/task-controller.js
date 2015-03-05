var ObjectID = require('mongodb').ObjectID;
module.exports = function(app){

    app.get('/tasks', function(req, res){
        var db = req.db;
        var TaskDAO = db.get('tasks');
        var UserDAO = db.get('users');
        var modelUser = req['user'];
        var tasklist = [];
        UserDAO.findById({
            "_id":modelUser.id
        }, function( err, doc){
            tasklist.push(doc);
        });
        //var ta/sk = user.task;
        //var task = TaskDAO.find({
        //    "_id":dbUser.task
        //});
        //tasklist.push(task);

        res.render('tasks',{
            title:"Tasks",
            user: req['user'],
            tasklist:tasklist
        });
    });

    app.post('/tasks', function(req, res){
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
        userCollection.update(
            user.id,
            {
                $set: {
                    task:id
                }
            }
        );

        res.location('tasks');
        res.redirect('tasks');

    })

};