import { CompanySelling } from './type/CompanySelling';

export class CompanyFee {
  private readonly _sellingAmount: number;
  private readonly _commission: number;
  private readonly _bankCode: string;

  constructor(companySelling: CompanySelling) {
    this._sellingAmount = companySelling.sellingAmount;
    this._commission = companySelling.commission;
    this._bankCode = companySelling.bankCode;
  }

  get isSend(): boolean {
    return this.fee >= 100;
  }

  get fee(): number {
    return this._sellingAmount * this._commission;
  }

  get bankCode(): string {
    return this._bankCode;
  }
}
