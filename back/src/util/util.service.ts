import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  generateDigit() {
    const minm = 100000;
    const maxm = 999999;
    return (Math.floor(Math.random() * (maxm - minm + 1)) + minm).toString();
  }
}
