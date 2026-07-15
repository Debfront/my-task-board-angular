import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../../category/services/task.service';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  template: `
    <button
      type="button"
      mat-icon-button
      color="warn"
      (click)="deleteTask()"
      aria-label="Deletar tarefa">
      <mat-icon class="text-red-600">delete</mat-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteTaskComponent {
  private readonly taskService = inject(TaskService);

  public taskId = input.required<string>();

  public deleteTask(): void {
    if (confirm('Deseja realmente excluir esta tarefa?')) {
      this.taskService.deleteTask(this.taskId()).subscribe({
        next: () => {
          this.taskService.deleteATaskFromTheTasksList(this.taskId());
        },
        error: err => {
          console.error('Erro ao deletar tarefa:', err);
        },
      });
    }
  }
}
