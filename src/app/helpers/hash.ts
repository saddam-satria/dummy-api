import { genSalt, hash, compare } from 'bcrypt';

class Hash {
  public static async hashString(value: string): Promise<string> {
    const salt = await genSalt(10);

    return await hash(value, salt);
  }
  public static async matchingString(value: string, encryptedValue: string): Promise<boolean> {
    return await compare(value, encryptedValue);
  }
}

export default Hash;
