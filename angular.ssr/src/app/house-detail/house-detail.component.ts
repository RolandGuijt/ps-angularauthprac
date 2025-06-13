import { Component, OnInit, inject, signal } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { House } from '../types/house';
import { HouseService } from '../Services/house.service';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css'
})
export class HouseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private houseService = inject(HouseService);

  house = signal<House>({ id: 0, address: '', country: '', description: '', photo: '', price: 0});
  error = signal<string>('');

  ngOnInit() {
    // Get the id from the route parameter
    this.route.params.subscribe(params => {
      const houseId = Number(params['id']);
      if (houseId) {
        this.getHouse(houseId);
      }
    });
  }

  private getHouse(id: number) {
    this.houseService.getHouse(id).subscribe({
      next: (house) => this.house.set(house),
      error: () => this.error.set('Failed to load house details')
    });
  }
}
