import { Injectable, PipeTransform } from '@nestjs/common'


@Injectable()
export class ParseNumberPipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case null:        return null;
      case undefined:   return null;
      case 'null':      return null;
      case 'undefined': return null;
      default:          return +value;
    }
  }
}