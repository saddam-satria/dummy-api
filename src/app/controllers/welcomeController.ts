import BaseController from '../config/controller';
import { IResponse } from '../interfaces/response';

class WelcomeController extends BaseController {
  public get() {
    const response: IResponse<null> = {
      data: null,
      error: null,
      service: {
        service: 'ROOT',
        message: 'WELCOME TO DUMMY API <br> there are 3 services <br> user,book,category <br> path : /api/v1/{service} <br> for book service is under protection',
      },
      status: 'success',
    };
    this.response.status(200).json(response);
  }
}

export default WelcomeController;
