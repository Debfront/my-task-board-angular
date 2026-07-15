import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { TaskService } from '../../../../category/services/task.service';
// 1. IMPORTANTE: Importe o seu CategoryService (ajuste o caminho se necessário)
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
          <!-- Container de cada tarefa -->
          <div
            class="flex flex-row justify-between items-center mb-4 p-2 rounded hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            <!-- Lado Esquerdo: Checkbox + Texto da Tarefa -->
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
  // 2. Injeta o serviço que gerencia as categorias
  private readonly categoryService = inject(CategoryService);

  public tasks = this.tasksService.tasks;
  public numberOfTasks = this.tasksService.numberOfTasks;

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe();
  }

  /**
   * 3. Método auxiliar para descobrir a cor da categoria com base no ID
   */
  public getCategoryColor(categoryId: string): string {
    // Busca a categoria correspondente na lista do seu CategoryService
    const category = this.categoryService
      .categories()
      .find(c => c.id === categoryId);

    // Retorna a cor da categoria encontrada ou uma cor padrão (cinza/currentColor) se não achar
    return category ? category.color : 'currentColor';
  }
}
