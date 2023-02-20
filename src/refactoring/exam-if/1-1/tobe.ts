export class DomainError extends Error {
  _parameter: object;
  getLogErrorMessage(url: string) {
    const parameterMessage = this._parameter
      ? `parameter = ${JSON.stringify(this._parameter)}`
      : '';
    return `Domain Exception ${this.message}, url=${url}, ${parameterMessage}`;
  }
}
