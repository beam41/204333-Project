import { Member } from './member';

export class Room {
  id: string;
  name: string;
  password: string;
  extraMoney: number;
  member: Member[];
}
