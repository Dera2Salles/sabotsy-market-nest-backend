import { JwtService } from '@nestjs/jwt';

export const generateToken = (
  userId: number,
  email: string,
): Promise<string> => {
  const jwt: JwtService = new JwtService();
  const payload = { sub: userId, email };

  return jwt.signAsync(payload, { expiresIn: '2m', secret: '1234' });
};
