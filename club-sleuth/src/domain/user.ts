import { Clubs } from './club';

export type User = {
  _id: string;
  activated: boolean;
  clubs: Clubs[];
  email: string;
  firstName: string;
  lastName: string;
};
