import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskService } from '../../../../category/services/task.service';
import { CategoryService } from '../../../../category/services/category.service';
import { DeleteTaskComponent } from '../delete-task.component/delete-task.component';
import { UpdateTaskComponent } from '../update-task.component/update-task.component';
import { NoTaskComponent } from '../no-task-component/no-task-component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgClass, NoTaskComponent, UpdateTaskComponent, DeleteTaskComponent],
  template: `
    <div class="mt-8">
      @if (numberOfTasks() > 0) {
        @for (task of tasks(); track task.id) {
          <div
            class="flex flex-row justify-between items-center mb-4 p-2 rounded hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            <div class="flex flex-row items-center gap-4">
              <app-update-task [task]="task" />

              <!-- ATUALIZADO: Busca a cor dinamicamente pelo ID da categoria -->
              <span
                [ngClass]="{
                  'line-through opacity-50': task.isCompleted,
                  'font-medium': !task.isCompleted,
                }"
                [style.color]="getCategoryColor(task.categoryId)"
                class="text-lg transition-all">
                {{ task.title }}
              </span>
            </div>

            <app-delete-task [taskId]="task.id" />
          </div>
        }
      } @else {
        <app-no-task-component
          alt="Nenhuma tarefa adicionada"
          imageUrl="no_data.svg"
          message="Nenhuma tarefa adicionada 😔" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  private readonly tasksService = inject(TaskService);
  private readonly categoryService = inject(CategoryService);

  public tasks = this.tasksService.tasks;
  public numberOfTasks = this.tasksService.numberOfTasks;

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe();
  }

  public getCategoryColor(categoryId: string): string {
    const category = this.categoryService
      .categories()
      .find(c => c.id === categoryId);

    return category ? category.color : 'currentColor';
  }
}
