import { FileModule } from './../file/file.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import Address from './entities/address.entity';
import Post from '../post/entities/post.entity';

@Module({
  imports: [FileModule, TypeOrmModule.forFeature([User, Address, Post])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
