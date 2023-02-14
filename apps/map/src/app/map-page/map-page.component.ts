import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'nx-test-map-page',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent {}
