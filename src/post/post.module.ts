import { Module } from '@nestjs/common';
import PostsController from './post.controller';
import PostsService from './post.service';
import Post from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostModule {}
