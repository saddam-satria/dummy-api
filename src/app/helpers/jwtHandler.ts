import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces/response';
import fs from 'fs';
import path from 'path';
class JWThandler {
  private secretKey = fs.readFileSync(path.join(__dirname, '../../../privateKey.txt'));
  public generateToken(data: ITokenPayload): string {
    return sign(data, this.secretKey, { expiresIn: '1d' });
  }
  public matchingToken(token: string): string | null | JwtPayload {
    try {
      const result = verify(token, this.secretKey);

      return result;
    } catch (error) {
      if (error) throw error;
      return null;
    }
  }
}

export default JWThandler;
