import { CategoryService } from './../../services/category.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MainListComponent } from '../../components/main-list/main-list.component';
import { ColorsListComponent } from '../../components/colors-list/colors-list.component';

const COMPONENTS = [MainListComponent, ColorsListComponent];

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [...COMPONENTS], // Removido o ...PIPES daqui
  template: `
    <div class="flex flex-col justify-between itens-center h-full w-full">
      <app-main-list />
      <app-colors-list />
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  private readonly categoryService = inject(CategoryService);
}
