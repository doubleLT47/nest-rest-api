import { UserService } from '../user.service';
import User from '../entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from 'src/configs';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/modules/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedConfigService } from '../../../utils/mocks/config.service';
import { mockedJwtService } from '../../../utils/mocks/jwt.service';

describe('authentication service', () => {
  let userService: UserService;
  let findOne: jest.Mock;
  beforeAll(async () => {
    findOne = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: { findOne },
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
  });

  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      it('should return the user', async () => {
        const fetchedUser = await userService.getByEmail('test@gmail.com');
        expect(fetchedUser).toEqual(user);
      });
    });

    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(userService.getByEmail('test@test.com')).rejects.toThrow();
      });
    });
  });
});
