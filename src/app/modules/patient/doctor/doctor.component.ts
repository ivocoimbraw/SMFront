import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { DoctorAdapter, PageAdapter } from '@app/adapters';
import { Column, Doctor, Page, pageDefault } from '@app/core';
import { DoctorEspecialidadService } from '@app/core/services/doctor-especialidad.service';
import { map, Observable, of } from 'rxjs';
import { TableComponent } from "../../../shared/components/table/table.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [AsyncPipe, TableComponent, PaginatorComponent],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorComponent implements OnInit{
  especialidadId!: number;
  doctorEspecialidadService = inject(DoctorEspecialidadService);
  pageInfo: Page = pageDefault;
  doctors$: Observable<Doctor[]> = of([]);
  route = inject(ActivatedRoute)
  router = inject(Router);

  ngOnInit(): void {
    this.especialidadId =  Number(this.route.snapshot.paramMap.get('especialidadId'));
    const id = this.especialidadId;
    if(id){
      this.doctors$ = this.loadDoctors(id, this.pageInfo.number);
    }
  }

  loadDoctors(especialidadId:number, pageNumber: number): Observable<Doctor[]> {
    return this.doctorEspecialidadService.getDoctors(especialidadId, pageNumber).pipe(
      map((doctorPage) => {
        console.log(doctorPage);
        this.pageInfo = PageAdapter(doctorPage);
        return DoctorAdapter(doctorPage);
      })
    );
  }

  onElementSelected(doctorSelected: Doctor) {
    const doctorId: number = doctorSelected.id;
    this.router.navigate(['patient/horario', this.especialidadId, 'doctor', doctorId]);
  }

  onPageChange($event: Page) {
    this.pageInfo = $event;
    const id = this.especialidadId;
    if(id){
      this.doctors$ = this.loadDoctors(id, this.pageInfo.number);
    }
  }

  columns: Column[] = [
    {field: 'name', header: 'Name'},
    {field: 'lastName', header: 'Last Name'},
  ]
}
