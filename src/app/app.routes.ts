import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { NotfoundpageComponent } from './shared/components/notfoundpage/notfoundpage/notfoundpage.component';
import { DoctorComponent } from './modules/dashboard/doctor/doctor.component';
import { DoctorComponent as DoctorPatientComponent } from './modules/patient/doctor/doctor.component';
import { EspecialidadComponent } from './modules/dashboard/especialidad/especialidad.component';
import { ProfileComponent } from './modules/patient/profile/profile.component';
import { ReservaComponent } from './modules/patient/reserva/reserva.component';
import { HorarioComponent } from './modules/patient/horario/horario.component';
import { CitaComponent } from './modules/patient/cita/cita.component';
import { DashboardComponent as DoctorDashboard} from './modules/doctor/dashboard/dashboard.component';
import { CitasComponent } from './modules/doctor/citas/citas.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],
        children: [
            {path: 'doctor', component: DoctorComponent},
            {path: 'especialidad', component: EspecialidadComponent},
        ]
    },

    { path: 'patient', component: ProfileComponent, canActivate: [authGuard], 
        children: [
            {path: 'reserva', component: ReservaComponent},
            {path: 'doctors/:especialidadId', component: DoctorPatientComponent},
            {path: 'horario/:especialidadId/doctor/:doctorId', component: HorarioComponent},
            {path: 'cita/:citaId', component: CitaComponent},
        ]
    },
    { path: 'doctor', component: DoctorDashboard, canActivate: [authGuard], children: [
        {path: 'citas', component: CitasComponent}
    ]},
    { path: '**', component: NotfoundpageComponent }
];
