interface IBook {
  name: string;
  years: string;
  publisher: string;
  cover: string;
  category: string;
  user?: string;
}

interface IUser {
  username: string;
  password: string;
}

export { IBook, IUser };
