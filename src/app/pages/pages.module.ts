import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { ProfileCotacaoComponent } from './profile/profile-cotacao/profile-cotacao.component';
import { ProfileRequestsComponent } from './profile/profile-requests/profile-requests.component';
import { ProfileDataComponent } from './profile/profile-data/profile-data.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    AccountComponent,
    AccountComponent,
    CartComponent,
    ProfileComponent,
    ProfileDataComponent,
    ProfileRequestsComponent,
    ProfileCotacaoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    CartComponent,
    ProfileDataComponent,
    RegisterComponent
  ]
})
export class PagesModule { }
