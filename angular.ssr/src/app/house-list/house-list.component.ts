import {Component, effect, inject, signal} from '@angular/core';
import { Router } from '@angular/router';

import {House} from '../types/house';
import {HouseService} from '../Services/house.service';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css',
})
export class HouseListComponent {
  public readonly houses = signal<House[]>([]);
  public readonly houseService = inject(HouseService);
  public readonly auth = inject(AuthService);
  public readonly router = inject(Router);

  public authenticated = this.auth.isAuthenticated;
  public anonymous = this.auth.isAnonymous;

  private fetchHousesEffect = effect(() => {
    if (this.authenticated()) {
      this.houseService.getHouses().subscribe((h) => (this.houses.set(h)));
    }
  });

  navigateToHouse(id: number) {
    this.router.navigate([`/house/${id}`]);
  }

  addHouse() {
    const maxId = Math.max(...this.houses().map(house => house.id), 0);

    const newHouse: House = {
      id: maxId + 1,
      address: '32 Valley Way, New York',
      country: 'USA',
      description: '',
      photo: '',
      price: 1000000,
    };
    this.houses.set([...this.houses(), newHouse]);
    this.houseService.postHouse(newHouse);
  }
}
