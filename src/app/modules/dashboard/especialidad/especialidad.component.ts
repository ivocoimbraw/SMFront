import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EspecialidadAdapter, PageAdapter } from '@app/adapters';
import { Especialidad, Page, pageDefault } from '@app/core/models';
import { PaginatorComponent, TableComponent } from '@app/shared/components';
import { EspecialidadService } from '@app/core/services';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [AsyncPipe, TableComponent, PaginatorComponent],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EspecialidadComponent {
  especialidadService = inject(EspecialidadService);
  pageInfo: Page = pageDefault;
  especialidades$: Observable<Especialidad[]> = this.loadEspecialidades(pageDefault.number);

  loadEspecialidades(pageNumber: number): Observable<Especialidad[]> {
    return this.especialidadService.findAllEspecialidad(pageNumber).pipe(
      map((especialidadesPage) => {
        this.pageInfo = PageAdapter(especialidadesPage);
        return EspecialidadAdapter(especialidadesPage);
      })
    )
  }

  onPageChange(newPage: Page) {
    this.especialidades$ = this.loadEspecialidades(newPage.number);
  }

  onElementSelected($event: Especialidad) {
    console.log($event.id);
  }

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
  ]
}
