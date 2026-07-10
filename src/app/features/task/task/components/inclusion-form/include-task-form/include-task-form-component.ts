import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../category/services/category.service';

const MODDULES = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
];

@Component({
  selector: 'app-include-task-form',
  standalone: true,
  imports: [...MODDULES],
  template: `<form autocomplete="off" class="flex flex-row gap-2 select-none">
    <mat-form-field class="w-full">
      <mat-label>Tarefa</mat-label>
      <input matInput placeholder="Adicionar tarefa" />
      <mat-hint class="text-tertiary">Aperte enter para adicionar</mat-hint>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Categoria</mat-label>
      <mat-select>
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

  public readonly categories = this.categoryService.categories;
}
