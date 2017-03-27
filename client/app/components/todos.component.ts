import { Component, OnInit } from '@angular/core';

import { TodosService } from './../services/todos.service';

import { Todo } from './../Todo';

@Component({
  moduleId:module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html',
})
export class TodosComponent implements OnInit{

  todos: Todo[];

  constructor(private _todoService:TodosService){

  }

  ngOnInit(){

    this.todos = [];
    this._todoService.getTodos().subscribe(todos => {

      this.todos = todos;

    });

  }

  addTodo(event, todoText){

    var newTodo = {

      text: todoText.value,
      isCompleted: false

    };

    this._todoService.saveTodo(newTodo).subscribe(res => {

      this.todos.push(newTodo);
      todoText.value = '';

    });

  }

  setEditState(todo, state){

    if(state){

      todo.isEditMode = state;

    }else{

      delete todo.isEditMode;

    }

  }

  updateStatus(todo){

    var _todo = {

      text:todo.text,
      isCompleted: !todo.isCompleted

    };

    this._todoService.updateTodo(_todo, todo._id)
        .subscribe(data => {

          todo.isCompleted = !todo.isCompleted;

        });

  }

  updateTodoText(event, todo){

    if(event.which === 13){

      todo.text = event.target.value;

      var _todo = {

        text:todo.text,
        isCompleted: todo.isCompleted

      };

      this._todoService.updateTodo(_todo, todo._id)
        .subscribe(data => {

          this.setEditState(todo, false);

        });

    }

  }

  deleteTodo(todo){

    var todos = this.todos;

    this._todoService.deleteTodo(todo._id)
        .subscribe(data => {

            if(data.n == 1){

              this.todos = todos.filter(function(item){

                return item._id != todo._id;

              });

            }

        });
  }

}