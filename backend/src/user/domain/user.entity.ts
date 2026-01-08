import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public hasSubscription: boolean,
  ) {
    if (!email) throw new BadRequestException('email is required');
    if (email.length < 6) throw new BadRequestException('email too short');
    if (!this.validateEmail(email))
      throw new BadRequestException('email not in email format');
  }

  private validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  public validatePassword(password: string) {
    if (!password) throw new BadRequestException('password is required');
    if (password.length < 6)
      throw new BadRequestException('password too short');
  }

  public async setPassword(password: string) {
    this.validatePassword(password);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  public async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) throw new BadRequestException('wrong credential');

    return isMatch;
  }
}
