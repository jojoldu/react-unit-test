import { fetchUser } from './fetchUser';
import { getFee } from './getFee';

export async function calculateFee(userId: number) {
  const user = await fetchUser(`/api/user?id=${userId}`);

  if (!user) {
    throw new Error('User NotFound!');
  }

  if (user.level !== 'GREEN' && user.level !== 'RED') {
    throw new Error(`${userId} is Not GREEN or RED Level`);
  }

  if (user.region !== 'SEOUL') {
    throw new Error(`${userId} is Not Seoul Region`);
  }

  return getFee(user);
}
