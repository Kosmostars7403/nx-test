import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {CommonUiSidebarComponent} from '@nx-test/common-ui/sidebar';
import { DateTime } from "luxon";
import {BehaviorSubject, Subject} from 'rxjs';

const CALENDAR_ROWS_COUNT = 6
const DAYS_IN_WEEK = 7
const FIRST_DAY_OF_THE_WEEK = 2
const MONTHS_IN_YEAR = 12

@Component({
  selector: 'nx-test-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CommonUiSidebarComponent,
    RouterModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  chosenDay$ = new Subject<DateTime | null>()
  currentMonth = DateTime.now().setLocale('ru-RU')
  month$ = new BehaviorSubject<{month: number, year: number}>({month: 2, year: 2023})

  sheet: DateTime[][] = []

  ngOnInit() {
    this.month$.subscribe(({month, year}) => {
      this.currentMonth = DateTime.local(year, month).setLocale('ru-RU')
      this.recalculateSheet(month, year)
    })
  }

  recalculateSheet(monthNum: number, year: number) {
    this.sheet = []
    const month = this.getMonthObject(monthNum, year)

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

  getMonthStartDaysOffset = (month: DateTime): number => {
    const startMonthWeekday = DateTime.local(month.year, month.month, 1).weekday;

    return startMonthWeekday >= FIRST_DAY_OF_THE_WEEK
      ? startMonthWeekday - FIRST_DAY_OF_THE_WEEK
      : DAYS_IN_WEEK - (FIRST_DAY_OF_THE_WEEK - startMonthWeekday);
  };

  getMonthObject(month: number, year: number): DateTime {
    return DateTime.local(year, month)
  }

  getDayFromMonthRowCol = ({rowIndex, colIndex, month}: {
    rowIndex: number,
    colIndex: number,
    month: DateTime
  }) => {
    let day =
      rowIndex * DAYS_IN_WEEK +
      colIndex -
      this.getMonthStartDaysOffset(month);

    if (day > month.daysInMonth) {
      day -= month.daysInMonth;
      month = month.plus({month:1})
    }

    if (day <= 0) {
      month = month.minus({month:1});
      day = month.daysInMonth + day;
    }

    return DateTime.local(month.year, month.month, day);
  };

  changeMonth(increment: number) {
    const {month, year} = this.month$.value

    if (month + increment > MONTHS_IN_YEAR) {
      this.month$.next({month: 1, year: year + 1})
      return
    }

    if (month + increment < 0) {
      this.month$.next({month: 12, year: year - 1})
      return
    }

    this.month$.next({month: month + increment, year})
  }

  pickDay(target: EventTarget | null) {
    const cellDataset = (target as HTMLElement)?.dataset
    if ('day' in cellDataset && cellDataset['day']) {
      this.chosenDay$.next(DateTime.fromISO(cellDataset['day']))
    }
  }

  clearChosenDay() {
    this.chosenDay$.next(null)
  }
}
