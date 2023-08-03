import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  name: any= '';

  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        console.log(todos);
        this.todos = todos;
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  postTodos() {
    if (this.name === '') {
      return;
    } else {
      const content = {
        isCompleted: false,
        text: this.name,
      };

      this.todoService.postTodos(content).subscribe({
        next: (response) => {
          location.reload();
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  deleteTodo(i: any) {
    const id = this.todos[i]._id;

  this.todoService.deleteTodo(id).subscribe({
      next: (response) => {
        console.log(response);
        location.reload();
      },
      error: (error) => {
        console.log(error);
      },
      });
   }

   checkTodo(i: any) {
    const id = this.todos[i]._id;

    const content = {
      isCompleted: !this.todos[i].isCompleted,
      text: this.todos[i].text,
    };

    this.todoService.updateTodo(content, id).subscribe({
      next: (response) => {
        location.reload();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }







}

