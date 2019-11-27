import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { Base64 } from 'js-base64';
import * as CryptoJS from 'crypto-js';

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

    if (data !== '') {
      try {
        //  Decode and parse required properties
        const json = JSON.parse(Base64.decode(data));
        let _iv = Base64.decode(json.iv);
        let _eKey = Base64.decode(encryptionKey);

        // Create decipher AES-128-CBC
        _eKey = CryptoJS.enc.Base64.parse(encryptionKey);
        _iv = CryptoJS.enc.Base64.parse(json.iv);

        const decipher = CryptoJS.AES.decrypt(json.value, _eKey, { iv: _iv });

        // Return decrypted in string format
        return decipher.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        log.debug(error);
        return '';
      }
    } else {
      return '';
    }
  }
}
