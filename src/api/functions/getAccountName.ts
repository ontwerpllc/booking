import type { Account } from '../types/account';

export function getAccountName(account: Account) {
  return `${account.firstName} ${account.lastName}`;
}
