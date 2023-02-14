import {Component, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CesiumMapDirective} from './cesium-map.directive';

@Component({
  selector: 'nx-test-map',
  standalone: true,
  imports: [CommonModule, CesiumMapDirective],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {

}
