var ObjectID = require('mongodb').ObjectID;
var async = require('async');
module.exports = function(app){

    app.get('/templates', function(req, res) {
        if (req.isAuthenticated){

            res.render('templates');
        }
    });

    app.post('/templates/add', function(req, res){
        var db = req.db;
        var templateDao = db.get('evalTemplates');

    });

    app.get('/api/templates', function(req, res){
        var db = req.db;
        var templateDao = db.get('evalTemplates');
        templateDao.find({}, function(err, docs){
            console.log(docs);
            res.json(docs);
        });
    });


    app.get('/api/template/:templateId', function(req, res){
        var db = req.db;
        var templateQuestionDao = db.get('templateQuestions');
        var templateId = new ObjectID(req.param('templateId'));
        //console.log(templateId);
        templateQuestionDao.find({"templateId":templateId}, function(err, docs){
            res.json(docs)
        });
    });

    app.post('/api/template/:templateId/add', function(req, res){
        console.log("hit adding for "+req.param('templateId'));
        console.log(req.body);
        var db = req.db;

    });

    app.post('/api/template/:templateId/question/add', function(req, res){
        res.json("what");
        console.log(req.body);
        var db = req.db;
        var templateQuestionDao = db.get('templateQuestions');
        templateQuestionDao.insert({
            "title":req.body.title,
            "templateId":new ObjectID(req.param('templateId')),
            "question":req.body.question,
            "questionType":req.body.questionType,
            "answerA":req.body.answerA,
            "answerB":req.body.answerB,
            "answerC":req.body.answerC
        })

    });



};