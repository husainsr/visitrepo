import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginComponent } from "./welcome/login/login.component";
import { MasterComponent } from './master/master.component';
import { FieldComponent } from './field/field.component';

const appRoutes: Routes = [
 {
    path: '', component: WelcomeComponent,
    children: 
    [
     { path: '', component: LoginComponent }
    ]
 },
 {
     path: 'dashboard', component: DashboardComponent,
     children:
     [
      { path: '', component: MasterComponent },
      { path: 'field', component: FieldComponent}   
     ]
 }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }