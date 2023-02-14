import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from "luxon";

const CALENDAR_ROWS_COUNT = 6
const DAYS_IN_WEEK = 7
const FIRST_DAY_OF_THE_WEEK = 2

@Component({
  selector: 'nx-test-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  now = DateTime.now().setLocale('ru-RU')
  month = 3
  year = 2023
  sheet: DateTime[][] = []

  ngOnInit() {
    const month = this.getMonthObject()

    for (let rowIndex = 0; rowIndex < CALENDAR_ROWS_COUNT; rowIndex++) {
      const row: DateTime[] = [];

      for (let colIndex = 0; colIndex < DAYS_IN_WEEK; colIndex++) {
        const day = this.getDayFromMonthRowCol({
          rowIndex,
          colIndex,
          month
        });

        row.push(day);
      }

      this.sheet.push(row);
    }
  }

  getMonthStartDaysOffset = (): number => {
    const startMonthWeekday = DateTime.local(this.year, this.month, 1).weekday;

    return startMonthWeekday >= FIRST_DAY_OF_THE_WEEK
      ? startMonthWeekday - FIRST_DAY_OF_THE_WEEK
      : DAYS_IN_WEEK - (FIRST_DAY_OF_THE_WEEK - startMonthWeekday);
  };

  getMonthObject(monthOffset = 0): DateTime {
    return DateTime.local(this.year, this.month + monthOffset)
  }

  getDayFromMonthRowCol = ({rowIndex, colIndex, month}: {
    rowIndex: number,
    colIndex: number,
    month: DateTime
  }) => {
    let day =
      rowIndex * DAYS_IN_WEEK +
      colIndex -
      this.getMonthStartDaysOffset();


    if (day > month.daysInMonth) {
      day -= month.daysInMonth;
      month = this.getMonthObject(1);
    }

    if (day <= 0) {
      month = this.getMonthObject(-1);
      day = month.daysInMonth + day;
    }

    return DateTime.local(month.year, month.month, day);
  };

}
