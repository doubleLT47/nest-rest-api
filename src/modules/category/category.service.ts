import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Category from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import UpdateCategoryDto from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  getAllCategories() {
    return this.categoryRepository.find({ relations: ['posts'] });
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
      relations: ['posts'],
    });
    if (category) {
      return category;
    }
    throw new HttpException('category not found', HttpStatus.NOT_FOUND);
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoryRepository.update(id, category);
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new HttpException('category not found', HttpStatus.NOT_FOUND);
  }
}
