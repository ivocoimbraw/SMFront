import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EspecialidadAdapter, PageAdapter } from '@app/adapters';
import { Column, Especialidad, Page, pageDefault } from '@app/core/models';
import { EspecialidadService } from '@app/core/services';
import { map, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorComponent, TableComponent } from '@app/shared/components';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [AsyncPipe, TableComponent, PaginatorComponent],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservaComponent {
  especialidadService = inject(EspecialidadService);
  pageInfo: Page = pageDefault;
  especialidades$: Observable<Especialidad[]> = this.loadEspecialidades(pageDefault.number);
  router = inject(Router);
  route = inject(ActivatedRoute);

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
    //enviar a otro componente con "especialidadId"
    this.router.navigate(['../doctors', $event.id], {relativeTo: this.route});
  }

  columns: Column[] = [
    { field: 'name', header: 'Name' },
  ]

}
