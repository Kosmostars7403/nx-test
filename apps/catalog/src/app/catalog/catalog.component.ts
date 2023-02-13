import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CesiumDirective} from '../cesium.directive';

@Component({
  selector: 'nx-test-catalog',
  standalone: true,
  imports: [CommonModule, CesiumDirective],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {}
