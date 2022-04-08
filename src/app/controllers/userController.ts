import { Request, Response } from 'express';
import Hash from '../helpers/hash';
import JWThandler from '../helpers/jwtHandler';
import { IAuthenticate, IResponse } from '../interfaces/response';
import UserRepository from '../repositories/userRepository';

const user: UserRepository = new UserRepository();
const jwt: JWThandler = new JWThandler();
const response: IResponse<null | IAuthenticate> = {
  data: null,
  error: null,
  service: {
    service: 'USER',
    message: 'REGISTER',
  },
  status: 'success',
};

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    if (!username) throw new Error('username required');
    const hashedPassword = await Hash.hashString(password);

    const newUser = await user.insertUser({ username, password: hashedPassword });
    if (!newUser) throw new Error('error');
    const jwttoken = jwt.generateToken({ username: newUser.username, uuid: newUser.id });

    response.data = {
      data: {
        uuid: newUser.id,
        jwtToken: jwttoken,
      },
    };
    response.error = null;
    response.status = 'success';

    return res.status(201).json(response);
  } catch (error) {
    response.error = {
      message: error.message,
    };
    response.status = 'error';
    response.data = null;
    response.service.message = 'INVALID REGISTER';

    return res.status(400).json(response);
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  response.data = null;
  response.error = null;

  try {
    if (!username || !password) throw new Error('failed to login');
    response.service.message = 'LOGIN';

    const currentUser = await user.getUserByUsername(username);

    if (!currentUser) throw new Error('user not found');

    if (!(await Hash.matchingString(password, currentUser.password as string))) throw new Error('wrong user, fake user');

    const jwtToken = jwt.generateToken({ username: currentUser.username, uuid: currentUser.id });

    response.data = {
      data: { jwtToken, uuid: currentUser.id },
    };

    return res.status(200).json(response);
  } catch (error) {
    response.error = {
      message: error.message,
    };
    response.status = 'error';
    response.data = null;
    response.service.message = 'INVALID LOGIN';

    return res.status(400).json(response);
  }
};

export default {
  register,
  login,
};
