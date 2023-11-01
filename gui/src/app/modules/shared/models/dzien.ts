import {Users} from "./users";

export class Dzien {
  data: Date;
  godziny: number[] = [];
  rezerwacje: { [key: string]: Users } = {};

  constructor(data: Date) {
    this.data = data;
  }
}
