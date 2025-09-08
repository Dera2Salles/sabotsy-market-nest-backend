import { Result } from '../Types/Result';

export abstract class FileRepository<T> {
  abstract get(filename: string): Promise<Result<T>>;
  abstract save(): Promise<void>;
}
