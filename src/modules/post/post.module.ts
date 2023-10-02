import { Module } from '@nestjs/common';
import PostsController from './post.controller';
import PostsService from './post.service';
import Post from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../user/entities/user.entity';
import Category from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Category])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostModule {}
