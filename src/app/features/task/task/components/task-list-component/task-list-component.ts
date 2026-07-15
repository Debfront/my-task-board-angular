import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TaskService } from '../../../../category/services/task.service';
import { AsyncPipe } from '@angular/common';
import { NoTaskComponent } from '../no-task-component/no-task-component';

@Component({
  selector: 'app-task-list-component',
  standalone: true,
  imports: [AsyncPipe, NoTaskComponent],
  template: `
    <div class="mt-8">
      @if (tasks$ | async) {
        @if (numberOfTasks() > 0) {
          @for (task of tasks(); track task.id) {
            <div class="flex flex-row justify-start mb-4 items-center gap-4">
              <span>{{ task.title }}</span>
              <!-- <app-update-task /> -->
              <!-- <app-delete-task /> -->
            </div>
          }
        } @else {
          <app-no-task-component
            alt="Nenhuma tarefa adicionada"
            imageUrl="no_data.svg"
            message="Nenhuma tarefa adicionada 😔 " />
        }
      }
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private tasksService = inject(TaskService);

  public tasks$ = this.tasksService.getTasks();

  public tasks = this.tasksService.tasks;

  public numberOfTasks = this.tasksService.numberOfTasks;
}
