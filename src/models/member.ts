import { Record } from './record';

export class Member {
  id: string;
  roomId: string;
  name: string;
  records: any;
  noChange: boolean;
}

export class MemberPay {
  id: string;
  name: string;
  noChange: boolean;
  total: number;
  toPay: number | null;
}
