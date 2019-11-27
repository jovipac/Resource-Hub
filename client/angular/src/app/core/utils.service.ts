import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import * as CryptoJS from 'crypto-js';
import * as EncUtf8 from 'crypto-js/enc-utf8';

const log = new Logger('UtilsService');

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  /** Decrypts Laravel encrypted data
   *
   * @type {Function}
   * @param {string} app - Express app instance, must have encryptionKey and decryptionCache defined on it during init
   * @param {function} data - Base64 encoded encryption string as created by Laravel
   * @access public
   */

  decryptAES(encryptionKey: string, data: string): string {
    // If no data - return blank string
    const JsonFormatter = {
      stringify: (cipherParams: any) => {
        // create json object with ciphertext
        const jsonObj: any = {
          ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
        };
        // optionally add iv and salt
        if (cipherParams.iv) {
          jsonObj.iv = cipherParams.iv.toString();
        }
        if (cipherParams.salt) {
          jsonObj.s = cipherParams.salt.toString();
        }
        // stringify json object
        return JSON.stringify(jsonObj);
      },
      parse: (jsonStr: any) => {
        // parse json string
        const jsonObj = JSON.parse(jsonStr);
        // extract ciphertext from json object, and create cipher params object
        const cipherParams = (CryptoJS as any).lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });
        // optionally extract iv and salt
        if (jsonObj.iv) {
          cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
        }
        if (jsonObj.s) {
          cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
        }
        return cipherParams;
      }
    };

    if (data !== '') {
      try {
        //  Decode and parse required properties
        const b64 = atob(data);
        const json = JSON.parse(b64);
        let _iv = atob(json.iv);
        let _value = atob(json.value);
        let _eKey = atob(encryptionKey);
        // Create decipher AES-128-CBC
        _iv = CryptoJS.enc.Base64.parse(json.iv);
        _eKey = CryptoJS.enc.Base64.parse(encryptionKey);
        _value = CryptoJS.enc.Base64.parse(json.value);

        const decipher = CryptoJS.AES.decrypt(_value, _eKey, { iv: _iv });

        // Decrypt
        let decrypted = '';
        log.debug(decipher.toString(EncUtf8));
        decrypted = decipher.toString(CryptoJS.enc.Utf8);

        return decrypted;
      } catch (e) {
        log.debug(e);
        return '';
      }
    } else {
      return '';
    }
  }
}
