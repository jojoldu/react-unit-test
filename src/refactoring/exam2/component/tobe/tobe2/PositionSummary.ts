import { JobLevel } from '../../../category';

export class PositionSummary {
  private readonly _properties: PositionProperty[] = [];

  constructor(properties: PositionProperty[]) {
    this._properties = properties;
  }

  static of(
    positionTitle: string,
    companyName: string,
    positionJobLevel:
      | 'IRRELEVANT'
      | 'INTERN'
      | 'BEGINNER'
      | 'JUNIOR'
      | 'SENIOR',
    positionEndedAt: string,
  ) {
    return new PositionSummary([
      new PositionProperty('공고명', positionTitle),
      new PositionProperty('회사명', companyName),
      PositionProperty.newJobLevel(positionJobLevel),
      PositionProperty.newEndedAt(positionEndedAt),
    ]);
  }

  get properties(): PositionProperty[] {
    return this._properties;
  }
}

class PositionProperty {
  private readonly _title: string;
  private readonly _value: string;

  constructor(title: string, value: string) {
    this._title = title;
    this._value = value;
  }

  static newEndedAt(endedAt: string | Date) {
    const date = endedAt instanceof Date ? String(endedAt) : endedAt;

    return new PositionProperty(
      '마감일',
      date === '9999. 12. 31.' ? '채용 시 마감' : date,
    );
  }

  static newJobLevel(
    jobLevel: 'IRRELEVANT' | 'INTERN' | 'BEGINNER' | 'JUNIOR' | 'SENIOR',
  ) {
    return new PositionProperty('직급', JobLevel[jobLevel]);
  }

  get title(): string {
    return this._title;
  }

  get value(): string {
    return this._value;
  }
}
