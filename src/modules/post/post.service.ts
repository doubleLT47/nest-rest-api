import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreatePostDto from './dto/create-post.dto';
import UpdatePostDto from './dto/update-post.dto';

import { InjectRepository } from '@nestjs/typeorm';
import Post from './entities/post.entity';
import { In, Repository } from 'typeorm';
import User from '../user/entities/user.entity';
import PostSearchService from './post-search.service';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private postSearchService: PostSearchService,
  ) {}

  getAllPosts() {
    return this.postsRepository.find({ relations: ['author'] });
  }

  async searchForPosts(text: string) {
    const results = await this.postSearchService.search(text);
    const ids = results.map((result) => result.id);
    if (!ids.length) {
      return [];
    }
    return this.postsRepository.find({
      where: { id: In(ids) },
    });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['author'],
    });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    this.postSearchService.indexPost(newPost);
    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
    });
    if (updatedPost) {
      await this.postSearchService.update(updatedPost);
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    await this.postSearchService.remove(id);
  }
}
