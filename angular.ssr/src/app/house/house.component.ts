import { Component, Input } from '@angular/core';
import {House} from '../types/house';
import {HouseService} from '../Services/house.service';

@Component({
  selector: 'app-house',
  standalone: true,
  imports: [],
  templateUrl: './house.component.html',
  styleUrl: './house.component.css',
})
export class HouseComponent {
  @Input()
  set id(houseId: number) {
    this.houseService.getHouse(houseId).subscribe((h) => (this.house = h));
  }

  house!: House;
  constructor(private houseService: HouseService) {}
}
