export class Session {
  constructor(
    public id: string,
    public name: string,
    public username: string,
    private _token: string,
    private _refresh_token: string,
    private tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }

  get refresh_token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._refresh_token;
  }

  get tokenDuration() {
    if (!this.token) {
      return 0;
    }
    return this.tokenExpirationDate.getTime() - new Date().getTime();
  }
}
