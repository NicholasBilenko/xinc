import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class SecuredStorageService {
  private aes = (CryptoJS as any).AES;
  private enc = (CryptoJS as any).enc;

  constructor(private localStorage: LocalStorageService) {}

  store(key: string, value: any, secret: string): void {
    const encrypted = this.aes.encrypt(JSON.stringify(value), secret);
    this.localStorage.store(key, encrypted.toString());
  }

  retrieve(key: string, secret: string): any {
    const encrypted = this.localStorage.retrieve(key);
    if (encrypted) {
      const decryptedBytes = this.aes.decrypt(encrypted, secret);
      return JSON.parse(decryptedBytes.toString(this.enc.Utf8));
    } else {
      return encrypted;
    }
  }

  clear(key?: string): void {
    this.localStorage.clear(key);
  }
}
