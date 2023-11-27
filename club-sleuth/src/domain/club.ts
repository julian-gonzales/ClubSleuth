export type Clubs = {
  clubs: Club[];
};

export type Club = {
  _id?: string;
  name: string;
  members: string;
  description: string;
  province: string;
  city: string;
  country: string;
  reoccuringEvents?: ReoccuringEvents[];
  futureEvents?: FutureEvents[];
  active: boolean;
  participation: string;
  lastUpdated?: Date;
  user: string;
  website?: string;
};

export type ReoccuringEvents = {
  when: string;
  date: string;
  time: string;
  location: string;
  description: string;
  title: string;
  memberOnly: boolean;
  fee: number;
};
export type FutureEvents = {
  date: string;
  location: string;
  time: string;
  description: string;
  title: string;
  memberOnly: boolean;
};
