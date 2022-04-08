import { Prisma, User } from '@prisma/client';
import { IUser } from '../interfaces/entity';
import { prisma } from '../config/prisma';

class UserRepository {
  private userEntity: Prisma.UserDelegate<false> = prisma.user;
  public async insertUser({ password, username }: IUser): Promise<User | null> {
    try {
      const user = await this.userEntity.create({
        data: { username, password },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2002') throw new Error('username already use');
      return null;
    }
  }
  public async getUserByUsername(username: string): Promise<User | null> {
    try {
      return await this.userEntity.findFirst({
        where: {
          username,
        },
      });
    } catch (error) {
      return null;
    }
  }
}

export default UserRepository;
