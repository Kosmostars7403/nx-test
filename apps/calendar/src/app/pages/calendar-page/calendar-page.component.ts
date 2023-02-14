import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarComponent} from '../../widgets/calendar/calendar.component';

@Component({
  selector: 'nx-test-calendar-page',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
})
export class CalendarPageComponent {}
