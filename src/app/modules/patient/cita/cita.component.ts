import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from '@app/core/models';
import { AuthService, CitaService } from '@app/core/services';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitaComponent {
  citaService = inject(CitaService);
  authService = inject(AuthService);
  citaId!:number;
  cita$: Observable<Cita> = of();
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.citaId =  Number(this.route.snapshot.paramMap.get('citaId'));
    if(this.citaId){
      this.cita$ = this.citaService.findCitaById(this.citaId);
    }
  }

}
