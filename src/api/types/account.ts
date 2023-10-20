import { Preference } from './preference';

export type Account = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  preference: Preference;
};
