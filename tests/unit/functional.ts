import chaiAsPromised from 'chai-as-promised';
import chai, { expect } from 'chai';
import Hash from '../../src/app/helpers/hash';

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
  });
});
