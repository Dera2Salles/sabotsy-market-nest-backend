import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @Matches(/^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[0-9]{10,})$/, {
    message: 'Must be an email or a numberphone',
  })
  identifier: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  name?: string;
}
