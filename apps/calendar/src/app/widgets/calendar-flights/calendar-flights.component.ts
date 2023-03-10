import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CesiumDirective, FlightPlanDirective} from '@nx-test/orwell-cesium';
import {FlightReport} from '../../data-access/interfaces/flight.model';

@Component({
  selector: 'nx-test-calendar-flights',
  standalone: true,
  imports: [CommonModule, CesiumDirective, FlightPlanDirective],
  templateUrl: './calendar-flights.component.html',
  styleUrls: ['./calendar-flights.component.scss'],
})
export class CalendarFlightsComponent {
  @Input() flightReports: FlightReport[] = []
  showFlight = false
  createFlight = false
}
