import { User } from './User';

export function getFee(user: User) {
  return 100 + user.bonus;
}
