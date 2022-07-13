interface Error {
  message: string;
  status?: number;
  stack?: string;
  name?: string;
}

export default Error;
