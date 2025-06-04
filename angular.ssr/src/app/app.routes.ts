import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import { UserSessionComponent } from './user-session/user-session.component';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseComponent} from './house/house.component';

export const routes: Routes = [
  { path: '', component: HouseListComponent, pathMatch: 'full' },
  { path: 'user-session', component: UserSessionComponent },
  { path: 'house/:id', component: HouseComponent },
];
