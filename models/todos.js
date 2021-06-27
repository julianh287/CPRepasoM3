'use strict';

let tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },
  add: function (name, task) { 
    !task.complete?task.complete=false:null;
    !tasks.hasOwnProperty(name)?tasks[name] = []:null;
    tasks[name].push(task);
    return task;
  },
  list: function (name) {
    return tasks[name];
  },
  complete: function(name, index){
    tasks[name][index]['complete']=true;
  },
  remove: function (name, index) {
    tasks[name].splice(index, 1);   
    return tasks[name];
  }  
};