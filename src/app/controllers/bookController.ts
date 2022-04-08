import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import { IBook } from '../interfaces/entity';
import { IResponse } from '../interfaces/response';
import BookRepository from '../repositories/bookRepository';

const book = new BookRepository();
const response: IResponse<null | Book | Book[]> = {
  data: null,
  error: null,
  service: {
    service: 'BOOK',
    message: 'GET ALL BOOK',
  },
  status: 'success',
};

const get = async (req: Request, res: Response) => {
  const { id, page, name } = req.query;

  response.error = null;
  response.status = 'success';
  response.data = null;

  try {
    if (id && !name) {
      response.data = {
        data: await book.getByID(id as string),
      };

      response.service.message = 'GET BOOK BY ID';

      return res.status(200).json(response);
    }

    if (!id && name) {
      response.data = {
        data: await book.getByName(name as string),
      };
      response.service.message = 'GET BOOK BY NAME';

      return res.status(200).json(response);
    }

    const books = page ? await book.getAll(parseInt((page as string).toString())) : await book.getAll();

    response.data = {
      data: books,
      prevPage: page ? (parseInt(page as string) - 1 === 0 ? null : parseInt(page as string) - 1) : null,
      nextPage: page ? (books && books?.length > 0 ? parseInt(page as string) + 1 : null) : null,
      total: books?.length,
    };

    response.service.message = 'GET ALL BOOKS';

    return res.status(200).json(response);
  } catch (error) {
    response.error = {
      message: error.message,
    };
    response.service.message = `SERVICE INVALID, ERROR ${error.message}`;
    response.data = null;
    response.status = 'error';

    res.status(400).json(response);

    return error;
  }
};

const post = async (req: Request, res: Response) => {
  const { name, category, cover, publisher, years }: IBook = req.body;

  response.service = {
    service: 'BOOK',
    message: 'INSERT NEW BOOK',
  };
  response.error = null;
  response.status = 'success';
  response.data = null;

  try {
    if (!name || !category) throw new Error('body name or category required');
    const newBook = await book.insertBook({ name, category, cover, publisher, years });
    response.data = {
      data: newBook,
    };

    return res.status(201).json(response);
  } catch (error) {
    response.error = {
      message: error.message,
    };
    response.data = null;
    response.status = 'error';

    return res.status(400).json(response);
  }
};

const Delete = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { ids } = req.body;

  response.service = {
    service: 'BOOK',
    message: 'DELETE BOOK',
  };
  response.error = null;
  response.status = 'success';
  response.data = null;

  try {
    if (!id && !ids) throw new Error('Required ID');

    if (id && !ids) {
      response.data = {
        data: await book.deleteBook(id as string),
      };
      response.service.message = 'DELETE BOOK ';

      return res.status(200).json(response);
    }

    await book.deleteBooks(ids);

    response.data = {
      data: ids,
    };

    response.service.message = 'DELETE BOOKS BACTHING PROCESS';

    return res.status(200).json(response);
  } catch (error) {
    response.error = {
      message: error.message,
    };

    response.data = null;
    response.status = 'error';
    return res.status(400).json(response);
  }
};

const update = async (req: Request, res: Response) => {
  response.service = {
    service: 'BOOK',
    message: 'UPDATE BOOK',
  };
  response.error = null;
  response.status = 'success';
  response.data = null;

  const { id } = req.query;
  const { name, category, cover, publisher, years } = req.body;
  try {
    if (!id) throw new Error('required id');
    if (!name || !category) throw new Error('required name or category body');
    const updatedBook = await book.updateBook(id as string, { name, category, cover, publisher, years });

    response.data = {
      data: updatedBook,
    };

    return res.status(200).json(response);
  } catch (error) {
    response.error = {
      message: error.message,
    };

    response.data = null;
    response.status = 'error';
    return res.status(400).json(response);
  }
};

const bookController = {
  get,
  post,
  delete: Delete,
  update,
};

export default bookController;
