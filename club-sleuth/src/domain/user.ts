import { Club } from './club';

export type User = {
  _id: string;
  activated: boolean;
  clubs: Array<Club>;
  email: string;
  firstName: string;
  lastName: string;
};
