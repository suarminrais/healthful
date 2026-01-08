import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

describe('User Entity', () => {
  describe('constructor', () => {
    it('should create user with valid email', () => {
      const user = new User('1', 'test@example.com', false);

      expect(user.id).toBe('1');
      expect(user.email).toBe('test@example.com');
      expect(user.hasSubscription).toBe(false);
    });

    it('should throw if email is empty', () => {
      expect(() => {
        new User('1', '', false);
      }).toThrow(BadRequestException);
    });

    it('should throw if email is too short', () => {
      expect(() => {
        new User('1', 'a@b.c', false);
      }).toThrow('email too short');
    });

    it('should throw if email format is invalid', () => {
      expect(() => {
        new User('1', 'invalid-email', false);
      }).toThrow('email not in email format');
    });
  });

  describe('validatePassword', () => {
    let user: User;

    beforeEach(() => {
      user = new User('1', 'test@example.com', false);
    });

    it('should throw if password is empty', () => {
      expect(() => {
        user.validatePassword('');
      }).toThrow('password is required');
    });

    it('should throw if password is too short', () => {
      expect(() => {
        user.validatePassword('123');
      }).toThrow('password too short');
    });

    it('should pass for valid password', () => {
      expect(() => {
        user.validatePassword('123456');
      }).not.toThrow();
    });
  });

  describe('setPassword', () => {
    let user: User;

    beforeEach(() => {
      user = new User('1', 'test@example.com', false);
    });

    it('should hash password', async () => {
      const password = '123456';

      const hash = await user.setPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(await bcrypt.compare(password, hash)).toBe(true);
    });
  });

  describe('comparePassword', () => {
    let user: User;

    beforeEach(() => {
      user = new User('1', 'test@example.com', false);
    });

    it('should return true if password matches hash', async () => {
      const password = '123456';
      const hash = await bcrypt.hash(password, 10);

      const result = await user.comparePassword(password, hash);

      expect(result).toBe(true);
    });

    it('should throw if password does not match', async () => {
      const hash = await bcrypt.hash('correct-password', 10);

      await expect(
        user.comparePassword('wrong-password', hash),
      ).rejects.toThrow('wrong credential');
    });
  });
});
