import chaiAsPromised from 'chai-as-promised';
import chai, { expect } from 'chai';
import Hash from '../../src/app/helpers/hash';
import JWTHandler from '../../src/app/helpers/jwtHandler';

chai.use(chaiAsPromised);

const value = 'saddam';
const encryptedValue = '$2b$10$npQom7KC/1AEmeOrnzUqseTgwyYWJtbVL52dd5gK1cgYkH1TzEBTa';

describe('unit', () => {
  describe('testing hash', () => {
    describe('testing hash string', () => {
      it('should be string', async () => {
        const hash = await Hash.hashString(value);
        expect(hash).to.be.a('string');
      });
    });
    describe('testing encrypt', () => {
      it('string match, should be match', async () => {
        const hashed = await Hash.matchingString(value, encryptedValue);
        expect(hashed).to.be.a('boolean');
        expect(hashed).to.eq(true);
      });
      it('string not match, should be not match', async () => {
        const hashed = await Hash.matchingString('sadd', encryptedValue);
        expect(hashed).to.be.a('boolean');
        expect(hashed).to.eq(false);
      });
    });

    describe('testing jwt', () => {
      const jwtHandler = new JWTHandler();
      const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhZGRhbSIsInV1aWQiOiIyMTMyMTMiLCJpYXQiOjE2NDk0MjU3MTIsImV4cCI6MTY0OTQyNTcxNH0.MJLMSY82Inw7kuhvYROJYcNzfP0TDdiv4j_21fCBbUA';
      const expectedValue = {
        username: 'saddam',
        uuid: '213213',
      };
      describe('testing sign', () => {
        it('should return string', () => {
          const result = jwtHandler.generateToken({ username: 'saddam', uuid: '213213' });

          console.log(result);
          expect(result).to.be.a('string');
        });
      });

      describe('testing verify', () => {
        it('should return without error', () => {
          try {
            const result = jwtHandler.matchingToken(jwtToken);

            expect(result).to.include(expectedValue);
          } catch (error) {
            if (error.message.includes('jwt expired')) throw new Error('token expired');
          }
        });
      });
    });
  });
});
