import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { HorarioAdapter, PageAdapter } from '@app/adapters';
import { Cita, Column, DiaSemana, EstadoCita, getHorariosRestantesDeLaSemana, Horario, Page, pageDefault } from '@app/core/models';
import { AuthService, CitaService, HorarioService } from '@app/core/services';
import { firstValueFrom, map, Observable, of } from 'rxjs';
import { TableComponent } from "../../../shared/components/table/table.component";
import { PaginatorComponent } from "../../../shared/components/paginator/paginator.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [AsyncPipe, TableComponent, PaginatorComponent],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorarioComponent implements OnInit{
  pageInfo: Page = pageDefault;
  horarioService = inject(HorarioService);
  citaservice = inject(CitaService);
  especialidadId!: number;
  doctorId!: number;
  horarios$: Observable<Horario[]> = of([]);
  selectedHorario!: Horario;
  route = inject(ActivatedRoute)
  router = inject(Router);
  authService = inject(AuthService);


  ngOnInit(): void {
    this.especialidadId =  Number(this.route.snapshot.paramMap.get('especialidadId'));
    this.doctorId =  Number(this.route.snapshot.paramMap.get('doctorId'));
    if(this.especialidadId && this.doctorId){
      this.horarios$ = this.loadHorarios(this.especialidadId, this.doctorId, this.pageInfo.number).pipe(
        map(horarios => getHorariosRestantesDeLaSemana(horarios))
      );
    }
  }

  loadHorarios(especialidadId: number, doctorId: number, pageNumber: number): Observable<Horario[]> {
    return this.horarioService.findByEspecialidadAndDoctor(especialidadId, doctorId, pageNumber).pipe(
      map((horarioPage) => {
        this.pageInfo = PageAdapter(horarioPage);
        return  HorarioAdapter(horarioPage);
      })
    );
  }

  async onElementSelected($event: Horario) {
    try {
      const data = await firstValueFrom(this.authService.getPacienteByUser()); 
      const cita: Cita = {
        horario: $event,
        paciente: data,
        id: 0,
        fecha: '',
        estado: EstadoCita.PENDIENTE
      };
      const newCita = await firstValueFrom(this.citaservice.createCita(cita));
      this.router.navigate(['patient/cita', newCita.id]);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  onPageChange($event: Page) {
    this.horarios$ = this.loadHorarios(this.especialidadId, this.doctorId, $event.number).pipe(
      map(horarios => getHorariosRestantesDeLaSemana(horarios))
    );
  }

  columns: Column[] = [
    {field: "dia", header: "DIA"},
    {field: "horaInicio", header: "Hora Inicio"},
    {field: "horaFin", header: "Hora Fin"},
  ]

}
