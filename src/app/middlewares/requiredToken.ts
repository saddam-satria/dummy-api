import { NextFunction, Request, Response } from 'express';
import JWThandler from '../helpers/jwtHandler';
import { IResponse } from '../interfaces/response';

const jwtHandler: JWThandler = new JWThandler();
const response: IResponse<null> = {
  data: null,
  error: null,
  service: {
    service: 'MIDDLEWARE',
    message: 'CHECKING USER CREDENTIALS',
  },
  status: 'success',
};

const requiredTokenMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header: string | undefined = req.headers.authorization;

    if (!header) throw new Error('authorization required');

    const token = header.split(' ')[1];
    const currentUser = jwtHandler.matchingToken(token);

    res.locals.currentUser = currentUser;

    next();
  } catch (error) {
    response.status = 'error';
    response.error = { message: error.message };
    response.service.message = `Failed, Error ${error.message}`;

    let code;

    if (error.message) {
      if (error.message.includes('jwt malformed')) {
        code = 404;
      }
      if (error.message.includes('authorization required')) {
        code = 401;
      }
      if (error.message.includes('jwt expired')) {
        code = 403;
      }
      if (error.message.includes('invalid token')) {
        code = 406;
      }
      if (error.message.includes('jwt must be provided')) {
        code = 401;
      }
    }

    res.status(code ? (code as number) : 400).json(response);
  }
};

export default requiredTokenMiddleWare;
