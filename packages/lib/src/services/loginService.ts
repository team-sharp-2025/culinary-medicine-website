import { prisma } from '../../prisma';

export async function authenticateUser(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.password !== password) {
    return { success: false, message: 'Invalid username or password' };
  }

  return {
    success: true,
    userId: user.id,
  };
}
