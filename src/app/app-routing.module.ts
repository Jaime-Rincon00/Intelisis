import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';
import { EmployesComponent } from './components/employes/employes.component';
import { CreateEmployeComponent } from './components/create-employe/create-employe.component';
import { UpdateEmployeComponent } from './components/update-employe/update-employe.component';
// import { LoginComponent } from './components/login/login.component';
// import { LoginGuard } from './guard/login.guard';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'card', component: SearchComponent, canActivate: [LoginGuard] },
  // { path: 'search', component: SearchComponent },
  { path: 'employes', component: EmployesComponent },
  { path: 'create', component: CreateEmployeComponent },
  { path: 'update/:id', component: UpdateEmployeComponent },
  { path: 'employe/:id', component: CardComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'employes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
