import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryComponent } from '../../features/category/view/category/category.component';
import { TaskComponent } from '../../features/task/task/task.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CategoryComponent, TaskComponent, MatDividerModule],
  template: `
    <div class="h-screen flex w-full">
      <app-category class="w-1/4" />

      <mat-divider class="h-full opacity-50" vertical />

      <app-task class="w-3/4 pt-10" />
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
