import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {House} from '../types/house';
import {HouseService} from '../Services/house.service';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css',
})
export class HouseListComponent {
  houses: House[] = [];

  constructor(private houseService: HouseService, private router: Router) {}

  ngOnInit(): void {
    this.houseService.getHouses().subscribe((h) => (this.houses = h));
  }

  navigateToHouse(id: number) {
    this.router.navigate([`/house/${id}`]);
  }

  addHouse() {
    const newHouse: House = {
      id: 3,
      address: '32 Valley Way, New York',
      description: '',
      country: 'USA',
      price: 1000000,
      photo: '',
    };
    this.houses.push(newHouse);
  }
}
