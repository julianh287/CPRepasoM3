'use strict';
const express = require('express');
const router = express.Router();
// const {list, listPeople} = require('../models/todos.js');
const todos = require('../models/todos.js');
// const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    res.status(200);    
    return res.json(todos.listPeople()); 
});
router.get('/:name/tasks', (req, res) => {
    const name = req.params.name;
    const status = req.query.status;

    var usuariosActivos = todos.listPeople();
    var chequeoDeUsuario = usuariosActivos.includes(name);
    if(!chequeoDeUsuario){
        res.status(404);
        return res.send('User does not exist');
    }

    if(status){
        if(status==='complete'){
            var listado = todos.list(name);
            listado = listado.filter(el=>el.complete===true);
            res.status(200)
            return res.json(listado);
        } else {
            var listado = todos.list(name);
            listado = listado.filter(el=>el.complete!==true);
            res.status(200);
            return res.json(listado);
        };        
    } 
    res.status(200)
    return res.json(todos.list(name)); 
});
router.post('/:name/tasks', (req, res) => {
    const name = req.params.name;
    const task = req.body;

    if(task.content==='' || !task){
        res.status(400);
        return res.send('Task does not exist')
    }

    if(name && task){
         return res.status(201).json(todos.add(name, task));
    }    
});
router.put('/:name/tasks/:index', (req, res) => {
    const name = req.params.name;
    const index = req.params.index;
    res.status(200);
    return res.send(todos.complete(name, index));
});
router.delete('/:name/tasks/:index', (req, res) => {
    const name = req.params.name;
    const index = req.params.index;
    res.status(204);
    return res.send(todos.remove(name, index));
})


module.exports = router;

