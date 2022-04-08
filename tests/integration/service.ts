import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiPromise from 'chai-as-promised';
// import { server } from '../../../src/server';
import BookRepository from '../../src/app/repositories/bookRepository';

chai.use(chaiHttp);
chai.use(chaiPromise);
// const request = chai.request(server);
const book: BookRepository = new BookRepository();

describe('integration', () => {
  describe('testing book service', () => {
    describe('testing repository', () => {
      describe('GET ALL BOOK', async () => {
        it('should have one data or more', async () => {
          const books = await book.getAll();
          expect(books && books.length > 0).to.eq(true);
        });

        it('should return array', async () => {
          const books = await book.getAll();
          expect(books).to.be.an('array');
        });
      });
      describe('GET BOOK BY ID', () => {
        const id = 'ccd528f9-1632-4640-9753-53739a63e951';
        const expectedBoook = {
          id: 'ccd528f9-1632-4640-9753-53739a63e951',
          name: 'learning backend',
          years: '2022',
          publisher: 'saddam',
          cover: '',
          category_id: 'a8acadeb-270e-4799-a2ef-7deef9b9d7c8',
        };
        it('should return book match by id', async () => {
          const result = await book.getByID(id);
          expect(result).contain(expectedBoook);
        });
        it('should return null, book not found', async () => {
          try {
            const result = await book.getByID('123');

            expect(result).to.eq(null);
          } catch (error) {
            expect(error.message).to.eq('book not found');
          }
        });
      });
      describe('GET BOOK BY NAME', () => {
        const name = 'learning backend';
        const expectedBoook = [
          {
            category_id: 'a8acadeb-270e-4799-a2ef-7deef9b9d7c8',
            cover: '',
            created_at: new Date('2022-04-07T15:48:14.150Z'),
            id: 'ccd528f9-1632-4640-9753-53739a63e951',
            name: 'learning backend',
            publisher: 'saddam',
            updated_at: new Date('2022-04-08T07:37:18.326Z'),
            years: '2022',
          },
        ];

        it('should return book with name learning backend', async () => {
          const result = await book.getByName(name);

          expect(result).to.deep.include.members(expectedBoook);
        });
      });
    });
    describe('testing service API', () => {});
  });
});
