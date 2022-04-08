interface IError {
  message: string;
}

interface IService {
  service: string;
  message: string;
}

interface IData<T> {
  prevPage?: number | null;
  nextPage?: number | null;
  total?: number | null;
  data: T;
}

interface IResponse<T> {
  data: IData<T> | null;
  service: IService;
  status: string;
  error: IError | null;
  user?: string | null;
}

interface IAuthenticate {
  jwtToken: string | null;
  uuid: string | null;
}

interface ITokenPayload {
  uuid: string;
  username: string;
}

export { IResponse, IAuthenticate, ITokenPayload };
