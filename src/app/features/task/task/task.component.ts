import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InclusionFormComponent } from './components/inclusion-form/inclusion-form-component';
import { TaskListComponent } from './components/task-list-component/task-list-component';

const COMPONENTS = [InclusionFormComponent, TaskListComponent];

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [...COMPONENTS],
  template: ` <div class="flex flex-col mx-10">
    <!-- Titulo -->

    <span class="font-bold text-4xl">Meu quadro de tarefas</span>

    <!-- Formulario -->
    <app-inclusion-form />
    <!--
    Lista de tarefas -->
    <app-task-list-component />
  </div>`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {}
