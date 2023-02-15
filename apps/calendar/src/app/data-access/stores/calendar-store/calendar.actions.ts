import {DateTime} from 'luxon';

export class GetFlightReports {
  public static readonly type = '[Calendar] get flight reports'

  constructor(public date: string | null) {}
}
