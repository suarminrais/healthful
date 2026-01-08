import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import {
  UserRegisterCommand,
  UserRegisterCommandHandler,
  UserSignInCommand,
  UserSignInCommandHandler,
} from './user.command';
import { USER_REPOSITORY, UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

describe('User Commands', () => {
  let jwtService: JwtService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserRegisterCommandHandler,
        UserSignInCommandHandler,
        {
          provide: USER_REPOSITORY,
          useValue: {
            register: jest.fn(),
            signIn: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtService = module.get(JwtService);
    repository = module.get(USER_REPOSITORY);
  });

  describe('UserRegisterCommandHandler', () => {
    it('should register user and return access token', async () => {
      const handler = new UserRegisterCommandHandler(repository, jwtService);

      const command = new UserRegisterCommand(
        'test@example.com',
        'password123',
      );

      const savedUser = new User('uuid-123', 'test@example.com', false);

      repository.register.mockResolvedValue(savedUser);
      jwtService.signAsync.mockResolvedValue('signed-jwt-token');

      const result = await handler.execute(command);

      expect(repository.register).toHaveBeenCalledTimes(1);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: savedUser.id,
        username: savedUser.email,
        subscription_id: savedUser.hasSubscription,
      });

      expect(result).toEqual({
        access_token: 'signed-jwt-token',
      });
    });
  });

  describe('UserSignInCommandHandler', () => {
    it('should sign in user and return access token', async () => {
      const handler = new UserSignInCommandHandler(repository, jwtService);

      const command = new UserSignInCommand('test@example.com', 'password123');

      const user = new User('uuid-456', 'test@example.com', true);

      repository.signIn.mockResolvedValue(user);
      jwtService.signAsync.mockResolvedValue('signed-jwt-token');

      const result = await handler.execute(command);

      expect(repository.signIn).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      );

      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user.id,
        username: user.email,
        subscription_id: user.hasSubscription,
      });

      expect(result).toEqual({
        access_token: 'signed-jwt-token',
      });
    });
  });
});
