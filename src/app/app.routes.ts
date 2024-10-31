import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { NotfoundpageComponent } from './shared/components/notfoundpage/notfoundpage/notfoundpage.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path: '**', component: NotfoundpageComponent }
];
