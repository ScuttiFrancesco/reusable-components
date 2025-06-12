import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    return this.getTimeAgo(date);
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime() - (2 * 60 * 60 * 1000);
    const isFuture = diffMs < 0;
    const absValue = Math.abs(diffMs);
    
    const seconds = Math.floor(absValue / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const secondsStr = seconds % 60 !== 0 ? `${seconds % 60} second${seconds % 60 !== 1 ? 's' : ''}` : '';
    const minutesStr = minutes % 60 !== 0 ? `${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}` : '';
    const hoursStr = hours % 24 !== 0 ? `${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}` : '';
    const daysStr = days % 30 !== 0 ? `${days % 30} day${days % 30 !== 1 ? 's' : ''}` : '';
    const monthsStr = months % 12 !== 0 ? `${months % 12} month${months % 12 !== 1 ? 's' : ''}` : '';
    const yearsStr = years !== 0 ? `${years} year${years !== 1 ? 's' : ''}` : '';

    const parts: string[] = [yearsStr, monthsStr, daysStr, hoursStr, minutesStr, secondsStr];

   console.log('Time difference:', diffMs)
    const nonEmptyParts = parts.filter(part => part !== '');
    const timeString = nonEmptyParts.length > 1 ? nonEmptyParts.join(', ') :  nonEmptyParts.join('');
    const replacedTimeString = timeString.replace(/, ([^,]*)$/, ' and $1');
    
    return isFuture ? `in ${replacedTimeString}` : `${replacedTimeString} ago`;
  }
}
