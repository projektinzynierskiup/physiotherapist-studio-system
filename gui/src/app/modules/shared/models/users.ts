import {Massage} from "./massage";

export interface Users {
  id: number;
  email: string;
  username: string;
  surname: string;
  password: string;
  localTime: string;
  massageDTO: Massage;
}
