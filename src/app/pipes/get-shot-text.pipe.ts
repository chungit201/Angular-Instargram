import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getShotText',
})
export class GetShotTextPipe implements PipeTransform {
  transform(text: any, ...args: unknown[]): string {
    if (text.length > 21) {
      return `${text.substr(0, 21)}...`;
    }
    return text;
  }
}
