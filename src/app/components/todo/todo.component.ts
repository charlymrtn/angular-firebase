import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { element } from 'protractor';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  todoList: any[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList().snapshotChanges()
      .subscribe(item => {
        this.todoList = [];
        // tslint:disable-next-line:no-shadowed-variable
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.todoList.push(x);
        });
        this.todoList.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }

  addTodo(itemTitle) {
    this.todoService.addTodo(itemTitle.value);
    itemTitle.value = null;

  }

  updateTodo($key: string, isChecked: boolean) {
    this.todoService.updateTodo($key, !isChecked);
  }

  deleteTodo($key: string) {
    if (confirm('estas seguro de eliminar?')) {
      this.todoService.removeTodo($key);
    }
  }

}
