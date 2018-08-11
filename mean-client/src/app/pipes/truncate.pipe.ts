import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

  transform(value: any, textLength?: number): any {

    const stringPos = textLength ? textLength : 200;

    const temp = value.substring(0, stringPos) + '...';

    return temp;
  }

}