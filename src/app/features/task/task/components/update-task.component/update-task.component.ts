import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskService } from '../../../../category/services/task.service';
import { Task } from '../../../../category/model/task.model';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [MatCheckboxModule],
  template: `
    <mat-checkbox
      [checked]="task().isCompleted"
      (change)="toggleComplete()"
      color="primary">
    </mat-checkbox>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTaskComponent {
  private readonly taskService = inject(TaskService);

  public task = input.required<Task>();

  public toggleComplete(): void {
    const nextCompletedState = !this.task().isCompleted;

    this.taskService
      .updateTaskCompletionStatus(this.task().id, nextCompletedState)
      .subscribe({
        next: savedTask => {
          this.taskService.updateATaksInTheTasksList(savedTask);
        },
        error: err => {
          console.error('Erro ao atualizar tarefa:', err);
        },
      });
  }
}
