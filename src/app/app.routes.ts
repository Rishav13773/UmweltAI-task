import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './private/component/home/home.component';

import { ProjectDetailsComponent } from './private/component/project-details/project-details.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [LoginGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'project/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard],
  },
];
