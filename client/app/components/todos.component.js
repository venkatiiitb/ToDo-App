"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var todos_service_1 = require("./../services/todos.service");
var TodosComponent = (function () {
    function TodosComponent(_todoService) {
        this._todoService = _todoService;
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todos = [];
        this._todoService.getTodos().subscribe(function (todos) {
            _this.todos = todos;
        });
    };
    TodosComponent.prototype.addTodo = function (event, todoText) {
        var _this = this;
        var newTodo = {
            text: todoText.value,
            isCompleted: false
        };
        this._todoService.saveTodo(newTodo).subscribe(function (res) {
            _this.todos.push(newTodo);
            todoText.value = '';
        });
    };
    TodosComponent.prototype.setEditState = function (todo, state) {
        if (state) {
            todo.isEditMode = state;
        }
        else {
            delete todo.isEditMode;
        }
    };
    TodosComponent.prototype.updateStatus = function (todo) {
        var _todo = {
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        this._todoService.updateTodo(_todo, todo._id)
            .subscribe(function (data) {
            todo.isCompleted = !todo.isCompleted;
        });
    };
    TodosComponent.prototype.updateTodoText = function (event, todo) {
        var _this = this;
        if (event.which === 13) {
            todo.text = event.target.value;
            var _todo = {
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this._todoService.updateTodo(_todo, todo._id)
                .subscribe(function (data) {
                _this.setEditState(todo, false);
            });
        }
    };
    TodosComponent.prototype.deleteTodo = function (todo) {
        var _this = this;
        var todos = this.todos;
        this._todoService.deleteTodo(todo._id)
            .subscribe(function (data) {
            if (data.n == 1) {
                _this.todos = todos.filter(function (item) {
                    return item._id != todo._id;
                });
            }
        });
    };
    return TodosComponent;
}());
TodosComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todos',
        templateUrl: 'todos.component.html',
    }),
    __metadata("design:paramtypes", [todos_service_1.TodosService])
], TodosComponent);
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map