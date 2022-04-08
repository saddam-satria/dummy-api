import { Book, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { IBook } from '../interfaces/entity';

class BookRepository {
  private BookEntity: Prisma.BookDelegate<false>;
  constructor() {
    this.BookEntity = prisma.book;
  }

  public async getAll(page = 1): Promise<Book[] | null> {
    try {
      const books = await this.BookEntity.findMany({
        take: 10,
        skip: (page - 1) * 10,
      });

      return books;
    } catch (error) {
      if (error) throw new Error(error.message);
      return null;
    }
  }
  public async getByID(id: string): Promise<Book | null> {
    try {
      const book = await this.BookEntity.findFirst({
        where: {
          id,
        },
      });

      if (!book) throw new Error('book not found');

      return book;
    } catch (error) {
      if (error) throw new Error(error.message);
      return null;
    }
  }
  public async getByName(name: string): Promise<Book[] | null> {
    try {
      const book = await this.BookEntity.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });

      if (book.length < 1) throw new Error("don't match any of books, give specific name");

      return book;
    } catch (error) {
      if (error) throw new Error(error.message);

      return null;
    }
  }
  public async insertBook({ name, category, cover, publisher, years }: IBook): Promise<Book | null> {
    try {
      return await this.BookEntity.create({
        data: {
          name,
          category: {
            connectOrCreate: {
              create: {
                name: category,
              },
              where: {
                name: category,
              },
            },
          },
          cover,
          publisher,
          years,
        },
      });
    } catch (error) {
      return null;
    }
  }
  public async deleteBook(id: string): Promise<Book | null> {
    try {
      return await this.BookEntity.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.meta.cause && error.meta.cause.includes('Record to delete does not exist.')) throw new Error('book is not found');

      return null;
    }
  }
  public async deleteBooks(ids: string[]): Promise<number | null> {
    try {
      const { count } = await this.BookEntity.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      if (count === 0) throw new Error('books are not found');

      return count;
    } catch (error) {
      if (error) throw new Error(error.message);

      return null;
    }
  }
  public async updateBook(id: string, { category, cover, name, publisher, years }: IBook) {
    try {
      return await this.BookEntity.update({
        where: {
          id,
        },
        data: {
          name,
          publisher,
          years,
          cover,
          category: {
            update: {
              name: category,
            },
          },
          updated_at: new Date(),
        },
      });
    } catch (error) {
      if (error.meta && error.meta.details) throw new Error(error.meta.details);

      return null;
    }
  }
}

export default BookRepository;
