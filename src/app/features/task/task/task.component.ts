import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InclusionFormComponent } from './components/inclusion-form/inclusion-form-component';
import { TaskListComponent } from './components/task-list-component/task-list-component';


@Component({
  selector: 'app-task',
  standalone: true,
  // 1. Coloque os componentes importados DIRETAMENTE aqui:
  imports: [InclusionFormComponent, TaskListComponent],
  template: `
    <div class="flex flex-col mx-10">
      <!-- Titulo -->
      <span class="font-bold text-4xl">Meu quadro de tarefas</span>

      <!-- Formulario -->
      <app-inclusion-form />

      <!-- Lista de tarefas -->
      <app-task-list />
    </div>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {}
