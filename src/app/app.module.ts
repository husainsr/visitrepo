import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { ClarityModule,ClrFormsNextModule } from "@clr/angular";
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './welcome/login/login.component';
import { MasterComponent } from './master/master.component';
import { FieldComponent } from './field/field.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AmazingTimePickerModule } from 'amazing-time-picker-angular6'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    LoginComponent,
    MasterComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    ClrFormsNextModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AmazingTimePickerModule,
    //Angular Material modules
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatStepperModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CdkStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {

 }
