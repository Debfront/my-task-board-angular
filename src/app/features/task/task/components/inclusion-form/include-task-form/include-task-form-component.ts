import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../category/services/category.service';
import { createTaskForm } from '../../../../constants/create-task-form';
import { TaskService } from '../../../../../category/services/task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, finalize } from 'rxjs';
import { NgClass } from '@angular/common';
import { SnackBarService } from '../../../../../../shared/services/snack-bar.service';

const MODDULES = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
];

const COMMONS = [NgClass];

@Component({
  selector: 'app-include-task-form',
  standalone: true,
  imports: [...MODDULES, ...COMMONS],
  template: `<form
    [ngClass]="{
      'cursor-not-allowed animate-pulse': isIncludeTaskFormDisabled(),
      'cursor-pointer': !isIncludeTaskFormDisabled(),
    }"
    autocomplete="off"
    class="flex flex-row gap-2 select-none"
    [formGroup]="newTaskForm">
    <mat-form-field class="w-full">
      <mat-label>Tarefa</mat-label>
      <input
        formControlName="title"
        matInput
        placeholder="Adicionar tarefa"
        (keyup.enter)="onEnterToAddTask()" />
      <mat-hint class="text-tertiary">Aperte enter para adicionar</mat-hint>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Categoria</mat-label>
      <mat-select
        formControlName="categoryId"
        (selectionChange)="selectionChangeHandler($event)"
        (keyup.enter)="onEnterToAddTask()">
        @for (category of categories(); track category.id) {
          <mat-option value="{{ category.id }}">
            {{ category.name }}
          </mat-option>
        }
      </mat-select>
    </mat-form-field>
  </form>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncludeTaskFormComponent {
  private readonly categoryService = inject(CategoryService);

  private readonly taskService = inject(TaskService);

  public readonly categories = this.categoryService.categories;

  public newTaskForm = createTaskForm();

  private readonly destroy$ = inject(DestroyRef);

  private readonly snackBarService = inject(SnackBarService);

  public isIncludeTaskFormDisabled = computed(() => {
    if (this.taskService.isLoading()) {
      this.newTaskForm.disable();

      return this.taskService.isLoading();
    }
    this.newTaskForm.enable();

    return this.taskService.isLoading();
  });

  public selectionChangeHandler(event: MatSelectChange): void {
    const categoryId = event.value;

    this.categoryService.selectedCategoryId.set(categoryId);
  }

  public onEnterToAddTask(): void {
    if (!this.newTaskForm.valid) return;

    this.taskService.isLoading.set(true);

    const { title, categoryId } = this.newTaskForm.value;

    const newTask = {
      title,
      categoryId,
      isCompleted: false,
    };

    this.taskService
      .createTask(newTask)
      .pipe(
        delay(4000),
        finalize(() => this.taskService.isLoading.set(false)),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe({
        next: task => this.taskService.insertATasksInTheTasksList(task),
        error: error => {
          this.snackBarService.showSnackBar(error.message, 4000, 'end', 'top');
        },
        complete: () => {
          this.snackBarService.showSnackBar(
            'Tarefa incluída com sucesso!',
            4000,
            'end',
            'top'
          );
        },
      });
  }
}
