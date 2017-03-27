var express = require('express');
var router  = express.Router();
var mongojs = require('mongojs');

var db = mongojs('todos', ['todos'])

// Get all todos
router.get('/todos', function(req, res, next){

    db.todos.find(function(error,todos){

        if(error){

            res.send(error);

        }

        res.json(todos);

    });

});

// Get single todo
router.get('/todo/:id', function(req, res, next){

    db.todos.findOne({

        _id:mongojs.ObjectID(req.params.id)

    },function(error,todo){

        if(error){

            res.send(error);

        }

        res.json(todo);

    });

});

// Save todo
router.post('/todo', function(req, res, next){

    var todo = req.body;

    if(!todo.text || !(todo.isCompleted + '')){

        res.status(400);
        res.json({
            'error': 'Invalid Data'
        });

    }

    db.todos.save(todo, function(error, result){

        if(error){

            res.send(error);

        }

        res.json(result);

    });

});

// Update todo
router.put('/todo/:id', function(req, res, next){

    var todo = req.body;

    var updateObj = {};

    if(!todo.text || !(todo.isCompleted + '')){

        res.status(400);
        res.json({
            'error': 'Invalid Data'
        });

    }

    updateObj = todo;

    db.todos.update({

        _id:mongojs.ObjectID(req.params.id)

    }, updateObj, {}, function(error, result){

        if(error){

            res.send(error);

        }

        res.json(result);


    });

});

// Delete todo
router.delete('/todo/:id', function(req, res, next){

    db.todos.remove({

        _id:mongojs.ObjectID(req.params.id)

    }, '' , function(error, result){

        if(error){

            res.send(error);

        }

        res.json(result);


    });

});

module.exports = router;