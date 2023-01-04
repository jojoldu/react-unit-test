import { JobLevel } from '../../../category';

export class PositionSummary {
  private readonly _columns: PositionColumn[] = [];

  constructor(properties: PositionColumn[]) {
    this._columns = properties;
  }

  // @ts-ignore
  static byJobApplicant(jobApplicant) {
    const { positionTitle, companyName, positionJobLevel, positionEndedAt } =
      jobApplicant;

    return this.of(
      positionTitle,
      companyName,
      positionJobLevel,
      positionEndedAt,
    );
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
      new PositionColumn('공고명', positionTitle),
      new PositionColumn('회사명', companyName),
      PositionColumn.newJobLevel(positionJobLevel),
      PositionColumn.newEndedAt(positionEndedAt),
    ]);
  }

  get columns(): PositionColumn[] {
    return this._columns;
  }
}

class PositionColumn {
  private readonly _title: string;
  private readonly _value: string;

  constructor(title: string, value: string) {
    this._title = title;
    this._value = value;
  }

  static newEndedAt(endedAt: string | Date) {
    const date = endedAt instanceof Date ? String(endedAt) : endedAt;

    return new PositionColumn(
      '마감일',
      date === '9999. 12. 31.' ? '채용 시 마감' : date,
    );
  }

  static newJobLevel(
    jobLevel: 'IRRELEVANT' | 'INTERN' | 'BEGINNER' | 'JUNIOR' | 'SENIOR',
  ) {
    return new PositionColumn('직급', JobLevel[jobLevel]);
  }

  get title(): string {
    return this._title;
  }

  get value(): string {
    return this._value;
  }
}
