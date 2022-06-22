import axios from 'axios';

export default function httpApi(httpClient: any) {
  return (url: string, options: object) =>
    httpClient(url, options)
      .then((data: { json: any; }) => data.json)
      .catch((error: any) => console.log(error));
}

export class Member {
  private job: Job;
  constructor() { // Ioc <- 제어의역전
    this.job = new Developer();
  }

  test() {
    vallidate(this);
    this.name = `test1`;
    this.job.send(this);
    console.log();
    return;
  }
}


new Member();
new Member2(new Developer());
new Member2(new StubDeveloper());

export class StubDeveloper implements Job{
  private _data: any;

  send(memberInfo) {
    this._data = memberInfo;
  }

  get data(): any {
    return this._data;
  }
}

export class Member2 {
  private job: Job;
  constructor(job) {
    this.job = job;
  }

  test() {
    this.job.send(this);
    console.log();
    return;
  }
}


interface Job{
  send(memberInfo);
}

class Developer implements Job {
  send(memberInfo) {
    await api.post(memberInfo);
  }
}

class PO implements Job {
  send() {
    await db.save();
  }
