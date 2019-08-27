import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  static isObject(value): boolean {
    return value !== null && typeof value === 'object';
  }
}