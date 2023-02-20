import { fetchUser } from './fetchUser';
import { getFee } from './getFee';

export async function calculateFee(userId: number) {
  const user = await fetchUser(`/api/user?id=${userId}`);
  if (user) {
    if (user.level === 'GREEN' || user.level === 'RED') {
      if (user.region === 'SEOUL') {
        return getFee(user);
      }
      throw new Error(`${userId} is Not Seoul Region`);
    } else {
      throw new Error(`${userId} is Not GREEN or RED Level`);
    }
  } else {
    throw new Error('User NotFound!');
  }
}
