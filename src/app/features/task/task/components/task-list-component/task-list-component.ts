import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskService } from '../../../../category/services/task.service';
import { DeleteTaskComponent } from '../delete-task.component/delete-task.component';
import { UpdateTaskComponent } from '../update-task.component/update-task.component';
import { NoTaskComponent } from '../no-task-component/no-task-component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgClass, NoTaskComponent, UpdateTaskComponent, DeleteTaskComponent],
  template: `
    <div class="mt-8">
      <!-- Agora validamos diretamente o Signal de tarefas -->
      @if (numberOfTasks() > 0) {
        @for (task of tasks(); track task.id) {
          <!-- Container de cada tarefa -->
          <div
            class="flex flex-row justify-between items-center mb-4 p-2 rounded hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            <!-- Lado Esquerdo: Checkbox + Texto da Tarefa -->
            <div class="flex flex-row items-center gap-4">
              <app-update-task [task]="task" />

              <span
                [ngClass]="{
                  'line-through text-gray-400': task.isCompleted,
                  'text-gray-800 dark:text-gray-100': !task.isCompleted,
                }">
                {{ task.title }}
              </span>
            </div>

            <!-- Lado Direito: Botão de Deletar -->
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

  // Expõe os signals diretamente para o template
  public tasks = this.tasksService.tasks;
  public numberOfTasks = this.tasksService.numberOfTasks;

  ngOnInit(): void {
    // Dispara a busca inicial das tarefas do servidor para popular o Signal
    this.tasksService.getTasks().subscribe();
  }
}
