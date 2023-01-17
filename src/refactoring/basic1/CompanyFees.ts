import { CompanyFee } from './CompanyFee';
import { CompanySelling } from './type/CompanySelling';

export class CompanyFees {
  private readonly items: CompanyFee[];

  constructor(items: CompanySelling[]) {
    this.items = items.map((c) => new CompanyFee(c));
  }

  get sendableItems(): CompanyFee[] {
    return this.items.filter((item) => item.isSend);
  }
}
