import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FlightReport} from '../../data-access/interfaces/flight.model';

@Component({
  selector: 'nx-test-calendar-flights',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './calendar-flights.component.html',
  styleUrls: ['./calendar-flights.component.scss'],
})
export class CalendarFlightsComponent {
  @Input() flightReports: FlightReport[] = []
  showFlight = false

}
