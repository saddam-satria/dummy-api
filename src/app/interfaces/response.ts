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
}

export { IResponse };
