import { Record } from './record';

export class Member {
  id: string;
  name: string;
  record: Record[];
  mustPay: number;
  noChange: number;
}
