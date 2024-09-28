import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './private/component/home/home.component';
import { AuthGuard } from './auth.guard';
import { ProjectDetailsComponent } from './private/component/project-details/project-details.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'project/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard],
  },
];
