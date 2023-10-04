import { Module } from '@nestjs/common';
import PostsController from './post.controller';
import PostsService from './post.service';
import Post from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../user/entities/user.entity';
import Category from '../category/entities/category.entity';
import PostSearchService from './post-search.service';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [SearchModule, TypeOrmModule.forFeature([Post, User, Category])],
  controllers: [PostsController],
  providers: [PostsService, PostSearchService],
})
export class PostModule {}
