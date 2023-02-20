export class DomainError extends Error {
  _parameter: object;
  getLogErrorMessage(url: string) {
    let errorMessage = `Domain Exception ${this.message} url=${url}`;
    if (this._parameter) {
      errorMessage += `, parameter = ${JSON.stringify(this._parameter)}`;
    }
    return errorMessage;
  }
}
