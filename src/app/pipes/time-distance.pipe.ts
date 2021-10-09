import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'timeDistance',
})
export class TimeDistancePipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): unknown {
    const startDay = moment(value);
    const endDay = moment();
    const year = endDay.diff(startDay, 'year');
    const month = endDay.diff(startDay, 'months');
    const day = endDay.diff(startDay, 'days');
    const hour = endDay.diff(startDay, 'hours');
    const minute = endDay.diff(startDay, 'minutes');
    const second = endDay.diff(startDay, 'seconds');
    if (second < 60) {
      return second + ' second ago';
    } else if (minute < 60) {
      return minute + ' minute ago';
    } else if (hour < 24) {
      return hour + ' hour ago';
    } else if (day < 30) {
      return day + ' day ago';
    } else if (month < 12) {
      return month + ' month ago';
    } else {
      return year + ' year ago';
    }
  }
}
